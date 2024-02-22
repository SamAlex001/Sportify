import '../styles/navbar.css';
import Logo from "../assets/Logo.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

export const Navbar = () => {

   const id = useParams();
   const navigate = useNavigate();
   const { userInfo, setUserInfo } = useContext(UserContext);
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const username = userInfo?.username;
   const [clicked, setClicked] = useState(false);

   // Function USER STATUS: Logged In or Not
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

   // Navigate to Profile
   async function navigateProfile() {
      const response = await fetch(`http://localhost:4000/user/profile`, {
         credentials: "include"
      });
      if (response.ok) {
         response.json().then((res) => {
            // console.log(res.id)
            navigate(`/profilePage/${res.id}`)
         })
      }
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
                     id="navbar-create-post"
                     value="submit"
                     onClick={() => { navigate("/createPost") }}
                  >Create Blog</button>
               </li>
            }
            <li>
               {!username ?
                  <div className='navbar-user-login-signup-container'>
                     <button className="navbar-user-login-btn"
                        onClick={() => { navigate("/signup") }}
                     >Sign Up</button>
                     or
                     <button className="navbar-user-login-btn"
                        onClick={() => { navigate("/login") }}
                     >LogIn</button>
                  </div> :
                  <div className="navbar-user-settings">
                     <div className="navbar-username"
                        onClick={() => { setClicked(!clicked) }}>
                        <FaRegUser className='navbar-user-icon' />{username}
                     </div>
                     {clicked &&
                        <div className='navbar-user-options-wrapper'>
                           <GoTriangleUp className='navbar-options-arrow' />
                           <button className='navbar-user-profile-btn'
                              onClick={navigateProfile}
                           ><IoIosSettings className='navber-user-options-icon' />Profile</button>
                           <button className='navbar-user-logout-btn'
                              onClick={() => { logout() }}
                           ><IoIosLogOut className='navber-user-options-icon' />LogOut</button>
                        </div>
                     }
                  </div>
               }
            </li>
         </ul>
      </nav >
   );
}