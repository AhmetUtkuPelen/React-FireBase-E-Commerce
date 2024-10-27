import { useState } from 'react'
import styles from './AdminAddProduct.module.scss'
import Card from './../../Card/Card';
import { ref , uploadBytesResumable , getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../../../FireBase/Config';
import { toast } from 'react-toastify';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../Redux/Slice/ProductSlice';




// ? Category Array \\
const categories = [
  {id:1,name:"Laptop"},
  {id:2,name:"Phone"},
  {id:3,name:"Fashion"},
  {id:4,name:"Electronics"},
]

// ? Initial State ? \\
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};


const AdminAddProduct = () => {

  const {id} = useParams()

  const Products = useSelector(selectProducts)

  const ProductEdit = Products.find((item) => item.id === id)


  const [product , setProduct] = useState(() => {
    const newState = DetectForm(id,
      {...initialState},
      ProductEdit
    )
    return newState
  })


  const [uploadProgress , setUploadProgress] = useState(0)
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()


  function DetectForm (id,f1,f2) {
    if(id === "ADD"){
      return f1
    }else{
      return f2
    }
  }

  const HandleInputChange = (e) => {
    const {name,value} = e.target
    setProduct({...product,[name]:value})
  }

  const HandleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage, `eCommerce/${Date.now()}${file}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
   
      }, 
      (error) => {
        toast.error(error.message)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product,imageURL:downloadURL})
          toast.success(`Image Uploaded Successfully !`)
        });
      }
    );
  }



  const AddProduct = (e) => {
    e.preventDefault()
    
    setIsLoading(true)

    try {
      const docRef = addDoc(collection(db, "products"), {
        name:product.name,
        imageURL:product.imageURL,
        price:Number(product.price),
        category:product.category,
        brand:product.brand,
        description:product.description,
        createdAt:Timestamp.now().toDate()
      });
      setIsLoading(false)
      setUploadProgress(0)
      setProduct({name:"",imageURL:"",price:0,category:"",brand:"",description:""})
      toast.success(`Product Added Successfully`)
      navigate('/admin/allProducts')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }

  }

  const EditProduct = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (product.imageURL !== ProductEdit.getImageURL) {
      const storageRef = ref(storage, ProductEdit.imageURL)
      deleteObject(storageRef)
    }

    try {
      setDoc(doc(db, "products", id), {
        name:product.name,
        imageURL:product.imageURL,
        price:Number(product.price),
        category:product.category,
        brand:product.brand,
        description:product.description,
        createdAt:ProductEdit.createdAt,
        editedAt:Timestamp.now().toDate(),
      });
      setIsLoading(false)
      toast.success(`Product Has Been Edited Successfully !`)
      navigate('/admin/allProducts')
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.product}>
      <h1 className='font-bold text-blue-500'>{DetectForm(id,"ADD PRODUCT","EDIT PRODUCT")}</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={DetectForm(id,AddProduct,EditProduct)}>
          
          <label className='text-3xl text-amber-500'>Product Name</label>
          <input type='text' placeholder='Product Name' required name='name' value={product.name} onChange={(e)=>HandleInputChange(e)}/>

          <label className='text-3xl text-amber-500'>Product Image</label>
          <Card cardClass={styles.group}>

            {uploadProgress === 0 ? null : (
                          <div className={styles.progress}>
                          <div className={styles["progress-bar"]} style={{width:`${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `Uploading Image ${uploadProgress}` : `Upload Completed ${uploadProgress}%`}
                          </div>
                        </div>
            )}

            <input type='file' placeholder='Product Image' accept='image/*' name='image' onChange={(e)=>HandleImageChange(e)}/>
            {product.imageURL === "" ? null : (
              <input type='text' required name='imageURL' disabled value={product.imageURL}/>
            )}
          </Card>

          <label className='text-3xl text-amber-500'>Product Price</label>
          <input type='number' placeholder='Product Price' required name='price' value={product.price} onChange={(e)=>HandleInputChange(e)}/>

          <label className='text-3xl text-amber-500'>Product Category</label>
          <select name='category' required value={product.category} onChange={(e)=>HandleInputChange(e)}>
            <option value="" disabled>Choose Category Please</option>
            {categories.map((cat)=>{
              return (
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              )
            })}
          </select>

          <label className='text-3xl text-amber-500'>Product Brand</label>
          <input type='text' placeholder='Product Brand' required name='brand' value={product.brand} onChange={(e)=>HandleInputChange(e)}/>

          <label className='text-3xl text-amber-500'>Product Description</label>
          <textarea placeholder='Product Description' required name='description' value={product.description} onChange={(e)=>HandleInputChange(e)} cols="20" rows="10"/>

          <button type='submit' className='--btn --btn-primary --btn-block'>{DetectForm(id,"ADD","EDIT")}</button>

        </form>
      </Card>      
    </div>
    </>
  )
}

export default AdminAddProduct