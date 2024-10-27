import { Link, useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../FireBase/Config';
import { toast } from 'react-toastify';
import Spinner from '../../../Assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../Redux/Slice/CartSlice';



const ProductDetails = () => {

  const {id} = useParams()

  const [product , setProduct] = useState(null)

  const dispatch = useDispatch()

  const CartItems = useSelector(selectCartItems)

  const Cart = CartItems.find((cart) => cart.id === id)

  const IsCartAdded = CartItems.findIndex((cart) => {
    return cart.id === id
  })

  useEffect(()=>{
    GetProduct()
  },[])

  const GetProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const Obj = {
        id:id,
        ...docSnap.data(),
      }
      setProduct(Obj)
    } else {
      toast.error("Product Not Found !")
    }
  }

  const AddToCart = () => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const DecreaseCart = () => {
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  return (
    <section className='text-center'>
      <div className={`container ${styles.product}`}>
        
        <div>
          <Link to='/#product' className='--btn --btn-primary hover:text-amber-500'>&larr; Back To Shop Page</Link>
        </div>
      
      {product === null ? (
        <img src={Spinner}/>
      ) : (
        <>
          <div className={`${styles.details}`}>
            <div className={styles.img}>
              <img src={product.imageURL} alt={product.name}/>
            </div>
            <div className={styles.content}>
              <h3 className='font-bold underline uppercase'>{product.name}</h3>
              <p className={styles.price}>{product.price}</p>
              <p className='font-semibold text-2xl text-blue-500'>{product.description}</p>
              <p className='font-bold '>{product.brand}</p>
              <div className={styles.count}>
                {IsCartAdded < 0 ? null : (
                  <>
                    <button className='--btn --btn-primary' onClick={() => DecreaseCart(product)}>-</button>
                    <p className='font-bold text-amber-500 text-2xl'>{Cart.cartQuantity}</p>
                    <button className='--btn --btn-primary' onClick={() => AddToCart(product)}>+</button>
                  </>
                )}
                  <button className='--btn --btn-danger' onClick={() => AddToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          </div>
        </>
      )}

      </div>
    </section>
  )
}


export default ProductDetails