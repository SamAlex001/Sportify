import '../styles/homePage.css';
import { Carousel } from '../components/Carousel';
import { FooterDark, FooterLight } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

export const HomePage = () => {
   return (
      <div className="home">
         <Navbar />
         {/* <Carousel /> */}
         <FooterDark />
      </div>
   );
};