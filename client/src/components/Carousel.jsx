import "../styles/carousel.css";
import { useState, useEffect } from "react";
import NBA from '../assets/nba.webp';
import Baseball from '../assets/baseball.jpg';
import Football from '../assets/football.webp';
import Cricket from '../assets/cricket.webp';
import F1 from '../assets/f1.jpg';
import Nascar from '../assets/nascar.jpg';
import MMA from '../assets/mma.jpg';
import Boxing from '../assets/boxing.jpg';


const carouselItems = [
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${NBA})` }}></div>
    <img src={NBA} alt="NBA" className="carousel-img" />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${Baseball})` }}></div>
    <img src={Baseball} alt="Baseball" className="carousel-img" />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${Football})` }}></div>
    <img src={Football} alt="Formula 1" className="carousel-img" />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${Cricket})` }}></div>
    <img src={Cricket} alt="Formula 1" className="carousel-img" height={'100%'} />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${Boxing})` }}></div>
    <img src={Boxing} alt="Formula 1" className="carousel-img" height={'100%'} />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${MMA})` }}></div>
    <img src={MMA} alt="Formula 1" className="carousel-img" height={'100%'} />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${F1})` }}></div>
    <img src={F1} alt="Formula 1" className="carousel-img" />
  </div>,
  <div className="carousel-item">
    <div className="carousel-bg" style={{ backgroundImage: `url(${Nascar})` }}></div>
    <img src={Nascar} alt="Formula 1" className="carousel-img" />
  </div>
];

export const Carousel = ({ items = carouselItems, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(intervalId);
  }, [items.length, interval]);

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: `1s ease-in-out all` }}
      >
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};