import {configureStore,combineReducers} from '@reduxjs/toolkit'
import authReducer from './Slice/AuthSlice'
import productReducer from './Slice/ProductSlice'
import filterReducer from './Slice/FilterSlice'
import cartReducer from './Slice/CartSlice'
import checkoutReducer from './Slice/CheckOutSlice'


const rootReducer = combineReducers({
    auth:authReducer,
    product:productReducer,
    filter:filterReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
})


const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck:false,
      })
})

export default store





// middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: ["product/STORE_PRODUCTS"],
  //     ignoredActionPaths: ['meta.arg', 'action.payload.timestamp'],
  //     ignoredPaths: ['product.dates'],
  //   },
  // }),