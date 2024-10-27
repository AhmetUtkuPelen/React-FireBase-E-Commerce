import styles from './Auth.module.scss'
import RegisterImage from '../../Assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../../Components/Loader/Loader';
import {auth} from '../../FireBase/Config.js'


const Register = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  // ? register user function ? \\
  const RegisterUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match !");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success(`User Registered Successfully !`);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  // ? register user function ? \\



  return (
    <>
    <ToastContainer />
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      
    <div className={styles.img}>
        <img src={RegisterImage} className='w-100'/>
    </div>

    <div className={styles.form}>

        <h2>REGISTER</h2>
        
        <form onSubmit={RegisterUser}>
        
          <input type='text' placeholder='Your Email' required className='cursor-pointer' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='password' placeholder='Your Password' required className='cursor-pointer' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <input type='password' placeholder='Re-Password' required className='cursor-pointer' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <button className='--btn --btn-primary --btn-block' type='submit'>REGISTER</button>

        </form>

        <span className={styles.register}>
            <p>Already Have An Account?</p>
            <Link to='/login' className='text-blue-600 underline ml-3 font-bold'>Login Here</Link>
        </span>

    </div>

    </section>
    </>
  )
}

export default Register