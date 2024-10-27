import { useState } from 'react'
import styles from './CheckOutDetails.module.scss'
import Card from '../../Components/Card/Card'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch } from 'react-redux'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../Redux/Slice/CheckOutSlice'
import { useNavigate } from 'react-router-dom'
import CheckOutSummary from '../../Components/CheckOutSummary/CheckOutSummary'



const initialAddressState = {
    name : '',
    line1 : '',
    line2 : '',
    city : '',
    state : '',
    postal_code:'',
    country:'',
    phone:''
}



const CheckOutDetails = () => {

    const [shippingAddress , setShippingAddress] = useState({...initialAddressState})

    const [billingAddress , setBillingAddress]  = useState({...initialAddressState})

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const HandleShipping = (e) => {
        const {name,value} = e.target
        setShippingAddress({
            ...shippingAddress,
            [name] : value
        }) 
    }

    const HandleBilling = (e) => {
        const {name,value} = e.target
        setBillingAddress({
            ...billingAddress,
            [name] : value
        })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        navigate('/checkout')
    }

    return (
    <section>
        <div className={`container ${styles.checkout}`}>
        <h2 className='text-blue-600 text-center'>Details Of CheckOut :</h2>
            <form onSubmit={HandleSubmit} className='mt-10'>
                <div>

                    <Card cardClass={styles.card}>
                        <h3 className='font-bold text-5xl text-orange-600 underline'>SHIPPING ADDRESS</h3>
                        <label className='text-blue-600'>Customer Name</label>
                        <input type='text' placeholder='Customer Name' name='name' value={shippingAddress.name} onChange={(e) => HandleShipping(e)} required/>
                        <label className='text-blue-600'>Address Line 1</label>
                        <input type='text' placeholder='Address Line 1' name='line1' value={shippingAddress.line1} onChange={(e) => HandleShipping(e)} required/>
                        <label className='text-blue-600'>Address Line 2</label>
                        <input type='text' placeholder='Address Line 2' name='line2' value={shippingAddress.line2} onChange={(e) => HandleShipping(e)}/>
                        <label className='text-blue-600'>City</label>
                        <input type='text' placeholder='City' name='city' value={shippingAddress.city} onChange={(e) => HandleShipping(e)} required/>
                        <label className='text-blue-600'>State</label>
                        <input type='text' placeholder='State' name='state' value={shippingAddress.state} onChange={(e) => HandleShipping(e)} required/>
                        <label className='text-blue-600'>Postal Code</label>
                        <input type='text' placeholder='Postal Code' name='postal_code' value={shippingAddress.postal_code} onChange={(e) => HandleShipping(e)} required/>
                            {/* COUNTRY PLACE */}
                            <CountryDropdown valueType='short' value={shippingAddress.country} className={styles.select} onChange={(val)=>HandleShipping({
                                    target:{
                                    name:'country',
                                    value:val
                                }
                            })}/>
                        <label className='text-blue-600'>Phone</label>
                        <input type='text' placeholder='Phone' name='phone' value={shippingAddress.phone} onChange={(e) => HandleShipping(e)} required/>
                    </Card>

                    <Card cardClass={`${styles.card} mt-40`}>
                        <h3 className='font-bold text-5xl text-orange-600 underline'>BILLING ADDRESS</h3>
                        <label className='text-blue-600'>Customer Name</label>
                        <input type='text' placeholder='Customer Name' name='name' value={billingAddress.name} onChange={(e) => HandleBilling(e)} required/>
                        <label className='text-blue-600'>Address Line 1</label>
                        <input type='text' placeholder='Address Line 1' name='line1' value={billingAddress.line1} onChange={(e) => HandleBilling(e)} required/>
                        <label className='text-blue-600'>Address Line 2</label>
                        <input type='text' placeholder='Address Line 2' name='line2' value={billingAddress.line2} onChange={(e) => HandleBilling(e)}/>
                        <label className='text-blue-600'>City</label>
                        <input type='text' placeholder='City' name='city' value={billingAddress.city} onChange={(e) => HandleBilling(e)} required/>
                        <label className='text-blue-600'>State</label>
                        <input type='text' placeholder='State' name='state' value={billingAddress.state} onChange={(e) => HandleBilling(e)} required/>
                        <label className='text-blue-600'>Postal Code</label>
                        <input type='text' placeholder='Postal Code' name='postal_code' value={billingAddress.postal_code} onChange={(e) => HandleBilling(e)} required/>
                            {/* COUNTRY PLACE */}
                            <CountryDropdown valueType='short' value={billingAddress.country} className={styles.select} onChange={(val)=>HandleBilling({
                                    target:{
                                    name:'country',
                                    value:val
                                }
                            })}/>
                        <label className='text-blue-600'>Phone</label>
                        <input type='text' placeholder='Phone' name='phone' value={billingAddress.phone} onChange={(e) => HandleBilling(e)} required/>
                        <button type='submit' className='--btn --btn-primary --btn-block'>PROCEED TO CHECKOUT</button>
                    </Card>
                </div>

                <Card cardClass={styles.card}>
                    <CheckOutSummary/>
                </Card>

            </form>
        </div>
    </section>
  )
}

export default CheckOutDetails