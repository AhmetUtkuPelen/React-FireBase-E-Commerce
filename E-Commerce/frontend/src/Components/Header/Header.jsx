import { Link , NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useEffect, useState } from 'react';
import JS from '../../Assets/js.png'
import { signOut } from "firebase/auth";
import { auth } from '../../FireBase/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../Redux/Slice/AuthSlice';
import ShowOnLogin, { ShowOnLogout } from './../HiddenLinks/HiddenLink';
import { AdminOnlyLink } from '../Admin/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../Redux/Slice/CartSlice';



// ? LOGO  ? \\
const LOGO = (
<Link className={styles.logo} to='/'><img src={JS}/></Link>
)




const Header = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [showMenu , setShowMenu] = useState(false)

  const [displayName , setDisplayName] = useState("")

  const [scrollPage , setScrollPage] = useState(false)

  const StickyNavbar = () => {
    if(window.scrollY > 50){
      setScrollPage(true)
    }else{
      setScrollPage(false)
    }
  }

  window.addEventListener('scroll' , StickyNavbar)

  // ? Check User Signed In Or Not ? \\
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {

        if(user.displayName == null){
          const U1 = user.email.substring(0,user.email.indexOf("@"))
          const uName = U1.charAt(0).toUpperCase() + U1.slice(1)
          setDisplayName(uName)
        } else{
          setDisplayName(user.displayName)
          dispatch(REMOVE_ACTIVE_USER())
        }

        // const uid = user.uid;
        // console.log(uid)

        dispatch(SET_ACTIVE_USER({
          email:user.email,
          userName:user.displayName ? user.displayName : displayName,
          userID:user.uid,
        }))

      } else {
        setDisplayName("")
      }
    });
  },[dispatch,displayName])
  // ? Check User Signed In Or Not ? \\


  const ToggleMenu = () => {
    setShowMenu(!showMenu)
  }


  const HideMenu = () => {
    setShowMenu(false)
  }

  // ? Logout User ? \\
  const LogoutUser = () => {
    signOut(auth).then(() => {
      toast.success('You Logged Out Successfully!')
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  // ? Logout User ? \\


  const CartTotalQuantity = useSelector(selectCartTotalQuantity)

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[])

  const CART = (
    <span className={styles.cart}>
    <NavLink to="/cart">
    CART<FaShoppingCart size={20}/>
    <p>{CartTotalQuantity}</p>
    </NavLink>
  </span>
  )

  return (
    <>
    <header className={scrollPage ? `${styles.fixed}` : null}>

    <div className={styles.header}>
    {LOGO}

      <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
        
        <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={HideMenu}></div>

        <ul onClick={HideMenu}>
          <li className={styles["logo-mobile"]}>{LOGO}<FaTimes size={22} color='white' onClick={HideMenu}/></li>
          <li><AdminOnlyLink><NavLink to='/admin' className='--btn --btn-primary'>ADMIN</NavLink></AdminOnlyLink></li>
          <li><NavLink to="/" className={({isActive})=>(isActive ? `${styles.active}` : "")}>HOME</NavLink></li>

          <ShowOnLogin>
          <li><NavLink to="/contact" className={({isActive})=>(isActive ? `${styles.active}` : "")}>CONTACT</NavLink></li>
          </ShowOnLogin>
        
        </ul>

        <div className={styles["header-right"]} onClick={HideMenu}>
          <span className={`${styles.links} flex`}>

            <ShowOnLogout>
            <NavLink to="/login" className={({isActive})=>(isActive ? `${styles.active}` : "")}>LOGIN</NavLink>
            </ShowOnLogout>


            <NavLink style={{color:"#ff7722"}}>{displayName}</NavLink>


            <ShowOnLogout>
            <NavLink to="/register" className={({isActive})=>(isActive ? `${styles.active}` : "")}>REGISTER</NavLink>
            </ShowOnLogout>


            <ShowOnLogin>
            <NavLink to="/" onClick={LogoutUser}>LOGOUT</NavLink>
            </ShowOnLogin>

            </span>

            <ShowOnLogin>
            {CART}
            </ShowOnLogin>

        </div>
      </nav>


      {/* HAMBURGER MENU */}
      <div className={styles["menu-icon"]}>
        {CART}
        <HiOutlineMenuAlt4 size={28} onClick={ToggleMenu}/>
      </div>
    
    </div>
    
    </header>
    </>
  )
}

export default Header