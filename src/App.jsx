import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const footerRef = useRef(null);
  
  useEffect(() => {
    if (currentPage !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -60% 0px'
      }
    );

    const sections = [heroRef, featuresRef, servicesRef, footerRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [currentPage]);

  const scrollToSection = (section) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setActiveSection(section);
      setTimeout(() => {
        scrollToSectionInternal(section);
      }, 100);
    } else {
      setActiveSection(section);
      scrollToSectionInternal(section);
    }
  };

  const scrollToSectionInternal = (section) => {
    const headerHeight = 80; // Fixed header height
    
    const scrollToElement = (element) => {
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };
    
    switch (section) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'features':
        scrollToElement(featuresRef.current);
        break;
      case 'pricing':
        scrollToElement(servicesRef.current);
        break;
      case 'faqs':
        scrollToElement(footerRef.current);
        break;
      case 'about':
        scrollToElement(footerRef.current);
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigation = (page, section = null) => {
    if (section) {
      scrollToSection(section);
    } else {
      setCurrentPage(page);
      if (page === 'login' || page === 'signup') {
        setActiveSection('');
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <Signup onLogin={() => setCurrentPage('login')} />;
      case 'home':
      default:
        return (
          <>
            <div style={{ paddingTop: '80px' }}>
              <div ref={heroRef} data-section="home">
                <Hero />
              </div>
              <div ref={featuresRef} data-section="features">
                <Features />
              </div>
              <div ref={servicesRef} data-section="pricing">
                <Services />
              </div>
              <div ref={footerRef} data-section="about">
                <Footer />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="App">
      <SpaceBackground />
      <Header 
        onLoginClick={() => handleNavigation('login')}
        onSignupClick={() => handleNavigation('signup')}
        onHomeClick={() => handleNavigation('home', 'home')}
        onFeaturesClick={() => handleNavigation('home', 'features')}
        onNavigate={handleNavigation}
        activeSection={activeSection}
        currentPage={currentPage}
      />
      <p style={{marginBottom:'45px'}}></p>
      {renderPage()}
    </div>
  );
}

export default App;