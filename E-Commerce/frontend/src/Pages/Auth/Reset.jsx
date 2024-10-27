import styles from './Auth.module.scss'
import ResetImage from '../../Assets/forgot.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../FireBase/Config';
import Loader from '../../Components/Loader/Loader';



const Reset = () => {

  const [email,setEmail] = useState("")

  const[isLoading,setIsLoading] = useState(false)

  // ? Password Reset ? \\
  const ResetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success(`Please Check Your Email For Password Reset Mail !`)
  })
  .catch((error) => {
  setIsLoading(false)
  toast.error(error.message)    
  });
  }
  // ? Password Reset ? \\


  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
      
    <div className={styles.img}>
        <img src={ResetImage} className='w-100'/>
    </div>


    <div className={styles.form}>

        <h2>RESET PASSWORD</h2>
        
        <form onSubmit={ResetPassword}>
        
            <input type='text' placeholder='Your Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <button className='--btn --btn-primary --btn-block' type='submit'>RESET PASSWORD</button>

            <div className={`styles.links mt-3`}>
              <p>
              <Link to='/login' className='text-2xl mt-10 font-bold text-blue-700 hover:text-blue-400'>LOGIN</Link>
              </p>
              <p>
              <Link to='/register' className='text-2xl mt-10 font-bold text-blue-700 hover:text-blue-400'>REGISTER</Link>
              </p>
            </div>


        </form>

    </div>

    </section>
    </>
  )
}

export default Reset