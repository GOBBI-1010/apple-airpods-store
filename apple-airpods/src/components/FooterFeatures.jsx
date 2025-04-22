import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaRupeeSign, FaComments, FaTimes } from 'react-icons/fa';

const FooterFeatures = () => {
  const [activePopup, setActivePopup] = useState(null);

  const togglePopup = (feature) => {
    setActivePopup(activePopup === feature ? null : feature);
  };

  const features = [
    {
      icon: <FaTruck size={40} className="text-white" />, 
      title: "Free delivery and pickup",
      description: "Get free delivery or pickup at your Apple Store.",
      link: "#",
      details: "Free for only premium customers or on particular days."
    },
    {
      icon: <FaRupeeSign size={40} className="text-white" />, 
      title: "Ways to buy",
      description: "Choose the way that's right for you.",
      link: "#",
      details: "Options include Google Pay, PhonePe, card transactions, and PayPal."
    },
    {
      icon: <FaComments size={40} className="text-white" />, 
      title: "Get help buying",
      description: "Have a question? Call a Specialist or chat online.",
      link: "#",
      details: "Chatbot simulation: How can I assist you today?"
    }
  ];

  return (
    <section className="footer-features py-5 bg-transparent ">
      <Container>
        <Row className="text-center">
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-3">
              <div>{feature.icon}</div>
              <h4 className="mt-3 text-white">{feature.title}</h4>
              <p>{feature.description}</p>
              <button className="text-white bg-transparent border border-white rounded px-3 py-2 text-decoration-none" onClick={() => togglePopup(index)}>
                Learn more
              </button>
              {activePopup === index && (
                <div className="popup" style={{ position: 'fixed', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', zIndex: 1000, width: '90%', maxWidth: '400px' }}>
                  <div className="popup-content bg-dark text-white p-4 rounded shadow" style={{ border: '1px solid white', position: 'relative', paddingTop: '60px' }}>
                    <span className="close" onClick={() => togglePopup(null)} style={{ 
                      cursor: 'pointer', 
                      color: 'white',
                      fontSize: '24px',
                      position: 'absolute',
                      top: '10px',
                      right: '10px'
                    }}><FaTimes /></span>
                    <div className="popup-header mb-3">
                      <h5 className="mb-0">{feature.title}</h5>
                    </div>
                    <div className="popup-body">
                      <div className="mb-3">{feature.icon}</div>
                      <p>{feature.details}</p>
                      {index === 2 && (
                        <div className="chatbot mt-3 p-3 bg-dark rounded">
                          <a href="https://support.apple.com" target="_blank" rel="noopener noreferrer" className="text-white">Visit Apple Help Center</a>
                        </div>
                      )}
                    </div>
                    <div className="popup-footer mt-3 text-center">
                      <button className="text-white bg-transparent border border-white rounded px-3 py-2 text-decoration-none" onClick={() => togglePopup(null)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FooterFeatures; 