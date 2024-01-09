import '../styles/post.css';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'

export const Post = (
    { _id, title, summary, cover, content, createdAt, author }
) => {
    return (
        <div className="post-container">
            <Link to={`/post/${_id}`}>
                <div className="post-title">{title}</div>
            </Link>
            <div className="post-summary">{summary}</div>
            <div className="post-author">{author.username}</div>
            <div className="post-time">{format(new Date(createdAt), 'MM dd, yyyy')}</div>
            <Link to={`/post/${_id}`}>
                <div className="post-cover"><img src={'http://localhost:4000/' + cover} alt="COVER_IMG_NOT_LOADING" /></div>
            </Link>
            <div className="post-content">{content}</div>
        </div>
    )
}