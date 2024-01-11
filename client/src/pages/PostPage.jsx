import { useEffect, useState } from "react";
import { Post } from "../components/Post";

export const PostPage = () => {

    // to show posts
    const [posts, setPosts] = useState('');

    // Fetching Post
    useEffect(() => {
        fetch('http://localhost:4000/posts/getpost').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <div>
            {posts.length > 0 && posts.map(post => (
                    <Post {...post} />
                ))
            }
        </div>
    )
}