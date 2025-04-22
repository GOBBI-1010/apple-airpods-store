import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const AirPods2Page = () => {
  const features = [
    {
      title: "Quick Setup",
      description: "A simple one-tap setup instantly connects AirPods to your iPhone, and they're automatically paired with all the devices signed in to your iCloud account.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_2nd_gen__dyuzfy04ht0m_large_2x.png"
    },
    {
      title: "Double-tap Control",
      description: "Double-tap either AirPod to play or skip forward. You can also set up AirPods to use Siri, play/pause audio, or turn them off.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_2nd_gen_tap__dyuzfy04ht0m_large_2x.png"
    },
    {
      title: "Voice-activated Siri",
      description: "Say 'Hey Siri' to do everything from playing a song to making a call. Siri can even announce your messages as they arrive.",
      image: "https://www.apple.com/v/airpods/shared/compare/d/images/compare/compare_airpods_2nd_gen_siri__dyuzfy04ht0m_large_2x.png"
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
          <p className="lead mb-5">2nd generation</p>

          <motion.img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1551489688005"
            alt="AirPods 2nd Generation"
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
                <p className="text-muted">Up to 5 hours of listening time</p>
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
                <h4 className="mb-3">Charging</h4>
                <p className="text-muted">Lightning charging case included</p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
};

export default AirPods2Page; 