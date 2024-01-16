import '../styles/post.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'

export const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {

    const navigate = useNavigate();

    return (
        <div className="post-container">
            <div className="post-cover" onClick={() => navigate(`/post/${_id}`)}>
                <img src={`${cover}`} alt="COVER_IMG_NOT_LOADING" />
            </div>
            <div className="post-details">
                <div className="post-title" onClick={() => navigate(`/post/${_id}`)}>{title}</div>
                <div className="post-author">Author: @{author.username}</div>
                <div className="post-time">Published At: {format(new Date(createdAt), 'MM dd, yyyy')}</div>
                <br />
                <div className="post-summary">{summary}</div>
                <br />
                <br />
                <button className='post-read-btn' onClick={() => navigate(`/post/${_id}`)}>Read Now</button>
            </div>
        </div>
    )
}