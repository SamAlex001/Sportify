import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostComments } from "../components/PostComments";
import { Comment } from "../components/Comments";
import '../styles/postPageOpen.css';

export const PostPageOpen = () => {

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const [commentInfo, setCommentInfo] = useState(null);
    const [postCover, setPostCover] = useState('');
    const adjustedCover = postCover.substring(10);
    const URL = "http://localhost:5173/"
    const { id } = useParams();

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

    if (!postInfo) return ''; // return empty string for no post

    return (
        <div className="postOpen-container">
            <button className="postOpen-home-btn" onClick={() => navigate('/')}>Go Home</button>
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
                        <button
                            className="postOpen-edit-btn"
                            onClick={() => navigate(`/editPost/${postInfo._id}`)}
                        >Edit Post</button>
                    )}
                </div>
            </div>
            <div className="postOpen-cover-container">
                <img src={URL+adjustedCover} alt="IMG_NOT_LOADING" />
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
        </div>
    )
}