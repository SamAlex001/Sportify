import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostPage } from "./PostPage";
import '../styles/home.css';
import { Post } from "../components/Post";
import { SearchBar } from "../components/SearchBar";

export const Home = () => {

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const username = userInfo?.username;

    function userLoggedIn() {
        fetch('http://localhost:4000/user/profile', {
            credentials: 'include',
        }).then((response) => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }
    // USER STATUS: Logged In or Not
    useEffect(() => {
        navigate('/')
        userLoggedIn();
    }, []);

    // LOGOUT Function
    function logout() {
        fetch('http://localhost:4000/auth/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    return (
        <div>
            <h1>Home Page</h1>
            {username && (<p>Welcome {username}</p>)}
            {username && <button onClick={logout}>Logout</button>}
            {!username && <button onClick={() => { navigate('/signup') }}>Sign Up</button>}
            {!username && <button onClick={() => { navigate('/login') }}>Login</button>}
            {username && <button onClick={() => { navigate('/createPost') }}>Create Post</button>}
            {username && <button onClick={() => { navigate(`/profilePage/${userInfo.id}`) }}>View Profile </button>}
            <br /><br />
            <SearchBar />
        </div>
    )
}