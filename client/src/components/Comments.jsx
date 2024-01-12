import axios from "axios"
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const Comment = ({ commentInfoInput, postInfoInput }) => {

   const { User } = useContext(UserContext)
   const deleteComment = async (id) => {
      try {
         await fetch("http:localhost:4000/comments/" + id, { withCredentials: true })
         window.location.reload(true)
      }
      catch (err) {
         console.log(err)
      }
   }
   // console.log(post.userId)
   // console.log(user._id)
   // console.log(post)
   // console.log(user)

   return (
      <div className="postComm-container">
         <div className="postComm-content">
            <h3 className="">@{commentInfoInput.author}</h3>
            <div className="flex justify-center items-center space-x-4">
               <p>{new Date(commentInfoInput.updatedAt).toString().slice(0, 15)}</p>
               <p>{new Date(commentInfoInput.updatedAt).toString().slice(16, 24)}</p>
               {User?._id === commentInfoInput?.userId
                  ? <div className="flex items-center justify-center space-x-2">
                     <p className="cursor-pointer" onClick={() => deleteComment(commentInfoInput._id)}><MdDelete /></p>
                  </div>
                  : ""
               }
            </div>
         </div>
         <p className="px-4 mt-2">{commentInfoInput.comment}</p>

      </div>
   )
}