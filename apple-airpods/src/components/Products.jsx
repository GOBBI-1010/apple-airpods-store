import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import airpodsImg from '../assets/images/airpods2.png'; 
import airpodsImg1 from '../assets/images/airpods3.png'; // 👈 Import the image
import FooterFeatures from './FooterFeatures';
import { FaTimes } from 'react-icons/fa';



const ProductCard = ({ name, price, image, features, path, delay, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="product-card bg-dark text-white p-4 rounded-4 h-100"
    >
      <div className="text-center mb-4">
        <motion.img
          src={image}
          alt={name}
          className="img-fluid"
          style={{ maxHeight: '250px' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <h3 className="h4 mb-3">{name}</h3>
      <p className="text-primary h5 mb-4">₹{price}</p>
      <ul className="list-unstyled mb-4">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 text-white font-bold">
            • {feature}
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column gap-2">
        <Button variant="primary" className="w-100" onClick={onViewDetails}>View Details</Button>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowDetailsPopup = (product) => {
    setSelectedProduct(product);
    setShowDetailsPopup(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
    setSelectedProduct(null);
  };

  const products = [
    {
      name: "AirPods (4th generation)",
      price: "12900.00",
      image: airpodsImg,
      features: [
        "The next evolution of sound and comfort",
        "Personalized Spatial Audio",
        "Up to 6 hours of listening time",
        "Charging case with USB-C"
      ],
      path: "/airpods"
    },
    {
      name: "AirPods Pro (2nd generation)",
      price: "24900.00",
      image:airpodsImg1,
      features: [
        "Active Noise Cancellation",
        "Adaptive Audio",
        "Conversation Awareness",
        "MagSafe Charging Case"
      ],
      path: "/airpods-pro"
    },
    {
      name: "AirPodsProMax",
      price: "59900.00",
      image: "https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large_2x.png",
      features: [
        "High-fidelity audio",
        "Active Noise Cancellation",
        "Spatial Audio",
        "Smart Case included"
      ],
      path: "/airpods-max"
    }
  ];

  return (
    <section className="products-section py-5 bg-black">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-5"
        >
          <h2 className="mb-4">Which AirPods are right for you?</h2>
          <p className="lead">Compare all AirPods models</p>
        </motion.div>
        
        <Row className="g-4">
          {products.map((product, index) => (
            <Col key={index} md={4}>
              <ProductCard {...product} delay={index * 0.2} onViewDetails={() => handleShowDetailsPopup(product)} />
            </Col>
          ))}
        </Row>
      </Container>
      <br></br>
      <FooterFeatures />
      <Footer />

      {showDetailsPopup && selectedProduct && (
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', zIndex: 1000, width: '100%', maxWidth: '400px', padding: '20px', paddingTop: '60px', maxHeight: '80vh' }}>
          <div className="popup-content bg-dark text-white p-4 rounded shadow" style={{ border: '1px solid white', position: 'relative' }}>
            <span className="close" onClick={handleCloseDetailsPopup} style={{ 
              cursor: 'pointer', 
              color: 'white', 
              fontSize: '24px',
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}><FaTimes /></span>
            <div className="popup-header mb-3">
              <h5 className="mb-0">{selectedProduct.name}</h5>
            </div>
            <div className="popup-body">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid mb-3" style={{ maxHeight: '150px' }} />
              <p className="mb-3">Price: ₹{selectedProduct.price}</p>
              <ul className="list-unstyled mb-3">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index} className="mb-2">• {feature}</li>
                ))}
              </ul>
              <p>Apple products are designed to provide a seamless user experience with innovative technology and sleek design.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products; 