import { format } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import '../styles/postPageOpen.css'

export const PostPageOpen = () => {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, []);

    if (!postInfo) return ''; // return empty string for no post

    return (
        <div className="postOpen-container">
            <button className="postOpen-home-btn" onClick={() => navigate('/')}>Go Home</button>
            <div className="postOpen-title">{postInfo.title}</div>
            <div className="postOpen-author-container">
                <div className="postOpen-author">Author: @{postInfo.author.username}</div>
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
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="IMG_NOT_LOADING" />
            </div>
            <div
                className="postOpen-contentWrapper"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
            ></div> {/* Put Content here*/}
        </div>
    )
}