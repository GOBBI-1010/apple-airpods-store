import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaBatteryFull, FaBluetooth, FaChargingStation, FaGooglePay, FaPaypal, FaCreditCard } from 'react-icons/fa';
import { SiPhonepe } from 'react-icons/si';

import airpodsImg from '../assets/images/airpods2.png'; 
import airpodsImg3 from '../assets/images/airpods5.png';
import airpodsImg2 from '../assets/images/airpods4.png';

import Footer from '../components/Footer';
import videoSrc1 from '../assets/videos/airpodspro.mp4';


 

const AirPodsProPage = () => {
  const [selectedColor, setSelectedColor] = useState("White");
  const [showPopup, setShowPopup] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const lastScrollPos = useRef(0);

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentPos = window.scrollY;
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(currentPos - lastScrollPos.current);
      
      // Calculate scroll speed (pixels per millisecond)
      const scrollSpeed = scrollDiff / timeDiff;
      
      // If scroll speed is above threshold (1.5 pixels per ms), mute the video
      if (scrollSpeed > 1.5 && videoRef.current) {
        videoRef.current.muted = true;
      }
      
      lastScrollTime.current = currentTime;
      lastScrollPos.current = currentPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (videoRef.current && window.innerWidth <= 768) {
        // Mute video when scrolling away from center of viewport
        videoRef.current.muted = value < 0.3 || value > 0.7;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    // Handle scroll-to-top event
    const handleMuteAll = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    };

    window.addEventListener('muteAllVideos', handleMuteAll);
    return () => window.removeEventListener('muteAllVideos', handleMuteAll);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const colors = [
    {
      name: "White",
      code: "#E3E4E5",
      image: airpodsImg3,
      
    },
    {
      name: "Black",
      code: "#1D1D1F",
      image: airpodsImg ,
    }
  ];

  const features = [
    {
      title: "Active Noise Cancellation",
      description: "Industry-leading Active Noise Cancellation continuously adapts to your ears and the fit of your ear tips, silencing the world around you for an exceptionally immersive listening experience.",
      image: "https://i.pinimg.com/736x/af/36/2f/af362fa4db14c124a89c4e1ab380ae46.jpg"
    },
    {
      title: "Adaptive Audio",
      description: "Automatically adjusts noise control to your environment, seamlessly blending Active Noise Cancellation and Transparency mode for the optimal listening experience as you move through your day.",
      image: "https://i.pinimg.com/736x/48/81/4f/48814fc448bc26412f9fafe2eab71be9.jpg"
    },
    {
      title: "Premium Design",
      description: "Crafted with precision and elegance, featuring a sleek minimalist design, premium materials, and ergonomic comfort. The iconic white finish and compact form factor exemplify Apple's commitment to sophisticated aesthetics.",
      image: "https://i.pinimg.com/736x/f7/45/c5/f745c54e305de2652df460baa9425408.jpg"
    }
  ];

  const selectedColorData = colors.find(color => color.name === selectedColor);

  const handleAddToBagClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLearnMoreClick = () => {
    setShowInfoPopup(true);
  };

  const handleVideoHover = (isHovering) => {
    if (videoRef.current && window.innerWidth > 768) {
      videoRef.current.muted = !isHovering;
    }
  };

  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 pt-5">
      <Container className="pt-5 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-3 fw-bold mb-4">AirPods Pro</h1>
          <p className="lead mb-5">Magic remastered with powerful Active Noise Cancellation.</p>

          <div className="position-relative" style={{ height: '550px', width: '100%', margin: '0 auto', marginBottom: '2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
              >
                <motion.img
                  src={selectedColorData.image}
                  alt={`AirPods Pro ${selectedColor}`}
                  style={{
                    maxWidth: '600px',
                    width: '100%',
                    filter: 'drop-shadow(0 30px 40px rgba(0, 0, 0, 0.4))'
                  }}
                  animate={{
                    rotate: [0, -1, 1, -1, 0],
                    y: [0, -5, 5, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="d-flex justify-content-center gap-4 mb-5">
            {colors.map((color) => (
              <motion.div
                key={color.name}
                className="d-flex flex-column align-items-center"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedColor(color.name)}
                style={{ cursor: 'pointer' }}
              >
                <motion.div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color.code,
                    border: selectedColor === color.name ? '3px solid var(--primary-color)' : '2px solid white',
                    transition: 'all 0.3s ease'
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
                />
                <small 
                  className="mt-2"
                  style={{
                    color: selectedColor === color.name ? 'var(--primary-color)' : 'white',
                    fontWeight: selectedColor === color.name ? '600' : '400'
                  }}
                >
                  {color.name}
                </small>
              </motion.div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-3 mb-5">
            <Button variant="primary" size="lg" onClick={handleAddToBagClick}>Add to Bag</Button>
            <Button variant="outline-light" size="lg" onClick={handleLearnMoreClick}>Learn More</Button>
          </div>
        </motion.div>

        <Row className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col key={index} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '24px',
                  minHeight: '600px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '2rem',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '300px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px'
                }}>
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      width: '100%',
                      height: '50vh',
                      objectFit: 'cover',
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))'
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.3))'
                    }}
                  />
                </div>
                <h3 className="h4 mb-4" style={{ color: 'var(--white-color)' }}>{feature.title}</h3>
                <p className="text-white" style={{ lineHeight: '1.6', color: 'white' }}>{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          ref={videoSectionRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
          style={{
            perspective: "1000px"
          }}
        >
          <motion.div 
            className="video-container position-relative mb-5" 
            style={{ 
              width: '100%',
              height: 'auto',
              maxWidth: '1200px',
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              opacity,
              scale,
              y,
              rotateX: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.8, 1], [10, 0, 0, -5, -10])
            }}
            onMouseEnter={() => handleVideoHover(true)}
            onMouseLeave={() => handleVideoHover(false)}
            onDoubleClick={handleMuteToggle}
          >
            <motion.video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src={videoSrc1} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
            {window.innerWidth <= 768 && (
              <motion.div 
                className="sound-status" 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  width:'71%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backdropFilter: 'blur(0px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0)',
                  border: '1px solid rgba(255, 255, 255, 0.46)',
                  textAlign: 'center'
                }}
              >
                {isMuted ? 'Double-click to unmute' : 'Double-click to mute'}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="mb-4">Technical Specifications</h2>
         <Row className="g-4">
            <Col md={4}>
              <div className="bg-dark p-4 rounded-4 text-center">
                <FaBatteryFull size={40} className="text-primary mb-3" />
                <h4>Battery Life</h4>
                <p>Up to 6 hours of listening time</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-dark p-4 rounded-4 text-center">
                <FaBluetooth size={40} className="text-primary mb-3" />
                <h4>Connectivity</h4>
                <p>Bluetooth 5.3</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-dark p-4 rounded-4 text-center">
                <FaChargingStation size={40} className="text-primary mb-3" />
                <h4>Charging</h4>
                <p>USB-C charging case</p>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      {showPopup && (
        <motion.div className="popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} 
          style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '55%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1000,
            width: '90%',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
          <motion.div className="popup-content bg-black p-4 rounded shadow" 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }} 
            style={{ 
              border: '1px solid white',
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingTop: '40px',
              position: 'relative'
            }}>
            <span className="close" onClick={handleClosePopup} 
              style={{ 
                cursor: 'pointer', 
                color: 'white', 
                fontSize: '24px',
                position: 'absolute',
                top: '10px',
                right: '15px'
              }}>&times;</span>
            <div className="popup-body d-flex flex-column flex-md-row">
              <div className="popup-image mb-3 mb-md-0 me-md-3 text-center">
                <img src="https://i.pinimg.com/736x/d5/41/0b/d5410b85a6a98bfb164a1318901ff56f.jpg" alt="AirPods Pro" className="img-fluid" style={{ maxWidth: '200px' }} />
              </div>
              <div className="popup-content flex-grow-1">
                <div className="popup-header mb-3">
                  <h5 className="mb-0">AirPods Pro</h5>
                </div>
                <h3 className="text-center">Price: ₹24,999</h3>
                <h4 className="text-center">Payment Options:</h4>
                <ul className="list-unstyled text-center">
                  <li className="d-flex align-items-center justify-content-center mb-2">
                    <FaGooglePay size={24} className="me-2" color="white" />
                    <a href="https://pay.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Google Pay</a>
                  </li>
                  <li className="d-flex align-items-center justify-content-center mb-2">
                    <SiPhonepe size={24} className="me-2" color="white" />
                    <a href="https://www.phonepe.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>PhonePe</a>
                  </li>
                  <li className="d-flex align-items-center justify-content-center mb-2">
                    <FaPaypal size={24} className="me-2" color="white" />
                    <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>PayPal</a>
                  </li>
                  <li className="d-flex align-items-center justify-content-center">
                    <FaCreditCard size={24} className="me-2" color="white" />
                    <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => setShowCardDetails(true)}>Credit/Debit Card</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showCardDetails && (
        <motion.div className="card-popup" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '55%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1001,
            width: '90%',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
          <motion.div className="card-popup-content bg-white p-4 rounded shadow" 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }}
            style={{ position: 'relative' }}>
            <span className="close text-black" onClick={() => setShowCardDetails(false)} 
              style={{ 
                cursor: 'pointer', 
                fontSize: '24px',
                position: 'absolute',
                top: '10px',
                right: '15px'
              }}>&times;</span>
            <div className="card-popup-header mb-3">
              <h5 className="mb-0">Enter Card Details</h5>
            </div>
            <div className="card-details">
              <input type="text" placeholder="Card Number" className="form-control mb-2" />
              <input type="text" placeholder="Expiry Date" className="form-control mb-2" />
              <input type="text" placeholder="CVV" className="form-control mb-2" />
              <button className="btn btn-primary w-100">Pay ₹24,999</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showInfoPopup && (
        <motion.div className="info-popup" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '55%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1000,
            width: '90%',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
          <motion.div className="info-popup-content bg-black p-4 rounded shadow" 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }} 
            style={{ 
              border: '1px solid white',
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingTop: '40px',
              position: 'relative'
            }}>
            <span className="close text-white" onClick={() => setShowInfoPopup(false)} 
              style={{ 
                cursor: 'pointer', 
                fontSize: '24px',
                position: 'absolute',
                top: '10px',
                right: '15px'
              }}>&times;</span>
            <div className="info-popup-header mb-3">
              <h5 className="mb-0">AirPods Pro Details</h5>
            </div>
            <div className="info-popup-body">
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <FaBatteryFull size={24} className="me-2 text-white" />
                  <span className="text-white">Active Noise Cancellation for immersive sound.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaBluetooth size={24} className="me-2 text-white" />
                  <span className="text-white">Adaptive Audio for seamless transitions.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaChargingStation size={24} className="me-2 text-white" />
                  <span className="text-white">Premium design with ergonomic comfort.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
      <airpodsprovideo />
      <Footer />
      <style jsx>{`
        @media (max-width: 768px) {
          .video-container {
            height: 300px !important;
            border-radius: 16px !important;
            margin: 20px auto !important;
          }
        }
        @media (min-width: 769px) {
          .video-container {
            height: 600px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AirPodsProPage; 