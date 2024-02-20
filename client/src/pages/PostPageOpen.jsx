import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostComments } from "../components/PostComments";
import { Comment } from "../components/Comments";
import '../styles/postPageOpen.css';
import { Navbar } from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import { AlertDialog } from "../components/DialogBox";
import { PostModal } from "../components/Modal";
import { Loader } from "../components/Loaders";

export const PostPageOpen = () => {

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const [commentInfo, setCommentInfo] = useState(null);
    const [postCover, setPostCover] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const adjustedCover = postCover.substring(10);
    const URL = "http://localhost:5173/"
    const { id } = useParams();

    const toggleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    }

    const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete);
    }

    const toggleLoading = () => setLoading(!loading)

    useEffect(() => {

        // USER PROFILE Fetching
        fetch(`http://localhost:4000/user/profile`, {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                // console.log(userIfno)
            });
        });

        // VIEW POSTS
        fetch(`http://localhost:4000/posts/viewpost/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                    setPostCover(postInfo.cover);
                });
            });

        // GET COMMENTS
        fetch('http://localhost:4000/comments/getcomment/' + id)
            .then(response => response.json()
                .then(commentInfo => {
                    setCommentInfo(commentInfo);
                    // console.log(commentInfo)
                }));
    }, []);
    // console.log(adjustedCover)
    // console.log(postCover);

    async function deletePost(e) {
        e.preventDefault();
        toggleConfirmDelete();
        if (confirm("Delete Post?").valueOf()) {
            console.log("Ok Clicked");
            const response = await fetch(`http://localhost:4000/posts/deletepost/${id}`, {
                credentials: "include",
                method: 'DELETE'
            });
            if (response.ok) {
                toggleDeleteModal();
                toggleLoading();
                setTimeout(() => {
                    navigate("/exploreBlogs");
                }, 1000)
            }
        } else {
            console.log("Cancel Clicked")
        }

    }

    if (!postInfo) return ''; // return empty string for no post

    return (
        <>
            <Navbar />
            {!loading &&
                <div className="postOpen-container">
                    <button className="postOpen-home-btn" onClick={() => navigate("/exploreBlogs")}>Go Back</button>
                    <div className="postOpen-title">{postInfo.title}</div>
                    <div className="postOpen-author-container">
                        <div className="postOpen-author">
                            Author: @{postInfo.author.username}
                        </div>
                    </div>
                    <div className="postOpen-contentInfo">
                        <div className="postOpen-time">
                            Published At: {format(new Date(postInfo.createdAt), 'dd-MM-yyyy')}
                        </div>
                        <div className="postOpen-edit-btnWrapper">
                            {userInfo.id === postInfo.author._id && (
                                <>
                                    <button
                                        className="postOpen-edit-btn"
                                        onClick={() => navigate(`/editPost/${postInfo._id}`)}
                                    >Edit Post</button>
                                    <button className="postOpen-delete-btn"
                                        onClick={deletePost}
                                    ><MdDelete className="ep-delete-icon" /></button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="postOpen-cover-container">
                        <img src={URL + adjustedCover} alt="IMG_NOT_LOADING" />
                    </div>
                    <div className="postOpen-contentWrapper"
                        dangerouslySetInnerHTML={{ __html: postInfo.content }}
                    >{/* Put Content here*/}</div>
                    <div className="postOpen-comment">
                        <PostComments />
                    </div>
                    <div className="postOpen-commentStack">
                        {commentInfo?.map((commentInfo) =>
                            <Comment key={commentInfo.id} commentInfoInput={commentInfo} postInfoInput={postInfo} />
                        )}
                    </div>
                </div>}
            {/* <AlertDialog /> */}
            <PostModal isOpen={deleteModalOpen} closeModal={toggleDeleteModal}
                description={"Post Deleted Successfully!"}
            />
            {loading && <div className="postOpen-loading"><Loader /></div>}
        </>
    )
}