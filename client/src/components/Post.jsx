import '../styles/post.css';
import { format } from 'date-fns';

export const Post = (
    { title, summary, cover, content, createdAt, author }
) => {
    return (
        <div className="post-container">
            <div className="post-title">{title}</div>
            <div className="post-summary">{summary}</div>
            <div className="post-author">{author.username}</div>
            <div className="post-time">{format(new Date(createdAt), 'MM dd, yyyy')}</div>
            <div className="post-cover"><img src={'http://localhost:4000' + cover} alt="COVER_IMG_NOT_LOADING" /></div>
            <div className="post-content">{content}</div>
        </div>
    )
}