import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const footerRef = useRef(null);
  const audioRef = useRef(null);
  const hasSoundPlayedRef = useRef(false);
  const alertCountRef = useRef(0);
  const lastScrollPosRef = useRef(0);
  const scrollDirectionRef = useRef('none'); // 'up' or 'down' or 'none'
  const location = useLocation();

  // Define the first and last pages
  const isFirstPage = location.pathname === '/';
  const isLastPage = location.pathname === '/airpods-max';

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400){
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400){
        setShowScroll(false);
      }
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > lastScrollPosRef.current;
      const newDirection = isScrollingDown ? 'down' : 'up';
      
      // Only show alert on first and last pages
      if (newDirection !== scrollDirectionRef.current && alertCountRef.current < 2 && (isFirstPage || isLastPage)) {
        scrollDirectionRef.current = newDirection;
        
        if (footerRef.current) {
          const footerPosition = footerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (footerPosition.top <= windowHeight && !showAlert) {
            setShowAlert(true);
            alertCountRef.current += 1;
            
            // Only play sound on first page
            if (audioRef.current && !hasSoundPlayedRef.current && isFirstPage) {
              audioRef.current.play().catch(error => {
                console.log("Audio play failed:", error);
              });
              hasSoundPlayedRef.current = true;
            }
          }
        }
      }
      
      lastScrollPosRef.current = currentScrollPos;
    };

    window.addEventListener('scroll', checkScrollTop);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showScroll, showAlert, isFirstPage, isLastPage]);

  // Reset alert state when navigating between pages
  useEffect(() => {
    setShowAlert(false);
    alertCountRef.current = 0;
    hasSoundPlayedRef.current = false;
  }, [location.pathname]);

  const scrollTop = () => {
    // Mute all videos on the page
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const scrollToTop = () => {
    // Mute all videos on the page
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePortfolioClick = () => {
    setShowPortfolio(true);
    setShowAlert(false);
  };

  const handlePortfolioClose = () => {
    setShowPortfolio(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handlePortfolioImageClick = (e) => {
    e.stopPropagation();
    setShowFullScreenImage(true);
  };

  const handleFullScreenImageClose = () => {
    setShowFullScreenImage(false);
  };

  return (
    <footer ref={footerRef} className="mt-5 pt-5 pb-4" style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      position: 'relative'
    }}>
      <audio ref={audioRef} preload="auto">
        <source src="https://p.productioncrate.com/stock-hd/audio/soundscrate-9water1.mp3" type="audio/mpeg" />
      </audio>

      {showAlert && !showPortfolio && alertCountRef.current <= 2 && (
        <div 
          className="alert-popup"
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translate(-50%, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            padding: '20px 30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            animation: 'slideDown 0.5s ease-out',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            width: '40px', 
            height: '40px',
            marginBottom: '10px',
            animation: 'bellRing 1s ease-in-out'
          }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: '0px', fontSize: '16px', lineHeight: '1.5' }}>
              Click <span style={{ color: '#007AFF', fontWeight: 'bold' }}>"Code By Gobbi"</span> to view developer info!
            </p>
          </div>
          <button
            onClick={handleAlertClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '8px 20px',
              borderRadius: '8px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            Got it!
          </button>
        </div>
      )}

      <style>
        {`
          .alert-popup {
            top: -30px; /* Desktop view */
          }

          @media (max-width: 768px) {
            .alert-popup {
              top: 550px; /* Mobile view */
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, -100%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }

          @keyframes bellRing {
            0%, 100% {
              transform: rotate(0);
            }
            20%, 60% {
              transform: rotate(25deg);
            }
            40%, 80% {
              transform: rotate(-25deg);
            }
          }

          @media (max-width: 768px) {
            .portfolio-popup {
              width: 95% !important;
              padding: 20px 15px !important;
            }

            .portfolio-popup img {
              width: 140px !important;
              height: 170px !important;
              margin-bottom: 15px !important;
            }

            .portfolio-popup .links-section {
              padding: 0 !important;
              gap: 10px !important;
            }

            .portfolio-popup h2 {
              font-size: 22px !important;
              margin-bottom: 5px !important;
            }

            .portfolio-popup p {
              font-size: 14px !important;
              margin-bottom: 15px !important;
            }

            .portfolio-popup .btn {
              padding: 10px !important;
              font-size: 14px !important;
            }
          }

          /* Add normal view styles */
          .full-screen-image-popup img {
            border-radius: 20px !important;
          }
        `}
      </style>

      <Container>
        <Row className="mb-5">
          <Col lg={3} md={6} className="mb-0 mb-lg-0">
            <div className="d-flex apple-logo-container" style={{ justifyContent: 'center', alignItems: 'center', height: '70px', paddingBottom: '20px'}}>
              <svg height="90" viewBox="0 0 14 44" width="90" xmlns="http://www.w3.org/2000/svg" fill="white" className="apple-logo">
                <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"/>
              </svg>
            </div>
            <p className="text-secondary mb-2 mt-0">Experience the perfect balance of premium audio, exceptional comfort, and innovative technology.</p>
            <div className="d-flex justify-content-center align-items-center gap-3 pb-4 flex-wrap">
              <a href="#" className="text-white footer-link-container align-item-center" style={{ opacity: 0.8 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-white footer-link-container" style={{ opacity: 0.8 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="text-white footer-link-container" style={{ opacity: 0.8 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="footer-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none hover-white" onClick={scrollToTop}>Store</Link>
              </li>
              <li className="mb-2">
                <Link to="/airpods" className="text-secondary text-decoration-none hover-white" onClick={scrollToTop}>AirPods</Link>
              </li>
              <li className="mb-2">
                <Link to="/airpods-pro" className="text-secondary text-decoration-none hover-white" onClick={scrollToTop}>AirPods Pro</Link>
              </li>
              <li className="mb-2">
                <Link to="/airpods-max" className="text-secondary text-decoration-none hover-white" onClick={scrollToTop}>AirPods Max</Link>
              </li>
            </ul>
          </Col>
                  <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-white mb-4">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-white">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-white">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-white">Terms & Conditions</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-white">Returns</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4">Contact Us</h5>
            <ul className="list-unstyled">
             
              <li className="mb-2 footer-link-container">
                <svg width="16" height="16" viewBox="0 0 16 16" className="me-2 footer-icon" fill="currentColor">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span className="text-secondary hover-white">One Apple Park Way, Cupertino, CA 95014</span>
              </li>
              <li className="mb-2 footer-link-container">
                <svg width="16" height="16" viewBox="0 0 16 16" className="me-2 footer-icon" fill="currentColor">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                </svg>
                <span className="text-secondary hover-white">support@apple.com</span>
              </li>
              <li className="footer-link-container">
                <svg width="16" height="16" viewBox="0 0 16 16" className="me-2 footer-icon" fill="currentColor">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <span className="text-secondary hover-white">1-800-MY-APPLE</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p className="text-secondary mb-0">
            © {new Date().getFullYear()} <span onClick={handlePortfolioClick} style={{ cursor: 'pointer' }} className="text-white hover-white">Code By Gobbi</span> All rights reserved. 
            <span className="mx-2">|</span>
            <a  className="text-secondary text-decoration-none hover-white">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a className="text-secondary text-decoration-none hover-white">Terms of Use</a>
          </p>
          <div onClick={scrollTop} style={{
            display: showScroll ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            fixeddion: 'fixed',
            position: 'fixed',
            bottom: '140px',
            right: '0px',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '2px solid white',
            cursor: 'pointer',
            zIndex: 1000,
            animation: 'bounce 2s infinite',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l-10 10h6v10h8v-10h6z"/>
            </svg>
          </div>
          {showPortfolio && (
            <div className="portfolio-popup popup-responsive" style={{
              top: '14%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1060,
              width: '90%',
              position: 'fixed',
              height: 'fit-content',
              maxHeight: '66vh',
              maxWidth: '500px',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '5px',
              padding: '25px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)',
              overflowY: 'scroll',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)'
            }}>
              <div className="portfolio-content" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                paddingRight: '5px'
              }}>
                <button
                  onClick={handlePortfolioClose}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1070,
                    padding: 0
                  }}
                >
                  ×
                </button>
                <div className="text-center mb-3">
                  <img
                    src="https://media-hosting.imagekit.io/b500e6e3f62e49f2/WhatsApp%20Image%202025-04-04%20at%2014.22.56_be83caf8.jpg?Expires=1839849694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=MTbC5IFb2Nj59t7CSmDyLgJxjrQyw1bOXD9il1rA6hiR6vyhIyKZ9jealineXPv4sm5L8fdRG9wBRvSnWnwPlinVXG4bGb-dxHIr1pss6Y-w3G3PihyXx77A2gQkaWh8BmSCsAO1IKRYGp60526xQBe8VVKqBZl~7jhRazc3bojgBZkb4g~H8evtsHkl8P8ZEFRS3iRfIitEI3AE5Cd6ZgxP8VMO~SjgvtEVbvR-s99YAvk1LORH95X8vu3zPr-1~c9n5YwPYcv88oQWVcfKdRjal64bn2sBmQ49udGCJLMCy6oyjaYvCFa57peYDGp64DNtLVgJdpL~3F4ZF6Ua5Q__"
                    alt="Gobbi"
                    onClick={handlePortfolioImageClick}
                    style={{
                      width: '160px',
                      height: '200px',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      marginBottom: '15px',
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <h2 className="text-white fw-bold mb-1">D-GOBBI</h2>
                  <p className="text-white fs-5 fw-bold mb-3">Frontend Developer</p>
                 <p className="text-primary fw-bold mb-3">Click the link below to view

</p>

              
                </div>
                <div className="links-section" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px',
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto'
                }}>
                 
                  
                  <a
                    href="https://gobbi-portfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light w-100"
                    style={{
                      padding: '8px 15px',
                      fontSize: '15px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                     Portfolio Link
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1dSYoZkIc_GQ-EtT-9HTiyb0ky7-qMMlj/view?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light w-100"
                    style={{
                      padding: '8px 15px',
                      fontSize: '15px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Resume Link
                  </a>
                  <a
                    href="https://wa.me/917708918912?text=Hi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light w-100"
                    style={{
                      padding: '8px 15px',
                      fontSize: '15px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          )}
          {showFullScreenImage && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="full-screen-image-popup"
                style={{
                  position: 'fixed',
                  top: -180,
                  left: 290,
                  width: '50%',
                  height: '100%',
                  zIndex: 1080,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px',

                }}
                onClick={handleFullScreenImageClose}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '450px',
                    height: 'auto',
                    maxHeight: '70vh',
                    borderRadius: '20px',
                    padding: '20px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleFullScreenImageClose}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '-20px',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '32px',
                      cursor: 'pointer',
                      zIndex: 1090,
                      width: '20px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:'black',
                    }}
                  >
                    ×
                  </button>
                  <motion.img
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    src="https://media-hosting.imagekit.io/b500e6e3f62e49f2/WhatsApp%20Image%202025-04-04%20at%2014.22.56_be83caf8.jpg?Expires=1839849694&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=MTbC5IFb2Nj59t7CSmDyLgJxjrQyw1bOXD9il1rA6hiR6vyhIyKZ9jealineXPv4sm5L8fdRG9wBRvSnWnwPlinVXG4bGb-dxHIr1pss6Y-w3G3PihyXx77A2gQkaWh8BmSCsAO1IKRYGp60526xQBe8VVKqBZl~7jhRazc3bojgBZkb4g~H8evtsHkl8P8ZEFRS3iRfIitEI3AE5Cd6ZgxP8VMO~SjgvtEVbvR-s99YAvk1LORH95X8vu3zPr-1~c9n5YwPYcv88oQWVcfKdRjal64bn2sBmQ49udGCJLMCy6oyjaYvCFa57peYDGp64DNtLVgJdpL~3F4ZF6Ua5Q__"
                    alt="Gobbi Full Screen"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '50vh',
                      objectFit: 'contain',
                      borderRadius: '20px',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          <style jsx>{`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-5px);
              }
            }

            /* Add normal view styles */
            .full-screen-image-popup img {
              border-radius: 20px !important;
            }

            @media (max-width: 768px) {
              div[onClick] {
                bottom: 20px;
                right: 20px;
                height: 30px;
                width: 30px;
              }
              div[onClick] svg {
                width: 20px;
                height: 20px;
              }
              .apple-logo-container {
                height: 120px !important;
                padding-bottom: 20px !important;
                margin-bottom: 0 !important;
              }
              .apple-logo {
                height: 180px !important;
                width: 180px !important;
                transform: scale(1.8);
              }
              .popup-responsive {
                top: 63% !important;
                max-height: 56vh !important;
              }
              .portfolio-popup {
                &::-webkit-scrollbar {
                  width: 8px;
                }
                &::-webkit-scrollbar-thumb {
                  min-height: 40px;
                }
              }
              .full-screen-image-popup {
                padding: 20px !important;
              }
              .full-screen-image-popup button {
                top: 11px !important;
                right:-41px !important;
                width: 9% !important;
                background-color: rgba(222, 23, 23, 0) !important;
              }
              .full-screen-image-popup img {
                max-height: 50vh !important;
                border-radius: 20px !important;
              }
            }

            /* Update mobile-specific media queries */
            @media screen and (max-width: 480px) {
              .full-screen-image-popup {
                top: 55% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 90% !important;
                height: auto !important;
              }
              .full-screen-image-popup img {
                max-height: 70vh !important;
                width: 100% !important;
                object-fit: contain !important;
                border-radius: 10px !important;
              }
            }

            @media screen and (min-width: 481px) and (max-width: 768px) {
              .full-screen-image-popup {
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 80% !important;
                height: auto !important;
              }
              .full-screen-image-popup img {
                max-height: 75vh !important;
                width: 100% !important;
                object-fit: contain !important;
                border-radius: 20px !important;
              }
            }

            @media screen and (orientation: landscape) and (max-width: 768px) {
              .full-screen-image-popup {
                width: 70% !important;
              }
              .full-screen-image-popup img {
                max-height: 80vh !important;
                border-radius: 20px !important;
              }
            }
          `}</style>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 