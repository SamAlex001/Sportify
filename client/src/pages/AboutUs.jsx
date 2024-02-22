import { FooterLight } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "../styles/aboutUs.css";

export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <div className="about-us-content">
          <h2 className="section-title">About Sportify</h2>
          <p className="section-text">
            At Sportify, we are dedicated to keeping you fully informed in the dynamic realm of sports. With our unwavering commitment to providing real-time updates, you can trust that you'll be in the loop with the latest scores and developments as they unfold. Our comprehensive coverage spans across all spectrums of sports, from the most prominent leagues to the most niche competitions. Whether your passion lies in football, basketball, cricket, or tennis, we ensure that you're always in the know, catering to every sports enthusiast's interests. Moreover, our platform boasts a user-friendly interface, meticulously designed to offer a seamless browsing experience across all devices. Accessing sports scores has never been easier or more intuitive, allowing you to stay connected to the information you need, no matter where you are or what device you're using.
          </p>
        </div>
        <div className="team-members">
          <h2 className="section-title">Our Team</h2>
          <div className="team-cards">
            <div className="team-card">
              <h3>Manav Kumar</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="team-card">
              <h3>Sam Alex</h3>
              <p>Full Stack Developer & Team Leader</p>
            </div>
            <div className="team-card">
              <h3>Arvin Raju</h3>
              <p>Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
      <FooterLight />
    </>
  );
};
