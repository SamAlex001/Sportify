import { useEffect, useState } from "react";
import { Post } from "../components/Post";

export const PostPage = ({ search }) => {

    // SHOW posts
    const [posts, setPosts] = useState([]);
    const searchPost = search ? posts.filter(post => search.includes(post._id)) : posts; // Show searched posts or all

    // Fetching Post
    function getPost() {
        fetch('http://localhost:4000/posts/getpost').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            {searchPost && searchPost.length > 0
                ? (searchPost.map(searchedPost => <Post key={searchedPost._id} {...searchedPost} />))
                : (posts.map(post => <Post key={post._id} {...post} />))
            }
        </div>
    )
}