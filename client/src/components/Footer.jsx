import '../styles/footerDark.css';
import '../styles/footerLight.css';
import FooterLogo from "../assets/Logo.png";
import { FaInstagram, FaXTwitter, FaMeta, FaPinterest } from "react-icons/fa6";


export const FooterDark = () => {
   return (
      <footer className="footerDark">
         <div className="footer-content-container">
            <div className="footer-contentWrapper">
               <div className="footer-container-0">
                  <div className="site-name">Sportify</div>
                  <div className="footer-container-1">
                     <div className="first-links-container">
                        <ul className="olc-itemsWrapper">
                           <li className="olc-item">About Us</li>
                           <li className="olc-item">Terms Of Service</li>
                           <li className="olc-item">Privacy Policy</li>
                           <li className="olc-item">Copyright © 2024</li>
                        </ul>
                     </div>
                     <div className="second-links-container">
                        <ul className="olc-itemsWrapper">
                           <li className="olc-item">User Forum</li>
                           <li className="olc-item">Latest Blogs</li>
                           <li className="olc-item">Trending Blogs</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="footer-container-2">
                  <div className="site-logo">
                     <img src={FooterLogo} alt="Logo_Not_Loading" />
                  </div>
                  <div className="social-links">
                     <ul className="social-itemsWrapper">
                        <li className="soc-item"><FaInstagram /></li>
                        <li className="soc-item"><FaMeta /></li>
                        <li className="soc-item"><FaPinterest /></li>
                        <li className="soc-item"><FaXTwitter /></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

export const FooterLight = () => {
   return (
      <footer className="footerLight">
         <div className="footer-content-container">
            <div className="footer-contentWrapper">
               <div className="footer-container-0">
                  <div className="site-name">Sportify</div>
                  <div className="footer-container-1">
                     <div className="first-links-container">
                        <ul className="olc-itemsWrapper">
                           <li className="olc-item">About Us</li>
                           <li className="olc-item">Terms Of Service</li>
                           <li className="olc-item">Privacy Policy</li>
                           <li className="olc-item">Copyright © 2024</li>
                        </ul>
                     </div>
                     <div className="second-links-container">
                        <ul className="olc-itemsWrapper">
                           <li className="olc-item">User Forum</li>
                           <li className="olc-item">Latest Blogs</li>
                           <li className="olc-item">Trending Blogs</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="footer-container-2">
                  <div className="site-logo">
                     <img src={FooterLogo} alt="Logo_Not_Loading" />
                  </div>
                  <div className="social-links">
                     <ul className="social-itemsWrapper">
                        <li className="soc-item"><FaInstagram /></li>
                        <li className="soc-item"><FaMeta /></li>
                        <li className="soc-item"><FaPinterest /></li>
                        <li className="soc-item"><FaXTwitter /></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};