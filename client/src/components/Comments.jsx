import { MdDelete } from "react-icons/md"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"

export const Comment = ({ commentInfoInput, postInfoInput }) => {

   const { userInfo } = useContext(UserContext)
   const commId = commentInfoInput._id;
   useEffect(() => {

   }, [])
   async function deleteComment(id) {
      try {
         // await fetch("http:")
         await fetch("http://localhost:4000/comments/deletecomment/" + id, {
            method: 'DELETE',
            credentials: 'include'
         })
         window.location.reload(true)
      }
      catch (err) {
         console.log(err)
      }
   }

   // console.log(commentInfoInput._id)
   // console.log(postInfoInput)
   // console.log(userInfo)

   return (
      <div className="postComm-container">
         <div className="postComm-content">
            <h3 className="">@{commentInfoInput.author}</h3>
            <div className="flex justify-center items-center space-x-4">
               <p>{new Date(commentInfoInput.updatedAt).toString().slice(0, 15)}</p>
               <p>{new Date(commentInfoInput.updatedAt).toString().slice(16, 24)}</p>
               {userInfo?.id === commentInfoInput?.userId
                  ? <div className="flex items-center justify-center space-x-2">
                     <p className="cursor-pointer"
                        onClick={(e) => {
                           e.preventDefault();
                           deleteComment(commId)
                        }}><MdDelete /></p>
                  </div>
                  : ""
               }
            </div>
         </div>
         <p className="px-4 mt-2">{commentInfoInput.comment}</p>
      </div>
   )
}