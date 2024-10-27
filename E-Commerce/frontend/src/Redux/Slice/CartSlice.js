import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity : 0,
    cartTotalAmount : 0,
    previousURL : "",
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        ADD_TO_CART : (state,action) => {
            const ProductIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if(ProductIndex >= 0){
                // * item already exists so increase quantity in the cart
                state.cartItems[ProductIndex].cartQuantity += 1
                toast.info(`${action.payload.name} Increased`,{position:"top-left"})
            }else{
                // * item doesn't exist so add item into the cart
                const tempProduct = {...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} Has Been Added Into Cart`,{position:"top-left"})
            }
            // * save cart into local storage
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        DECREASE_CART : (state,action) => {
            const ProductIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if(state.cartItems[ProductIndex].cartQuantity > 1){
                state.cartItems[ProductIndex].cartQuantity -= 1
                toast.info(`${action.payload.name} Has Been Decreased`,{position:"top-left"})
            }else if(state.cartItems[ProductIndex].cartQuantity === 1){
                const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
                state.cartItems = newCartItem
                toast.info(`${action.payload.name} Has Been Deleted`,{position:"top-left"})
            }
            // * save cart into local storage
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART : (state,action) => {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.info(`${action.payload.name} Has Been Removed`,{position:"top-left"})
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        CLEAR_CART : (state,action) => {
            state.cartItems = []
            localStorage.removeItem('cartItems')
            toast.info('Cart Has Been Cleared',{position:"top-left"})
        },
        CALCULATE_SUBTOTAL : (state , action) => {
            const array = []
            state.cartItems.map((item) => {
                const {price , cartQuantity} = item
                const CartItemAmount = price * cartQuantity
                return array.push(CartItemAmount)
            })
            const TotalAmount = array.reduce((a,b) => {
                return a + b
            },0)
            state.cartTotalAmount = TotalAmount
        },
        CALCULATE_TOTAL_QUANTITY : (state , action) => {
            const array = []
            state.cartItems.map((item) => {
                const {cartQuantity} = item
                const Quantity = cartQuantity
                return array.push(Quantity)
            })
            const TotalQuantity = array.reduce((a,b) => {
                return a + b
            },0)
            state.cartTotalQuantity = TotalQuantity
        },
        SAVE_URL : (state , action) => {
            state.previousURL = action.payload
        },
    }
})

export const {ADD_TO_CART , DECREASE_CART , REMOVE_FROM_CART , CLEAR_CART , CALCULATE_SUBTOTAL , CALCULATE_TOTAL_QUANTITY , SAVE_URL} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousUrl = (state) => state.cart.previousURL


export default cartSlice.reducer