import { useSelector } from "react-redux"
import { selectEmail } from "../../Redux/Slice/AuthSlice"
import { NavLink } from "react-router-dom"


// ! ADMIN ONLY ROUTE ! \\
// ? if a non admin user tries to use some admin related links \\

const AdminOnlyRoute = ({children}) => {

  const userEmail = useSelector(selectEmail)

  if(userEmail === process.env.REACT__APP_ADMIN_USER && "aupsidechar@gmail.com"){
    return children
  }

  return (
    <section className="text-center container">
      <div className="text-center mt-60">
        <h2 className="text-red-700 font-bold underline cursor-not-allowed">YOU HAVE NO PERMISSION TO SEE THIS PAGE !</h2>
        <NavLink to='/' className="font-bold text-5xl --btn --btn-primary hover:text-red-700 hover:bg-white">&rarr;  ONLY ADMIN CAN VIEW THIS PAGE  &larr;</NavLink>
      </div>
    </section>
  )

}
// ! ADMIN ONLY ROUTE ! \\






// ! ADMIN ONLY LINK ! \\
// ? to determine if the current user is admin or not \\

export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail)

  if(userEmail === "aupsidechar@gmail.com"){
    return children
  }

  return null

}

// ! ADMIN ONLY LINK ! \\



export default AdminOnlyRoute