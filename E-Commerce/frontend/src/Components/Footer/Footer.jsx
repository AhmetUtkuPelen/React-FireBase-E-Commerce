import { NavLink } from 'react-router-dom'
import styles from './Footer.module.scss'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const date = new Date()
const Year = date.getFullYear()


const Footer = () => {
  return (
  <div className={styles.footer}>
    &copy; {Year} AUP
    <div className='flex'>
      <NavLink className="text-amber-400 hover:bg-white" to='https://github.com/AhmetUtkuPelen' target='_blank'><FaGithub size={30}/></NavLink>
      <NavLink className="text-amber-400 hover:bg-white" to='https://www.linkedin.com/in/ahmet-utku-pelen-4941b820b/' target='_blank'><FaLinkedin size={30}/></NavLink>
      <NavLink className="text-amber-400 hover:bg-white" to='https://www.instagram.com/rngd_aup/' target='_blank'><FaInstagram size={30}/></NavLink>
    </div>
  </div>
  )
}

export default Footer