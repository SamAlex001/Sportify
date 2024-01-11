import { MdDelete } from "react-icons/md";
import '../styles/postComments.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export const PostComments = () => {

   const { userInfo, setUserInfo } = useContext(UserContext);
   const [postInfo, setPostInfo] = useState(null);
   const [commentsInfo, setCommentsInfo] = useState('');
   const { id } = useParams();

   useEffect(() => {
      fetch(`http://localhost:4000/posts/viewpost/${id}`)
         .then(response => {
            response.json().then(postInfo => {
               setPostInfo(postInfo);
            });
         });
   }, []);


   function deleteComment() {
      // DELETE comment
   }
   
   // console.log(userInfo)
   // console.log(postInfo)

   return (
      <div className="comm-container">
         <div className="comm-author-delete-wrapper">
            <div className="comm-author">@author</div>
            {/* 
            <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p> 
            */}
            {userInfo.username === userInfo.username &&
               <div className="comm-delete"
                  onClick={() => deleteComment()}
               >
                  <MdDelete className="comm-del-icon" />
               </div>
            }
         </div>
         <div className="comm-content-container">
            <div className="comm-content">
               Hello! Comment Section Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, nesciunt. Delectus, fugit fuga.
               Magni sapiente temporibus, distinctio laudantium fugiat alias? Nulla ex minima atque hic? Aliquid suscipit culpa hic nam?
            </div>
            <div className="comm-postBtn-container">
               <button className="comm-post-btn ">Post</button>
            </div>
         </div>
      </div>
   )
}