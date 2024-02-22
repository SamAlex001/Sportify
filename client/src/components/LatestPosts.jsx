import '../styles/latestPosts.css';
import { PostPage } from '../pages/PostPage';

export const LatestPosts = () => {
   
   
   return (
      <div className="latest-posts-container">
         <h2 className='latest-posts-header'>Latest Posts</h2>
         <div className="latest-posts-list">
            <PostPage limit={2}/>
         </div>
      </div>
   );
};
