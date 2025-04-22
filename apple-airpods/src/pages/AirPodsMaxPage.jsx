import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer';
import { FaGooglePay, FaPaypal, FaCreditCard, FaBatteryFull, FaBluetooth, FaChargingStation } from 'react-icons/fa';
import { SiPhonepe } from 'react-icons/si';
import videoSrc2 from '../assets/videos/airpodspromax.mp4';

const AirPodsMaxPage = () => {
  const [selectedColor, setSelectedColor] = useState("Space Gray");
  const [showPopup, setShowPopup] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (videoRef.current && window.innerWidth <= 768) {
        videoRef.current.muted = value < 0.3 || value > 0.7;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const features = [
    {
      title: "High-Fidelity Audio",
      description: "Computational audio delivers breakthrough listening experiences with a custom-built driver and dual neodymium ring magnet motor. Experience pure, crisp sound with ultra-low distortion Features include custom Apple-designed dynamic driver, H1 chip for computational audio,and Spatial Audio with dynamic head tracking.",
      image:"https://www.apple.com/v/airpods-max/i/images/overview/product-stories/anc/anc_airpod_max_lifestyle__duzobvqwpz42_large_2x.jpg"
    },
    {
      title: "Active Noise Cancellation",
      description: "Industry-leading Active Noise Cancellation technology uses six outward-facing microphones to detect environmental noise and two inward-facing microphones to measure what you're hearing. Includes adaptive noise cancellation, transparency mode, nine microphones total, and voice-isolating beam-forming mics.",
      image: "https://www.apple.com/v/airpods-max/i/images/overview/product-stories/hifi-sound/audio_airpod_max__filcqiddcmye_xlarge_2x.jpg"
    },
    {
      title: "Premium Design",
      description: "Crafted with acoustically engineered memory foam cushions and a breathable knit mesh canopy. Features stainless steel headband frame, telescoping arms for perfect fit, memory foam ear cushions, and Digital Crown for precise control, delivering exceptional comfort and an immersive listening experience.",
      image:"https://photos5.appleinsider.com/gallery/62039-128589-AirPods-Max-3-xl.jpg"
    }
  ];

  const colors = [
    {
      name: "Space Gray",
      code: "#2f2f2f",
      
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=1112&fmt=png-alpha"
    },
    {
      name: "Silver",
      code: "#E3E4E5",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha"
    },
    {
      name: "Sky Blue",
      code: "#90BAC6",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=940&hei=1112&fmt=png-alpha"
    },
    {
      name: "Pink",
      code: "#FBE2DD",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-pink-202011?wid=940&hei=1112&fmt=png-alpha"
    },
    {
      name: "Green",
      code: "#9DC1A9",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-green-202011?wid=940&hei=1112&fmt=png-alpha"
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

  const handleVideoDoubleClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVideoHover = (isHovering) => {
    if (videoRef.current && window.innerWidth > 768) {
      videoRef.current.muted = !isHovering;
      setIsMuted(!isHovering);
    }
  };

  return (
    
    <div className="bg-black text-white min-vh-100 pt-5">
      <Container className="pt-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-3 fw-bold mb-4">AirPods Max</h1>
          <p className="lead mb-5 fw-bold mb-4">The ultimate personal listening experience.</p>

          <div className="position-relative mx-auto image-container" style={{ width: '100%', maxWidth: '1000px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="position-relative mt-5"
                style={{
                  top: '-2%',
                  left: '0%',
                  width: '100%',
                  maxWidth: '800px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
              >
                <motion.img
                  src={selectedColorData.image}
                  alt={`AirPods Max ${selectedColor}`}
                  className="img-fluid d-block mx-auto"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    height: 'auto',
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

          <div className=" d-flex flex-row justify-content-center mt-0 gap-4 mb-5 color-options ">
            {colors.map((color) => (
              <motion.div
                key={color.name}
                className="d-flex flex-column align-items-center sm-none"
                
                onClick={() => setSelectedColor(color.name)}
                style={{ cursor: 'pointer' }}
              >
                <motion.div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    zIndex: '100',
                    marginTop: '2px',
                    backgroundColor: color.code,
                    border: selectedColor === color.name ? '3px solid var(--primary-color)' : '2px solid white',
                    transition: 'all 0.3s ease'
                  }}
                  
                />
                <small
                  className="mt-2  d-none d-sm-inline"
                  style={{
                    
                    color: selectedColor === color.name ? 'var(--primary-color)' : 'white',
                    fontWeight: selectedColor === color.name ? '600' : '400',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {color.name}
                </small>
              </motion.div>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5  position-sticky top-0">
            <Button variant="primary" size="lg" onClick={handleAddToBagClick}>Add to Bag</Button>
            <Button variant="outline-light" size="lg" onClick={handleLearnMoreClick}>Learn More</Button>
          </div>
        </motion.div>

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
              maxWidth: '1400px',
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              opacity,
              scale,
              y,
              rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20])
            }}
            onMouseEnter={() => handleVideoHover(true)}
            onMouseLeave={() => handleVideoHover(false)}
            onDoubleClick={handleVideoDoubleClick}
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
              <source src={videoSrc2} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
            {window.innerWidth <= 768 && (
              <motion.div 
                className="sound-status" 
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  width:'71%',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: '500',
                  backdropFilter: 'blur(px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
            <Col xs={12} md={6} lg={4} className="d-flex">
              <motion.div
                className="bg-dark p-4 rounded-4 w-100"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '15px',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9C4 8.44772 4.44772 8 5 8H7C7.55228 8 8 8.44772 8 9V15C8 15.5523 7.55228 16 7 16H5C4.44772 16 4 15.5523 4 15V9Z" fill="white"/>
                      <path d="M9 9C9 8.44772 9.44772 8 10 8H12C12.5523 8 13 8.44772 13 9V15C13 15.5523 12.5523 16 12 16H10C9.44772 16 9 15.5523 9 15V9Z" fill="white"/>
                      <path d="M14 9C14 8.44772 14.4477 8 15 8H17C17.5523 8 18 8.44772 18 9V15C18 15.5523 17.5523 16 17 16H15C14.4477 16 14 15.5523 14 15V9Z" fill="white"/>
                      <path d="M19 9C19 8.44772 19.4477 8 20 8H21C21.5523 8 22 8.44772 22 9V15C22 15.5523 21.5523 16 21 16H20C19.4477 16 19 15.5523 19 15V9Z" fill="white"/>
                    </svg>
                  </motion.div>
                  <h4 className="mb-0" style={{ color: 'var(--white-color)' }}>Battery Life</h4>
                </div>
                <p style={{ color: 'var(--secondary-color)' }}>Up to 20 hours with ANC</p>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex">
              <motion.div
                className="bg-dark p-4 rounded-4 w-100"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '15px',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2H9Z" fill="white"/>
                      <path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z" fill="white"/>
                      <path d="M8 21C8 20.4477 8.44772 20 9 20H15C15.5523 20 16 20.4477 16 21V22C16 22.5523 15.5523 23 15 23H9C8.44772 23 8 22.5523 8 22V21Z" fill="white"/>
                    </svg>
                  </motion.div>
                  <h4 className="mb-0" style={{ color: 'var(--white-color)' }}>Audio Technology</h4>
                </div>
                <p style={{ color: 'var(--secondary-color)' }}>Apple H1 chip with custom acoustic design</p>
              </motion.div>
            </Col>
            <Col xs={12} md={6} lg={4} className="d-flex">
              <motion.div
                className="bg-dark p-4 rounded-4 w-100"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '15px',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="white"/>
                      <path d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill="white"/>
                      <circle cx="12" cy="12" r="2" fill="white"/>
                    </svg>
                  </motion.div>
                  <h4 className="mb-0" style={{ color: 'var(--white-color)' }}>Sensors</h4>
                </div>
                <p style={{ color: 'var(--secondary-color)' }}>Optical, Position, Case-detect</p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      {showPopup && (
        <motion.div className="popup" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          style={{ 
            position: 'fixed', 
            top: '53%', 
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
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=1112&fmt=png-alpha" alt="AirPods Max" className="img-fluid" style={{ maxWidth: '200px' }} />
              </div>
              <div className="popup-content flex-grow-1">
                <div className="popup-header mb-3">
                  <h5 className="mb-0">AirPods Max</h5>
                </div>
                <h3 className="text-center">Price: ₹59,999</h3>
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
              <button className="btn btn-primary w-100">Pay ₹59,999</button>
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
              <h5 className="mb-0">AirPods Max Details</h5>
            </div>
            <div className="info-popup-body">
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <FaBatteryFull size={24} className="me-2 text-white" />
                  <span className="text-white">High-Fidelity Audio with custom-built driver.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaBluetooth size={24} className="me-2 text-white" />
                  <span className="text-white">Active Noise Cancellation with adaptive technology.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaChargingStation size={24} className="me-2 text-white" />
                  <span className="text-white">Premium design with memory foam cushions.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Footer />
      <style jsx>{`
        @media (max-width: 768px) {
          .position-absolute {
            top: '50%';
            left: '50%';
            width: '100%';
            max-width: '400px';
          }
          .video-container {
            height: 350px !important;
            border-radius: 16px !important;
            margin: 20px auto !important;
          }
        }
        @media (min-width: 769px) {
          .video-container {
            height: 700px !important;
          }
        }
        @media (max-width: 576px) {
          .color-options {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: space-between;
          }
          .image-container {
            height: 200px;
          }
          .video-container {
            height: 250px !important;
          }
        }
        @media (min-width: 576px) {
          .color-options {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: space-between;
          }
          .image-container {
            height: 550px;
            
          }
        }
      `}</style>
    </div>
  );
};

export default AirPodsMaxPage;

