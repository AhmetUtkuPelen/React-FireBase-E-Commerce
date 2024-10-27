import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductFilter.module.scss'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../Redux/Slice/ProductSlice'
import { useEffect, useState } from 'react'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../Redux/Slice/FilterSlice'



const ProductFilter = () => {

  const [category , setCategory] = useState("All")

  const [brand , setBrand] = useState("All")

  const [price , setPrice] = useState(2500)

  const products = useSelector(selectProducts)

  const minPrice = useSelector(selectMinPrice)

  const maxPrice = useSelector(selectMaxPrice)

  const dispatch = useDispatch()

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ]
  
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand))
  ]

  useEffect(()=> {
    dispatch(FILTER_BY_BRAND({products,brand}))
  },[dispatch,products,brand])

  useEffect(()=> {
    dispatch(FILTER_BY_PRICE({products,price}))
  },[dispatch,products,price])

  const filterProducts = (cat) => {
   setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({products,category:cat}))
  }

  const ResetFilters = () => {
    setCategory("All")
    setBrand("All")
    setPrice(maxPrice)
  }

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat,index)=>{
          return  (
          <button key={index} className={`${category}` === cat ? `${styles.active}` : null} type='button' onClick={()=>filterProducts(cat)}>&#8250; {cat}</button>
        )
        })}

      </div>
      <h4>BRAND</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
          {allBrands.map((brand,index) => {
            return (
              <option value={brand} key={index}>{brand}</option>
            )
          })}
        </select>
        <h4>PRICE</h4>
        <p>{`${price}`}</p>
        <div className={styles.price}>
          <input type='range' value={price} onChange={(e)=>setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
        </div>
        <br/>
        <button className='--btn --btn-danger' onClick={ResetFilters}>Reset Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter