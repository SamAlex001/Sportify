import "../styles/carousel.css";
import DummyImage from "../assets/nba_homepage.webp";

export const Carousel = () => {
  return(
    <div className="carousel-container">
    <img src={DummyImage} alt="Cover_Image_Not_Loading" className="carousel-img" />
    </div>
  )
}