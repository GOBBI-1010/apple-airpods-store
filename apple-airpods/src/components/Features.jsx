import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const FeatureCard = ({ title, description, image, link, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="feature-card bg-dark text-white p-4 rounded-4 h-100"
      onClick={() => window.open(link, '_blank')}
      style={{ cursor: 'pointer' }}
    >
      <img src={image} alt={title} className="img-fluid mb-4" style={{ maxHeight: '400px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      <h3 className="h4 mb-3">{title}</h3>
      <p className="text-white">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Active Noise Cancellation",
      description: "Immerse yourself in music with advanced Active Noise Cancellation technology.",
      image: "https://i.pinimg.com/736x/5f/99/ac/5f99ac6f37410cf5af6bca020f04af91.jpg" ,
      link: "/"
    },
    {
      title: "Spatial Audio",
      description: "Experience theater-like sound that surrounds you.",
      image: "https://i.pinimg.com/736x/38/0b/08/380b08a80c96c6d569893f6de32294a9.jpg",
      link: "/"
    },
    {
      title: "Adaptive EQ",
      description: "Automatically tunes music to the shape of your ear.",
      image: "https://i.pinimg.com/736x/ea/d0/a2/ead0a2d83a71c615d5939d1a91003f5f.jpg",
      link: "/"
    }
  ];

  return (
    <section className="features-section py-5 bg-black">
      <Container>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-5"
        >
          Amazing Features
        </motion.h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={4}>
              <FeatureCard {...feature} delay={index * 0.2} />
            </Col>
          ))}
        </Row>
      </Container>
      
    </section>
  );
};

export default Features; 