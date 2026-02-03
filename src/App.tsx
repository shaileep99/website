import React, { useEffect, useState } from "react";
import { Main, CareerBento, ProjectArchive, Navigation, Footer, GridEntry } from "./components";
import PreRaceLoader from "./components/PreRaceLoader";
import FadeIn from './components/FadeIn';
import ScrollToTop from './components/ScrollToTop';
import './index.scss';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reset scroll on load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    if (isLoading) {
      return <PreRaceLoader onComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className="main-container">
            <Navigation />
            
            <FadeIn transitionDuration={700}>
                <div id="hero"><Main/></div>
                <div id="career"><CareerBento/></div>
                <div id="projects"><ProjectArchive /></div>
                <div id="contact"><GridEntry /></div>
            </FadeIn>
            
            <Footer />
            <ScrollToTop />
        </div>
    );
}

export default App;