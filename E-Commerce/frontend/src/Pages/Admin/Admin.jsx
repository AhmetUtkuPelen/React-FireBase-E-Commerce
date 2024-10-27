import styles from './Admin.module.scss'
import AdminNavbar from './../../Components/AdminPanel/AdminNavbar/AdminNavbar';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './../../Components/AdminPanel/Home/AdminHome';
import AdminViewProducts from './../../Components/AdminPanel/AdminViewProducts/AdminViewProducts';
import AdminAddProduct from './../../Components/AdminPanel/AdminAddProduct/AdminAddProduct';
import AdminOrders from './../../Components/AdminPanel/Orders/AdminOrders';


const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar/>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path='adminHome' element={<AdminHome/>}/>
          <Route path='allProducts' element={<AdminViewProducts/>}/>
          <Route path='addProduct' element={<AdminAddProduct/>}/>
          <Route path='addProduct/:id' element={<AdminAddProduct/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
        </Routes>
      </div>
    
    </div>
  )
}

export default Admin