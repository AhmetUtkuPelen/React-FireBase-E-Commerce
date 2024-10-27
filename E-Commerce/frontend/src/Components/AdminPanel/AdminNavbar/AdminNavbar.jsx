import { FaUserCircle } from 'react-icons/fa'
import styles from './AdminNavbar.module.scss'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../Redux/Slice/AuthSlice'
import { NavLink } from 'react-router-dom'



const AdminNavbar = () => {

  const userName = useSelector(selectUserName)

  const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")

  return (
    <div className={styles.navbar}>
      
      <div className={styles.user}>
        <FaUserCircle size={40} className='text-white'/>
        <h1 className='text-4xl mt-5 uppercase text-white'>{userName}</h1>
      </div>

      <nav>
        <ul className='text-center'>
          <li><NavLink to='adminHome' className={activeLink}>Home</NavLink></li>
          <li><NavLink to='allProducts' className={activeLink}>View Products</NavLink></li>
          <li><NavLink to='addProduct/ADD' className={activeLink}>Add Product</NavLink></li>
          <li><NavLink to='orders' className={activeLink}>Orders</NavLink></li>
        </ul>
      </nav>

    </div>
  )
}

export default AdminNavbar