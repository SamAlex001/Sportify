import '../styles/home.css';
import { CategoryScroll } from '../components/CategoryScroll';
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactUs';
import { FooterDark } from '../components/Footer';
import { Carousel } from '../components/Carousel';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LiveScoreMini } from '../components/LiveScoreMini';
import { LatestPosts } from '../components/LatestPosts';

export const Home = () => {

    const comp = useRef(null);

    useEffect(() => {
        const isFirstVisit = sessionStorage.getItem('isFirstVisit');
        if (!isFirstVisit) {
            playAnimation();
            sessionStorage.setItem('isFirstVisit', 'true');
        }
    }, []);

    const playAnimation = () => {
        const tl = gsap.timeline();

        tl.from('.home-nav', {
            opacity: 0.4,
            yPercent: "-100",
            duration: 0.5,
            delay: 0.3,
            ease: "expo.out"
        }).from('.home-carousel', {
            opacity: 0,
            xPercent: '-100',
            duration: 0.5,
            delay: 0.3,
            ease: "expo.out"
        }).from('.home-catscroll', {
            opacity: 0,
            yPercent: '200',
            duration: 0.5,
            delay: 0.2,
            ease: "expo.out"
        }).from(".home-contact", {
            opacity: 0,
            scale: 1.4,
            ease: "bounce.out"
        }).from(".home-footer", {
            opacity: 0,
            ease: "expo.out"
        });
    };

    return (
        <div className='home-main-container' ref={comp}>
            <div className="home-nav">
                <Navbar />
            </div>
            <div className="home-carousel">
                <Carousel />
            </div>
            <div className="home-catscroll">
                <CategoryScroll />
            </div>
            <div className="home-latest-posts">
                <LatestPosts />
            </div>
            <div className="home-livescore">
                <LiveScoreMini />
            </div>
            <div className="home-contact">
                <ContactForm />
            </div>
            <div className="home-footer">
                <FooterDark />
            </div>
        </div>
    )
}