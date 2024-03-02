import '../styles/profilePage.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loaders';

export const ProfilePage = () => {

   const { id } = useParams();
   const { userInfo, setUserInfo } = useContext(UserContext);
   const [username, setUsername] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPass, setConfirmPass] = useState('');
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const [loading, setLoading] = useState(false);


   async function checkUserStatus() {
      try {
         const response = await fetch('http://localhost:4000/user/profile', {
            credentials: 'include'
         });
         if (response.ok) {
            const userInfo = await response.json();
            setUserLoggedIn(true);
            setUserInfo(userInfo);
            // window.location.reload();
         } else if (response.status === 401) {
            // setUserLoggedIn(userLoggedIn);
            console.log("401 ERROR: Unauthorized User!");
         }
      } catch (error) {
         console.error("Error Checking User Status: ", error);
      }
   }

   async function viewProfile() {
      if (userLoggedIn) {
         try {
            const response = await fetch(`http://localhost:4000/user/viewprofile/${id}`, {
               credentials: 'include'
            });
            console.log("API response: ", response);
            if (response.ok) {
               const userInfo = await response.json();
               console.log("User Info from API:", userInfo);
               setUserInfo(userInfo.userDoc);
               setUsername(userInfo.userDoc.username);
               setUserEmail(userInfo.userDoc.email);
            } else {
               console.error("No Response");
            }
         } catch (error) {
            console.log("Error loading User Data: ", error);
         }
      } else {
         console.log("User Not Logged In")
      }
   }
   
   async function updateUserDetails(e) {
      e.preventDefault();
   
      const newUserName = username;
      const newEmail = userEmail;
      const newPassword = password !== '' && confirmPass !== '' ? confirmPass : userInfo.password;
      
      // Check if passwords match
      if (password !== confirmPass) {
         toast.error('Passwords do not match');
         return;
      }
   
      try {
         const response = await fetch('http://localhost:4000/user/updateprofile/' + id, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               username: newUserName,
               email: newEmail,
               password: newPassword,
            })
         });
   
         if (response.ok) {
            setLoading(!loading);
            setTimeout(() => {
               window.location.reload();
            }, 1000);
            toast.success('Profile Updated!');
         } else {
            toast.error('Profile Update Failed');
         }
      } catch (error) {
         console.error('Error updating profile:', error);
         toast.error('An error occurred while updating profile');
      }
   }
   

   useEffect(() => {
      if (userLoggedIn) {
         viewProfile();
      }
   }, [userLoggedIn]);
   
   useEffect(() => {
      checkUserStatus();
   }, [])

   return (
      <>
         <Navbar />
         <div className="prof-container">
            <form className="prof-content-container" onSubmit={updateUserDetails}>
               <div className="prof-username">
                  Username: <input type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)} />
               </div>
               <div className="prof-email">
                  Email: <input type="email"
                     value={userEmail}
                     onChange={(e) => setUserEmail(e.target.value)}
                  />
               </div>
               <div className="prof-password">
                  Update Password: <input type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="prof-password">
                  Confirm Password: <input type="password"
                     value={confirmPass}
                     onChange={(e) => setConfirmPass(e.target.value)}
                  />
               </div>
               <button>Update Profile</button>
            </form>
            {loading && <div className='prof-loader'><Loader /></div>}
         </div>
      </>
   )
}
