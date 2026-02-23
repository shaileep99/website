import React, { useRef, useState, useEffect } from "react";
import '../assets/styles/Main.scss';

import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.png';
import image3 from '../assets/images/3.png';
import image4 from '../assets/images/4.png';
import image5 from '../assets/images/5.png';

function Main() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [arrowType, setArrowType] = useState('>'); 

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      // Logic for split-screen cursor toggle
      setArrowType(e.clientX < window.innerWidth / 2 ? '<' : '>');
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const travelData = [
    { img: image1, date: "MARCH 2024", title: "Washington D.C." },
    { img: image2, date: "OCTOBER 2025", title: "Denver" },
    { img: image3, date: "JUNE 2024", title: "Upstate New York" },
    { img: image4, date: "MAY 2024", title: "Chicago" },
    { img: image5, date: "NOVEMBER 2025", title: "San Francisco" }
  ];

  const scrollToPitWall = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      {/* Schematic Background Accents */}
      <div className="schematic-accent top-right"></div>
      <div className="schematic-accent bottom-left"></div>

      {/* FIXED: Dynamic Custom Arrow Cursor */}
      <div 
        className={`custom-arrow-cursor ${isHoveringSlider ? 'visible' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      >
        {arrowType}
      </div>

      <div className="hero-content-container">
        <div className="hero-text-content">
          <p className="greeting-text">Hi, I'm</p>
          <h1 className="hero-name">Shailee Patel</h1>
          
          {/* <div className="hero-tags">
            <span className="tag">Software Engineer</span>
            <span className="tag">Data Analyst</span>
            <span className="tag">Data Engineer</span>
          </div> */}

          <p className="hero-subtitle">
            Software Engineer and F1 enthusiast who approaches code the same way a race team approaches a Grand Prix: with an obsession for precision, performance, and data-driven strategy. 
            I thrive in the intersection of data engineering and software development, engineering systems where technical efficiency meets creative purpose.
          </p>

          <div className="hero-cta-group">
            <button className="cta-button primary" onClick={() => window.open('https://drive.google.com/file/d/19tfIql0IJ4M0dW883ecOrohs7_rpuKqA/view?usp=sharing')}>
              Download Resume
            </button>
            <button className="cta-button secondary" onClick={scrollToPitWall}>
              Join Pit Wall
            </button>
          </div>

        </div>

        <div className="hero-slider-wrapper">
          <div 
            className="slider-container"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringSlider(true)}
          >
            {travelData.map((item, index) => (
              <div className="slider-item" key={index}>
                <div className="image-box">
                  <img src={item.img} alt={item.title} draggable="false" />
                </div>
                <div className="item-info">
                  <span className="item-date">{item.date}</span>
                  <h3 className="item-title">{`${item.title}`}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;