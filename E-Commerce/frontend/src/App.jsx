import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Contact from './Pages/Contact/Contact'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Reset from './Pages/Auth/Reset'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Pages/Admin/Admin'
import AdminOnlyRoute from './Components/Admin/AdminOnlyRoute'
import ProductDetails from './Components/Product/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart'
import CheckOutDetails from './Pages/CheckOut/CheckOutDetails'
import CheckOut from './Pages/CheckOut/CheckOut'


function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/reset' element={<Reset/>}/>
          <Route path='/admin/*' element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}/>
          <Route path='/productDetails/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout-details' element={<CheckOutDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App