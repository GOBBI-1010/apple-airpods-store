import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

import { FaBatteryFull, FaBluetooth, FaChargingStation, FaGooglePay, FaPaypal, FaCreditCard } from 'react-icons/fa';
import { SiPhonepe } from 'react-icons/si';
import Footer from '../components/Footer';

const AirPodsPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const handleAddToBagClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLearnMoreClick = () => {
    setShowInfoPopup(true);
  };

  const features = [
    {
      title: "Personalized Spatial Audio",
      description: "Sound moves around you as if you're on a stage",
      image: "https://i.pinimg.com/736x/f1/7f/ff/f17fffed2a13e834e662e61867dfa367.jpg"
    },
    {
      title: "All-day battery life",
      description: "Up to 6 hours of listening time",
      image: "https://i.pinimg.com/736x/eb/61/50/eb615023bd7c2abc965d7583108868af.jpg"
    },
    {
      title: "Sweat and water resistant",
      description: "Perfect for workouts or light rain",
      image: "https://img.freepik.com/premium-photo/close-up-airpods-with-dramatic-black-white-background_1170794-221106.jpg"
    }
  ];

  return (
    <div className="bg-black text-white min-vh-100 pt-5">
        <h1 className="display-3 fw-bold mb-1 mt-5">AirPods</h1>
        <p className="lead mb-1 fw-bold">Magic remastered with powerful Active Noise Cancellation.</p>
      <Container fluid className="pt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center mb-5">
            <motion.img
              src="https://i.pinimg.com/736x/05/78/9b/05789b5a6b602c684decd1653da33d3d.jpg"
              alt="AirPods"
              className="img-fluid mb-5"
              style={{ maxWidth: '100%' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
             <div className="d-flex justify-content-center gap-3 mb-5">
          <Button variant="primary" size="lg" onClick={handleAddToBagClick}>Add to Bag</Button>
          <Button className="learn-more-button" variant="outline-light" size="lg" onClick={handleLearnMoreClick}>Learn More</Button>
        </div>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col key={index} xs={12} md={4} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-4"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="img-fluid mb-4 rounded-4"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <h3 className="h4 mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>

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
                <img src="https://i.pinimg.com/736x/05/78/9b/05789b5a6b602c684decd1653da33d3d.jpg" alt="AirPods" className="img-fluid" style={{ maxWidth: '200px' }} />
              </div>
              <div className="popup-content flex-grow-1">
                <div className="popup-header mb-3">
                  <h5 className="mb-0">AirPods (1st generation)</h5>
                </div>
                <h3 className="text-center">Price: ₹14,999</h3>
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
              <button className="btn btn-primary w-100">Pay ₹14,999</button>
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
              <h5 className="mb-0">AirPods (1st generation) Details</h5>
            </div>
            <div className="info-popup-body">
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <FaBatteryFull size={24} className="me-2 text-white" />
                  <span className="text-white">All-day battery life with up to 6 hours of listening time.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaBluetooth size={24} className="me-2 text-white" />
                  <span className="text-white">Bluetooth 5.3 for seamless connectivity.</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FaChargingStation size={24} className="me-2 text-white" />
                  <span className="text-white">USB-C charging case for fast charging.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default AirPodsPage; 