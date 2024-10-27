import { useEffect, useState } from 'react'
import styles from './AdminViewProducts.module.scss'
import { toast } from 'react-toastify'
import { collection, query, onSnapshot , orderBy } from "firebase/firestore";
import { db, storage } from '../../../FireBase/Config';
import { Link, } from 'react-router-dom';
import { FaEdit , FaTrashAlt } from 'react-icons/fa';
import Loader from './../../Loader/Loader';
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../../Redux/Slice/ProductSlice';
import UseFetchCollection from '../../../CustomHooks/UseFetchCollection';



const AdminViewProducts = () => {

  const {data , isLoading} = UseFetchCollection("products")

  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(
      STORE_PRODUCTS({
        products:data,
      })
    )
  },[dispatch,data])

  // const [products , setProducts] = useState([])

  // const [isLoading , setIsLoading] = useState(false)

  // useEffect(()=>{
  //   GetProducts()
  // },[])

  // const GetProducts = () => {
  //   setIsLoading(true)
  //   try {

  //     const productsRef = collection(db, "products")

  //     const q = query(productsRef, orderBy("createdAt", "desc"))

  //     onSnapshot(q, (snapshot) => {
  //       const AllProducts = snapshot.docs.map((doc) => ({
  //         id:doc.id,
  //         ...doc.data()
  //       }))
  //       console.log(AllProducts)
  //       setProducts(AllProducts)
  //       setIsLoading(false)
  //       dispatch(STORE_PRODUCTS({
  //         products:AllProducts
  //       }))
  //     })
    
  //   } catch (error) {
  //     setIsLoading(false)
  //     toast.error(error.message)
  //   }

  // }


  const ConfirmDelete = (id,imageURL) => {
    Notiflix.Confirm.show(
      '! DELETE PRODUCT !',
      'Are You Sure You Want To Delete This Item ?',
      'YES',
      'NO',
      function okCb() {
        DeleteProduct(id,imageURL)
      },
      function cancelCb() {
        toast.info("Well Okay Then...")
      },
      {
        width: '320px',
        borderRadius: '5px',
        titleColor:'red',
        okButtonBackground:'blue',
        cancelButtonBackground:'red',
        cssAnimationStyle:'zoom',
      },
    );
  }



  const DeleteProduct = async (id,imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id))

      const storageRef = ref(storage, imageURL)

      await deleteObject(storageRef)

      toast.success('Product Has Been Deleted Successfully !')

    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h2 className='text-amber-600'>ALL PRODUCTS</h2>
      {products.length === 0 ? (
        <p>No Products Have Been Found !</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>Number</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody className='text-center'>
          {products.map((product,index) => {
            const {id,name,price,imageURL,category} = product
            return(
              <tr key={id}>
                <td className='font-bold text-blue-600 text-2xl'>{index+1}</td>
                <td><img src={imageURL} alt={name} className='w-[150px]'/></td>
                <td className='font-bold text-blue-600'>{name}</td>
                <td className='font-bold text-blue-600'>{category}</td>
                <td className='text-blue-600 font-bold'>{`${price}`}</td>
                <td>
                  <Link to={`/admin/addProduct/${id}`}><FaEdit size={20} color='blue'/></Link>
                  &nbsp;
                  <FaTrashAlt color='red' size={20} className='cursor-pointer' onClick={() => ConfirmDelete(id,imageURL)}/>
                </td>
              </tr>
            )
          })}
        </tbody>
        </table>
      )}
    </div>     
    </>
  )
}

export default AdminViewProducts