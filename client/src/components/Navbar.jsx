import '../styles/navbar.css';
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";


export const Navbar = () => {

   const navigate = useNavigate();
   const { userInfo, setUserInfo } = useContext(UserContext);
   const username = userInfo?.username;
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const [clicked, setClicked] = useState(false);

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
      <nav className="navbar">
         <ul id="nav-mobile" className="right">
            <li><Link to={'/'}><img src={Logo} alt="Image_Not_Loading" /></Link></li>
            <li><Link to={'/'}> Home</Link> </li>
            <li><Link to={'/aboutUs'}>About Us</Link></li>
            <li><Link to={'/customerSupport'}>Customer Support</Link></li>
            <li><Link to={'/exploreBlogs'}>Explore Blogs</Link></li>
            <li><Link to={'/liveScore'}>Live Score</Link></li>
            {username &&
               <li>
                  <button
                     type="button"
                     id="home-create-post"
                     value="submit"
                     onClick={() => { navigate("/createPost") }}
                  >Create Blog</button>
               </li>
            }
            <li>
               {!username ?
                  <>
                     <button className="home-user-login"
                        onClick={() => { navigate("/signup") }}
                     >Sign Up</button>
                     &nbsp;
                     or
                     &nbsp;
                     <button className="home-user-login"
                        onClick={() => { navigate("/login") }}
                     >LogIn</button>
                  </> :
                  <div className="home-user-logout-container">
                     <div className="home-username"
                        onClick={() => { setClicked(!clicked) }}>
                        <FaRegUser className='navbar-user-icon' />{username}
                     </div>
                     {clicked &&
                        <button className='home-user-logout'
                           onClick={() => { logout() }}>LogOut</button>
                     }
                  </div>
               }
            </li>
         </ul>
      </nav>
   );
}