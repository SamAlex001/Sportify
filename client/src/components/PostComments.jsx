import { MdDelete, MdEdit } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { DialogBox } from "./DialogBox";
import '../styles/postComments.css';

export const Comment = ({ commentInfoInput }) => {
   const { userInfo } = useContext(UserContext);
   const [isEditing, setIsEditing] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   const [idToDelete, setIdToDelete] = useState(null);
   const [editedComment, setEditedComment] = useState(commentInfoInput.comment);

   useEffect(() => {
      setEditedComment(commentInfoInput.comment);
   }, [commentInfoInput.comment]);

   async function deleteComment(id) {
      setOpenDialog(true);
      setIdToDelete(id);
   }

   const handleDeleteConfirm = async () => {
      setOpenDialog(false);
      try {
         await fetch(`http://localhost:4000/comments/deletecomment/${idToDelete}`, {
            method: 'DELETE',
            credentials: 'include'
         });
         window.location.reload(true);
      } catch (err) {
         console.log(err);
      }
   };

   const handleDeleteCancel = () => {
      setOpenDialog(false);
   };

   async function updateComment(id) {
      try {
         await fetch(`http://localhost:4000/comments/updatecomment/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: editedComment }),
            credentials: 'include'
         });
         setIsEditing(false);
         window.location.reload(true);
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className="postComm-container">
         <div className="postComm-content">
            <div className="postComm-user">
               <h3 className="postComm-author">@{commentInfoInput.author}</h3>
               {userInfo?.id === commentInfoInput?.userId && (
                  <>
                     <span className="postComm-edit-btn" onClick={() => setIsEditing(true)}>
                        <MdEdit />
                     </span>
                     <span className="postComm-del-btn" onClick={() => deleteComment(commentInfoInput._id)}>
                        <MdDelete />
                     </span>
                  </>
               )}
            </div>
            <div className="postComm-feat">
               <p className="postComm-date">{new Date(commentInfoInput.updatedAt).toString().slice(0, 15)}</p>
               <p className="postComm-time">{new Date(commentInfoInput.updatedAt).toString().slice(16, 24)}</p>
            </div>
         </div>
         {isEditing ? (
            <div className="postComm-comment-edit-container">
               <textarea
                  className="postComm-comment-edit"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
               />
            </div>
         ) : (
            <p className="postComm-comment">{commentInfoInput.comment}</p>
         )}
         {isEditing && (
            <div className="postComm-edit-options">
               <button className="postComm-update-btn" onClick={() => updateComment(commentInfoInput._id)}>
                  Update
               </button>

               <button className="postComm-cancel-btn" onClick={() => setIsEditing(!isEditing)}>
                  Cancel
               </button>
            </div>
         )}
         <DialogBox
            isOpen={openDialog}
            closeDialog={handleDeleteCancel}
            handleDeleteConfirm={handleDeleteConfirm}
            description={"Are you sure you want to delete this comment?"}
            title={"Delete the comment"}
         />
      </div>
   );
};
