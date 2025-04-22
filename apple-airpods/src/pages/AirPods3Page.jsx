import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const AirPods3Page = () => {
  const features = [
    {
      title: "Spatial Audio",
      description: "With dynamic head tracking, Spatial Audio places sound all around you. Music comes alive with rich, multidimensional sound that seems to follow your every move.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_3rd_gen__dyuzfy04ht0m_large_2x.png"
    },
    {
      title: "Force Sensor",
      description: "The force sensor gives you even more control over your entertainment. You can press to play, pause, and skip through songs, or answer and end calls.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_3rd_gen_force__dyuzfy04ht0m_large_2x.png"
    },
    {
      title: "Sweat and Water Resistant",
      description: "Both AirPods and the charging case are rated IPX4 water resistant, so they'll withstand anything from rain to heavy workouts.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_3rd_gen_water__dyuzfy04ht0m_large_2x.png"
    }
  ];

  return (
    <div className="bg-black text-white min-vh-100 pt-5">
      <Container className="pt-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-3 fw-bold mb-4">AirPods</h1>
          <p className="lead mb-5">3rd generation</p>

          <motion.img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000"
            alt="AirPods 3rd Generation"
            className="img-fluid mb-5"
            style={{
              maxWidth: '600px',
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

          <div className="d-flex justify-content-center gap-3 mb-5">
            <Button variant="primary" size="lg">Add to Bag</Button>
            <Button variant="outline-light" size="lg">Learn More</Button>
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
                      height: '100%',
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
                <p className="text-muted" style={{ lineHeight: '1.6' }}>{feature.description}</p>
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
              <motion.div 
                className="bg-dark p-4 rounded-4"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h4 className="mb-3">Battery Life</h4>
                <p className="text-muted">Up to 6 hours of listening time</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="bg-dark p-4 rounded-4"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h4 className="mb-3">Chip</h4>
                <p className="text-muted">Apple H1 headphone chip</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                className="bg-dark p-4 rounded-4"
                whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h4 className="mb-3">Sensors</h4>
                <p className="text-muted">Force sensor, Motion detecting accelerometer, Speech detecting accelerometer</p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
};

export default AirPods3Page; 