import '../styles/profilePage.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const ProfilePage = () => {

   const { id } = useParams();
   const { userInfo, setUserInfo } = useContext(UserContext);
   const [username, setUsername] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPass, setConfirmPass] = useState('');
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const [clicked, setClicked] = useState(false);
   const navigate = useNavigate();

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

   async function viewProfile() {
      const response = await fetch(`http://localhost:4000/user/viewprofile/${id}`, {
         credentials: 'include'
      });
      if (response.ok) {
         response.json().then(userInfo => {
            // console.log(userInfo);
            setUserInfo(userInfo.userDoc);
            setUsername(userInfo.userDoc.username);
            setUserEmail(userInfo.userDoc.email);
         });
      } else {
         console.error("No Response");
      }
   }
   

   useEffect(() => {
      viewProfile();
      checkUserStatus();
   }, []);

   // console.log(userInfo)
   // console.log(username);
   // console.log(userEmail);
   // console.log(password);
   // console.log(password)
   // console.log(confirmPass)

   async function updateUserDetails(e) {
      e.preventDefault();

      const newUserName = username;
      const newEmail = userEmail;
      const newPassword = password !== '' && confirmPass !== '' ? confirmPass : userInfo.password;
      if (!(password === confirmPass)) alert('Enter Correct Password on both fields');

      const response = await fetch('http://localhost:4000/user/updateprofile/' + id, {
         method: 'PUT',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            username: newUserName,
            email: newEmail,
            password: newPassword,
         })
      })

      if (response.ok) { alert('Profile Updated!') } else { alert('Profile Upadtion Failed') }
   }

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
         </div>
      </>
   )
}
