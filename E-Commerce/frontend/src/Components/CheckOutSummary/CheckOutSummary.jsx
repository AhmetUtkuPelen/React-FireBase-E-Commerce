import { useSelector } from 'react-redux'
import styles from './CheckOutSummary.module.scss'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../Redux/Slice/CartSlice'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'



const CheckOutSummary = () => {

    const CartItems = useSelector(selectCartItems)

    const CartTotalAmount = useSelector(selectCartTotalAmount)

    const CartTotalQuantity = useSelector(selectCartTotalQuantity)

  return (
    <div>
        <h3 className='text-5xl underline text-orange-600'>CHECKOUT SUMMARY</h3>
        <div>
            {CartItems.length === 0 ? (
                <>
                <p className='font-bold text-4xl text-blue-600 mb-20'>No Item Found In Your Cart !</p>
                <button className='--btn --btn-danger --btn-block'><Link to="/#products" className='text-white hover:text-white'>&larr; Go To Shopping</Link></button>
                </>
            ) : (
                <div className={styles.text}>
                    <h4 className='text-blue-600'>SubTotal : </h4>
                    <h3>{CartTotalAmount}</h3>
                </div>
            )}
            {CartItems.map((item,index) => {
                const {id , name , price , cartQuantity} = item
                return (
                    <Card cardClass={styles.card} key={id}>
                        <h4>Product : {name}</h4>
                        <p className='text-blue-600 text-2xl font-semibold'>Quantity : <span className='text-amber-600'>{cartQuantity}</span></p>
                        <p className='text-blue-600 text-2xl font-semibold'>Unit Price : <span className='text-amber-600'>{price}</span></p>
                        <p className='text-blue-600 text-2xl font-semibold'>Set Price : <span className='text-amber-600'>{price * cartQuantity}</span></p>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}

export default CheckOutSummary