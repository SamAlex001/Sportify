import '../styles/home.css';
import { CategoryScroll } from '../components/CategoryScroll';
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactUs';
import { FooterDark } from '../components/Footer';
import { Carousel } from '../components/Carousel';

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Carousel />
            <CategoryScroll />
            <ContactForm />
            <FooterDark />
        </div>
    )
}