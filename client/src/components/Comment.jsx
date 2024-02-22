import '../styles/comments.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

export const PostComments = () => {

   const { id } = useParams();
   const { userInfo } = useContext(UserContext);
   const [comment, setComment] = useState('');
   const [postId, setPostId] = useState('');
   const [postAuthor, setPostAuthor] = useState('');
   const [username, setUsername] = useState('');
   const [userId, setUserId] = useState('');

   useEffect(() => {
      setUsername(userInfo.username);
      setUserId(userInfo.id);

      fetch('http://localhost:4000/posts/viewpost/' + id)
         .then(response => response.json()
            .then(postInfo => {
               setPostId(postInfo._id);
               setPostAuthor(postInfo.author.username);
            }))
   }, []);
   // console.log(postId)

   async function postComment(e) {
      e.preventDefault();
      const data = new FormData();
      data.set('comment', comment);
      data.set('postId', postId);

      if (comment === '') { alert('Write a comment before posting') }
      else {
         const response = await fetch('http://localhost:4000/comments/postcomment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               comment: comment,
               author: username,
               postId: postId,
               userId: userId,
               postAuthor: postAuthor
            }),
            credentials: 'include',
         });
         if (response.ok) {
            setComment('')
            alert('Comment Posted')
         }
         window.location.reload();
      }
   }

   return (
      <div className="comm-container">
         <form onSubmit={postComment} className="comm-content-container" >
            <div className="comm-content">
               <textarea type="text"
                  value={comment}
                  onChange={(e) => { setComment(e.target.value) }}
                  placeholder='Comment here'
               />
            </div>
            <div className="comm-postBtn-container">
               <button className="comm-post-btn">Post</button>
            </div>
         </form>
      </div>
   )
}