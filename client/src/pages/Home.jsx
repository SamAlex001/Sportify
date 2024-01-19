import '../styles/home.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SearchBar } from "../components/SearchBar";
import { CategoryScroll } from '../components/CategoryScroll';

export const Home = () => {

    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const username = userInfo?.username;
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    async function checkUserStatus() {
        try {
            const response = await fetch('http://localhost:4000/user/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const userInfo = await response.json();
                setUserLoggedIn(true);
                setUserInfo(userInfo);
            } else if (response.status === 401) {
                setUserLoggedIn(false);
                console.log("401 ERROR: Unauthorized User!");
            }
        } catch (error) {
            console.error("Error Checking User Status: ", error);
        }
    }
    
    // USER STATUS: Logged In or Not
    useEffect(() => {
        checkUserStatus();
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
            <button onClick={() => { navigate('/liveScore') }}>Live Score</button>
            <br /><br />
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