import styles from './Auth.module.scss'
import LoginImage from '../../Assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FireBase/Config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/Loader/Loader'
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useSelector } from 'react-redux'
import { selectPreviousUrl } from '../../Redux/Slice/CartSlice'



const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

  const previousURL = useSelector(selectPreviousUrl)

  const navigate = useNavigate()

  const UserRedirect = () => {
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }
    navigate("/")
  }

    // ? Login User ? \\
    const LoginUser = (e) => {
        
        e.preventDefault()

        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    toast.success(`You Logged In Successfully!`)
    UserRedirect()
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });

    }
    // ? Login User ? \\


    // ? Login Wİth Google ? \\
    const provider = new GoogleAuthProvider();

    const SignInWithGoogle = () => {

    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    toast.success(`You Logged In Successfully !`)
    UserRedirect()
  }).catch((error) => {
    toast.error(error.message)
  });

    }
    // ? Login Wİth Google ? \\


  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
      
    <div className={styles.img}>
        <img src={LoginImage} className='w-100'/>
    </div>


    <div className={styles.form}>

        <h2>LOGIN</h2>
        
        <form onSubmit={LoginUser}>
        
            <input type='text' placeholder='Your Email' required className='cursor-pointer' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Your Password' required className='cursor-pointer' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='--btn --btn-primary --btn-block' type='submit'>LOGIN</button>

            <div className={`styles.links text-center mt-3`}>
                <Link to='/reset' className='text-2xl mt-5 font-bold text-green-600'>Reset Password</Link>
            </div>
            <p className='text-red-600 text-2xl font-bold'>OR</p>

        </form>

        <button className='--btn --btn-danger --btn-block' onClick={SignInWithGoogle}><FaGoogle color='white' className='mr-3'/>Login With Google</button>
        <span className={styles.register}>
            <p>Dont Have An Account?</p>
            <Link to='/register' className='text-blue-600 underline ml-3 font-bold'>Register Here</Link>
        </span>

    </div>

    </section>
    </>
  )
}

export default Login