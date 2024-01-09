import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostPage } from "./PostPage";


export const Home = () => {

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext); // Calling username from context
    const username = userInfo?.username; // Check if userInfo is null, if false then give username

    // Checking if user Logged In
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then((response) => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    // Logout Function
    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    return (
        <div>
            {
                username && (<p>Welcome {username}</p>)
            }
            <h1>Home Page</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={() => { navigate('/signup') }}>Sign Up</button>
            <button onClick={() => { navigate('/login') }}>Login</button>
            <button onClick={() => { navigate('/createPost') }}>Create Post</button>
            <PostPage />
        </div>
    )
}