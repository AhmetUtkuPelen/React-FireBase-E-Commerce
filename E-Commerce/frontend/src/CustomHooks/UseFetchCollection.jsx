import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { db } from "../FireBase/Config"







const UseFetchCollection = (collectionName) => {

    const [data , setData] = useState([])

    const [isLoading , setIsLoading] = useState(false)

    const GetCollection = () => {

    setIsLoading(true)
    
    try {

      const docRef = collection(db, collectionName)

      const q = query(docRef, orderBy("createdAt", "desc"))

      onSnapshot(q, (snapshot) => {
        const AllData = snapshot.docs.map((doc) => ({
          id:doc.id,
          ...doc.data()
        }))
        // console.log(AllData)
        setData(AllData)
        setIsLoading(false)
      })
    
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    GetCollection()
  },[])

  return {data,isLoading}

}



export default UseFetchCollection