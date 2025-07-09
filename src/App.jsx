import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import LearnMore from './components/LearnMore'; 
import Login from './Login';
import Signup from './Signup';
import Chat from './chat';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const faqRef = useRef(null);
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
        threshold: 0.2,
        rootMargin: '-80px 0px -50% 0px'
      }
    );

    const sections = [heroRef, featuresRef, servicesRef, faqRef, footerRef];
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
    const headerHeight = 80;
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
        scrollToElement(faqRef.current);
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

  const handleLogin = () => {
    setCurrentPage('chat');
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setActiveSection('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onSignup={() => setCurrentPage('signup')} onLogin={handleLogin} />;
      case 'signup':
        return <Signup onLogin={() => setCurrentPage('login')} />;
      case 'chat':
        return <Chat onLogout={handleLogout} />;
      case 'learnMore':
        return (
          <>
            <div className="content-container">
              <LearnMore />
            </div>
          </>
        );
      case 'home':
      default:
        return (
          <>
            <div className="content-container">
              <div ref={heroRef} data-section="home"><Hero onLearnMoreClick={() => setCurrentPage('learnMore')} /></div>
              <div ref={featuresRef} data-section="features"><Features /></div>
              <div ref={servicesRef} data-section="pricing"><Services /></div>
              <div ref={faqRef} data-section="faqs"><FAQ /></div>
              <div ref={footerRef} data-section="about"><Footer /></div>
            </div>
          </>
        );
    }
  };

  const showHeader = currentPage !== 'chat';

  return (
    <div className="App">
      <SpaceBackground />
      {showHeader && (
        <>
          <Header 
            onLoginClick={() => handleNavigation('login')}
            onSignupClick={() => handleNavigation('signup')}
            onHomeClick={() => handleNavigation('home', 'home')}
            onFeaturesClick={() => handleNavigation('home', 'features')}
            onNavigate={handleNavigation}
            activeSection={activeSection}
            currentPage={currentPage}
          />
        </>
      )}
      {renderPage()}
    </div>
  );
}

export default App;