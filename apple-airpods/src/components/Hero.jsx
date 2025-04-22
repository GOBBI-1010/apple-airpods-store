import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import airpodsImg from "../assets/images/airpods2.png";
import { FaGooglePay, FaPaypal, FaCreditCard } from 'react-icons/fa';
import { SiPhonepe } from 'react-icons/si';

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showLearnMorePopup, setShowLearnMorePopup] = useState(false);

  const products = [
    { id: 1, name: 'AirPods (1st generation)', price: 14999, image: 'https://i.pinimg.com/736x/05/78/9b/05789b5a6b602c684decd1653da33d3d.jpg' },
    { id: 2, name: 'AirPods Pro', price: 19999, image: 'https://i.pinimg.com/736x/f7/45/c5/f745c54e305de2652df460baa9425408.jpg' },
    { id: 3, name: 'AirPods Max', price: 59999, image: 'https://photos5.appleinsider.com/gallery/62039-128589-AirPods-Max-3-xl.jpg' }
  ];

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleShowLearnMorePopup = () => {
    setShowLearnMorePopup(true);
  };

  const handleCloseLearnMorePopup = () => {
    setShowLearnMorePopup(false);
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const totalPrice = selectedProducts.reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    return total + (product ? product.price : 0);
  }, 0);

  return (
   
    <section
      className="hero-section text-white p-3 py-5  py-lg-0 custom-hero-section "
    >
      <Container>
        <Row className="align-items-center min-vh-">
          <Col lg={6} className="text-center  text-lg-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="display-3 fw-bold mb-4">
                AirPods
                <br />
                Magic like you've never heard.
              </h1>
              <p className="lead mb-4 fw-bold">
                Experience the next level of wireless audio with AirPods.
                Immersive sound, seamless connectivity, and all-day comfort.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button variant="primary" size="lg" onClick={handleShowPopup}>
                  Shop AirPods
                </Button>
                <Button variant="outline-light" size="lg" onClick={handleShowLearnMorePopup}>
                  Learn More
                </Button>
              </div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <img
                src={airpodsImg}
                alt="AirPods Pro"
                className="img-fluid "
                style={{
                  maxWidth: '80%',
                  marginTop: '30px',
                  shapeOutside: 'border-box',
                }}
              />
            </motion.div>
          </Col>
        </Row>
        {showPopup && (
          <div className="popup" style={{ 
            position: 'fixed', 
            top: '53%', 
            left: '55%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1000, 
            width: '90%', 
            maxWidth: '400px', 
            margin: '0 auto'
          }}>
            <div className="popup-content bg-black p-4 rounded shadow" style={{ 
              border: '1px solid white',
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingTop: '60px',
              position: 'relative'
            }}>
              <span className="close fw-bold" onClick={handleClosePopup} style={{ 
                cursor: 'pointer', 
                color: 'white', 
                fontSize: '24px',
                position: 'absolute',
                top: '10px',
                right: '15px'
              }}>&times;</span>
              <div className="popup-header mb-3">
                <h5 className="mb-0">Select AirPods Products</h5>
              </div>
              <div className="popup-body">
                {products.map(product => (
                  <div key={product.id} className="d-flex align-items-center mb-3">
                    <img src={product.image} alt={product.name} className="img-fluid me-3" style={{ maxWidth: '50px' }} />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{product.name}</h6>
                      <p className="mb-0">Price: ₹{product.price}</p>
                    </div>
                    <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleProductSelect(product.id)} />
                  </div>
                ))}
                <h4 className="text-center mt-3">Total Price: ₹{totalPrice}</h4>
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
                </ul>
              </div>
            </div>
          </div>
        )}
        {showLearnMorePopup && (
          <div className="popup" style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '55%', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 1000, 
            width: '90%', 
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <div className="popup-content bg-black p-4 rounded shadow" style={{ 
              border: '1px solid white',
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingTop: '60px',
              position: 'relative'
            }}>
              <span className="close" onClick={handleCloseLearnMorePopup} style={{ 
                cursor: 'pointer', 
                color: 'white', 
                fontSize: '24px',
                position: 'absolute',
                top: '10px',
                right: '15px'
              }}>&times;</span>
              <div className="popup-header mb-3">
                <h5 className="mb-0">About AirPods</h5>
              </div>
              <div className="popup-body">
                <h6>AirPods (1st generation)</h6>
                <p>Experience the original wireless audio with AirPods. Perfect for everyday use.</p>
                <h6>AirPods Pro</h6>
                <p>Enjoy active noise cancellation and immersive sound with AirPods Pro.</p>
                <h6>AirPods Max</h6>
                <p>Experience high-fidelity audio with the over-ear AirPods Max.</p>
                <h4 className="text-center mt-3">Apple Products</h4>
                <p>Apple is known for its innovative technology and sleek design. From iPhones to MacBooks, Apple products are designed to provide a seamless user experience.</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Hero; 