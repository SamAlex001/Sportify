import '../styles/footerDark.css';
import '../styles/footerLight.css';

export const FooterDark = () => {
   return (
      <footer className="footer">
         <div className="footer-content">
            <ul>
               <h3>Sportify</h3>
               <p>About Us</p>
               <p>Terms of Services</p>
               <p>Privacy Policy</p>
               <p>Copyright © 2024</p>
            </ul>
         </div>
         <div className='footer-content' >
            <ul>
               <h3>More Links</h3>
               <p>User Forum</p>
               <p>Latest Blog</p>
               <p>Trending Blog</p>
               <p>Sign up as Author</p>
            </ul>
         </div>
         <div className="column">
            <div className="footer-icon">
               <ul>
                  <ul>
                     <i className="fa-brands fa-x-twitter"></i>
                     <i className="fa-brands fa-instagram"></i>
                     <i className="fa-brands fa-pinterest"></i>
                     <i className="fa-brands fa-facebook"></i>
                  </ul>
               </ul>
            </div>
         </div>
      </footer>
   );
};

export const FooterLight = () => {
   return (
      <footer className="footer1">
         <div className="footer-content">
            <ul>
               <h3>Sportify</h3>
               <p>About Us</p>
               <p>Terms of Services</p>
               <p>Privacy Policy</p>
               <p>Copyright © 2024</p>
            </ul>
         </div>
         <div className='footer-content' >
            <ul>
               <h3>More Links</h3>
               <p>User Forum</p>
               <p>Latest Blog</p>
               <p>Trending Blog</p>
               <p>Sign up as Author</p>
            </ul>
         </div>
         <div className="column">
            <div className="footer-icon">
               <ul>
                  <ul>
                     <i className="fa-brands fa-x-twitter"></i>
                     <i className="fa-brands fa-instagram"></i>
                     <i className="fa-brands fa-pinterest"></i>
                     <i className="fa-brands fa-facebook"></i>
                  </ul>
               </ul>
            </div>
         </div>
      </footer>

   );
};