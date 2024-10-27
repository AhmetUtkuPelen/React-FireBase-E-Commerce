import { useEffect, useState } from 'react'
import styles from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import Search from '../../Search/Search'
import ProductItem from './../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProduct, SORT_PRODUCTS } from '../../../Redux/Slice/FilterSlice'
import Pagination from '../../Pagination/Pagination'



const ProductList = ({products}) => {

  const [grid , setGrid] = useState(true)

  const [search , setSearch] = useState("")

  const [sort , setSort] = useState("latest")

  const filteredProducts = useSelector(selectFilteredProduct)

  // ? pagination state ? \\
  const [currentPage , setCurrentPage] = useState(1)
  const [productsPerPage , setProductsPerProducts] = useState(3)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)
  // ? pagination state ? \\


  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(SORT_PRODUCTS({products,sort}))
  },[dispatch,products,sort])

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[dispatch,products,search])


  return (
    <div className={styles["product-list"]} id='product'>
      <div className={styles.top}>
        
        <div className={styles.icons}>
          <BsFillGridFill size={22} color='orangered' onClick={()=>setGrid(true)}/>
          <FaList size={22} color='blue' onClick={()=>setGrid(false)}/>
          <p className='font-bold text-3xl'>{filteredProducts.length} Product Found</p>
        </div>

        <div>
          <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div className={styles.sort}>
          <label className='font-bold text-blue-600'>Sort By :</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value='latest'>latest</option>
            <option value='lowest-price'>lowest price</option>
            <option value='highest-price'>highest price</option>
            <option value='a-z'>a-z</option>
            <option value='z-a'>z-a</option>
          </select>
        </div>

      </div>

    <div className={grid ? `${styles.grid}` : `${styles.list}`}>
      {products.length === 0 ? (
        <p>No Product Found!</p>
      ) : (
        <>
          {currentProducts.map((product)=>{
            return (
              <div key={product.id}>
                <ProductItem {...product} grid={grid} product={product}/>
              </div>
            )
          })}
        </>
      )}
    </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length} />

    </div>
  )
}

export default ProductList