import { useDispatch, useSelector } from 'react-redux'
import styles from './Cart.module.scss'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../Redux/Slice/CartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import Card from '../../Components/Card/Card'
import { useEffect } from 'react'
import { selectIsLoggedIn } from '../../Redux/Slice/AuthSlice'



const Cart = () => {

  const cartItems = useSelector(selectCartItems)

  const cartTotalAmount = useSelector(selectCartTotalAmount)

  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch()

  const IsLoggedIn = useSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  const IncreaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  }

  const DecreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  }

  const RemoveFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  }

  const ClearCart = () => {
    dispatch(CLEAR_CART())
  }

  useEffect(()=> {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(""))
  },[dispatch,cartItems])

  const url = window.location.href

  const CheckOut = () => {
    if(IsLoggedIn){
      navigate("/checkout-details")
    }else{
      dispatch(SAVE_URL(url))
      navigate("/login")
    }
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shop Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your Cart Is Empty !</p>
            <br/>
            <div>
              <Link to="/#products" className='--btn --btn-danger hover:text-white'>&larr; Go To Shopping</Link>
            </div>
          </>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart,index) => {
                const {id , name , price , imageURL , cartQuantity} = cart
                return (
                  <tr key={id}>
                    <td>{index +1}</td>
                    <td>
                      <p className='font-bold'>{name}</p>
                      <img src={imageURL} className='w-[120px]'/>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button className='--btn --btn-primary' onClick={()=>DecreaseCart(cart)}>-</button>
                        <p className='font-bold'>{cartQuantity}</p>
                        <button className='--btn --btn-primary' onClick={()=>IncreaseCart(cart)}>+</button>
                      </div>
                    </td>
                    <td>
                      {(price * cartQuantity)}
                    </td>
                    <td className={styles.icons}>
                      <FaTrashAlt size={18} color='red' onClick={()=>RemoveFromCart(cart)}/>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className={`${styles.summary} text-center`}>
              <button className='--btn --btn-danger' onClick={ClearCart}>Clear Cart</button>
              <div className={styles.checkout}>
                <div>
                  <Link className='--btn --btn-danger hover:text-white' to='/#products'>&larr; Go To Shopping</Link>
                </div>
                <br/>
                <Card cardClass={styles.card}>
                  <div className={styles.text}>
                    <p className='font-bold text-blue-600 text-3xl'>Quantity : <span className='text-red-500'>{`${cartTotalQuantity}`}</span></p>
                    <h4 className='text-amber-500 text-3xl'>SubTotal :</h4>
                    <h3>{`${cartTotalAmount}`}</h3>
                  </div>
                  <p className='text-2xl text-green-700'>Tax and Shipping are calculated at check out</p>
                  <button className='--btn --btn-primary --btn-block' onClick={CheckOut}>CheckOut</button>
                </Card>
              </div>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart