import styles from './Loader.module.scss'
import LoaderGif from '../../Assets/loader.gif'
import ReactDOM from 'react-dom'



const Loader = () => {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={LoaderGif}/>
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader