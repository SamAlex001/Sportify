import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export const PostPageOpen = () => {

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
        <div>
            <h1>{formatISO9075(new Date(postInfo.createdAt))}</h1>
            <div className="post-cover-container">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="IMG_NOT_LOADING" />
            </div>
            <h1>{postInfo.title}</h1>
            {userInfo.id === postInfo.author._id && (
                <div>
                    <Link to={`/editPost/${postInfo._id}`}>
                        <button>Edit Post</button>
                    </Link>
                </div>
            )
            }
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div> {/* Put Content here*/}
        </div>
    )
}