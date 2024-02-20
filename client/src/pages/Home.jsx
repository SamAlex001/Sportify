import '../styles/home.css';
import { CategoryScroll } from '../components/CategoryScroll';
import { Navbar } from '../components/Navbar';
import { ContactForm } from '../components/ContactUs';
import { FooterDark } from '../components/Footer';
// import { HomeLiveScore } from '../components/HomeLiveScore';
// import { Loader } from '../components/Loaders';
import { Carousel } from '../components/Carousel';
import { useState } from 'react';
import { CustomModal } from '../components/Modal';

export const Home = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className="modal">
                <button onClick={toggleModal}>
                    Open Modal
                </button>
                <CustomModal isOpen={modalOpen} closeModal={toggleModal}
                    title={"Dummy Title"}
                    description={"1 2 3 4 5"}
                />
            </div>
            <CategoryScroll />
            <ContactForm />
            <FooterDark />
        </div>
    )
}