import styles from './ProductItem.module.scss'
import Card from './../../Card/Card';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../Redux/Slice/CartSlice';



const ProductItem = ({product,grid,id,name,price,description,imageURL}) => {

  const TextShorten = (text,num) => {
    if(text.length > num){
      const TextShortened = text.substring(0,num).concat("...")
      return TextShortened
    }
    return text
  }

  const dispatch = useDispatch()

  const AddToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
     
      <Link to={`/productDetails/${id}`}>
      <div className={styles.img}>
        <img src={imageURL} alt={name}/>
      </div>
      </Link>

    <div className={styles.content}>
      <div className={styles.details}>
        <p>{`${price}`}</p>
        <h4 className='mt-4'>{TextShorten(name,10)}</h4>
      </div>
      {!grid && <p className={styles.description}>{TextShorten(description,100)}</p>}
      <button className="--btn --btn-danger mt-4" onClick={() => AddToCart(product)}>ADD TO CART</button>
    </div>

    </Card>
  )
}

export default ProductItem