import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faBars, faCamera, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showBagPopup, setShowBagPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchClick = () => {
    setShowSearchPopup(true);
  };

  const handleSearchClose = () => {
    setShowSearchPopup(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    // Simulate a Google search API call
    if (query.includes('apple') || query.includes('airpods') || query.includes('airpods pro') || query.includes('airpods max')) {
      setSearchResults([
        { title: 'Apple AirPods', link: 'https://www.apple.com/airpods/', image: 'https://i.pinimg.com/736x/05/78/9b/05789b5a6b602c684decd1653da33d3d.jpg' },
        { title: 'Apple AirPods Pro', link: 'https://www.apple.com/airpods-pro/', image: 'https://i.pinimg.com/736x/d2/6f/8c/d26f8c5ee5aeb67001d4803dc41178e7.jpg' },
        { title: 'Apple AirPods Max', link: 'https://www.apple.com/airpods-max/', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-green-202011?wid=940&hei=1112&fmt=png-alpha' }
      ]);
    } else {
      setSearchResults([{ title: 'Error: Your search does not contain Apple products.', link: '', image: '' }]);
    }
  };

  const handleToggleLinkClick = () => {
    const navbarToggle = document.querySelector('.navbar-toggler');
    if (navbarToggle && window.getComputedStyle(navbarToggle).display !== 'none') {
      navbarToggle.click();
    }
  };

  const handleLinkClick = () => {
    setShowSearchPopup(false);
    handleToggleLinkClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBagClick = (e) => {
    e.preventDefault();
    setShowBagPopup(true);
    handleToggleLinkClick();
  };

  const handleBagClose = () => {
    setShowBagPopup(false);
  };

  const handleSignInClick = () => {
    setShowSignInPopup(true);
    setShowBagPopup(false);
  };

  const handleSignInClose = () => {
    setShowSignInPopup(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`my-2 py-2 px-4 border rounded-3 navbar-custom ${scrolled ? 'scrolled' : ''}`}
      style={{
        width: '80%',
        margin: '10px auto',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: isMobile 
          ? (scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent')
          : 'rgba(0, 0, 0, 0.95)'
      }}
    >
      <Container>
        <Link to="/" className="navbar-brand text-white">
          <FontAwesomeIcon icon={faApple} className="me-2 fs-2" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <FontAwesomeIcon icon={faBars} style={{ color: 'white',fontSize: '1em' }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fs-5 fw-bold">
            <Link to="/" className={`nav-link text-white mx-2 ${location.pathname === '/' ? 'active' : ''}`} onClick={handleLinkClick}>
              Store
            </Link>
            <Link to="/airpods" className={`nav-link text-white mx-2 ${location.pathname === '/airpods' ? 'active' : ''}`} onClick={handleLinkClick}>
              AirPods
            </Link>
            <Link to="/airpods-pro" className={`nav-link text-white mx-2 ${location.pathname === '/airpods-pro' ? 'active' : ''}`} onClick={handleLinkClick}>
              AirPods Pro
            </Link>
            <Link to="/airpods-max" className={`nav-link text-white mx-2 ${location.pathname === '/airpods-max' ? 'active' : ''}`} onClick={handleLinkClick}>
              AirPods Max
            </Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" className="text-white fs-4" onClick={() => { handleSearchClick(); handleToggleLinkClick(); }}>
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link href="#" className="text-white ms-3 fs-4" onClick={handleBagClick}>
              <FontAwesomeIcon icon={faBagShopping} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showSearchPopup && (
        <div className="search-popup" style={{ position: 'absolute', top: '620%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050, backgroundColor: 'rgba(12, 12, 12, 0)', padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
          <div className="search-popup-content bg-black p-4 rounded shadow" style={{ border: '1px solid white', backgroundColor: 'rgba(232, 14, 14, 0.8)' }}>
            <div className="search-popup-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Search AppleAirpods Products</h5>
              <span 
                className="close" 
                onClick={handleSearchClose} 
                style={{ 
                  cursor: 'pointer', 
                  color: 'white',
                  fontSize: '24px',
                  position: 'absolute',
                  top: '15px',
                  right: '25px'
                }}
              >&times;</span>
            </div>
            <div className="search-popup-body">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control mb-3" placeholder="Type to search..." />
              <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
              <div className="mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {searchResults.map((result, index) => (
                  <div key={index} className="mb-3">
                    {result.image && <img src={result.image} alt={result.title} className="img-fluid mb-2" style={{ width: '100%', maxWidth: '300px' }} />}
                    <h6 className="text-white mb-1">{result.title}</h6>
                    {result.link && <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-primary" style={{ textDecoration: 'none' }}>View More</a>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showBagPopup && (
        <div className="bag-popup" style={{ 
          position: 'absolute', 
          top: '620%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 1050, 
          backgroundColor: 'rgba(12, 12, 12, 0)', 
          padding: '20px', 
          borderRadius: '10px', 
          width: '100%', 
          maxWidth: '400px' 
        }}>
          <div className="bag-popup-content bg-black p-4 rounded shadow" style={{ 
            border: '1px solid white',
            backgroundColor: 'rgba(0, 0, 0, 0.95)'
          }}>
            <div className="bag-popup-header d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Your bag is empty.</h5>
              <span 
                className="close" 
                onClick={handleBagClose} 
                style={{ 
                  cursor: 'pointer', 
                  color: 'white',
                  fontSize: '24px',
                  position: 'absolute',
                  top: '15px',
                  right: '25px'
                }}
              >&times;</span>
            </div>
            <div className="bag-popup-body">
              <p className="text-secondary mb-4">Sign in to see if you have any saved items. Or continue shopping.</p>
              <div className="d-flex flex-column gap-3">
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => window.open('https://account.apple.com/account', '_blank')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline-light" 
                  className="w-100"
                  onClick={() => window.open('https://www.apple.com/shop/accessories/all/headphones-speakers', '_blank')}
                >
                  Continue Shopping
                </Button>
              </div>
              <div className="mt-4 pt-3 border-top border-secondary">
                <p className="text-secondary mb-0">
                  Need some help? <a href="https://contactretail.apple.com" target="_blank" rel="noopener noreferrer" className="text-primary">Chat now</a> or call 000800 040 1966.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignInPopup && (
        <div className="signin-popup" style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 1060, 
          width: '100%', 
          maxWidth: '400px',
          padding: '20px'
        }}>
          <div className="signin-popup-content bg-black p-4 rounded shadow" style={{ 
            border: '1px solid white',
            backgroundColor: 'rgba(0, 0, 0, 0.95)'
          }}>
            <div className="signin-popup-header d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Sign In</h5>
              <span 
                className="close" 
                onClick={handleSignInClose} 
                style={{ 
                  cursor: 'pointer', 
                  color: 'white',
                  fontSize: '24px',
                  position: 'absolute',
                  top: '15px',
                  right: '25px'
                }}
              >&times;</span>
            </div>
            <div className="signin-popup-body">
              <div className="text-center mb-4">
                <div 
                  className="profile-image-container mx-auto mb-3" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '60px',
                    border: '2px dashed white',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: '2rem', color: 'white' }} />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <p className="text-secondary">Click to upload profile photo</p>
              </div>

              <Form className="mb-4">
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-white border-end-0">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      className="bg-transparent text-white border-start-0"
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent text-white border-end-0">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="bg-transparent text-white border-start-0"
                      style={{ borderLeft: 'none' }}
                    />
                  </div>
                </Form.Group>
                <Button 
                  variant="primary" 
                  className="w-100 mb-3"
                  onClick={() => window.open('https://secure2.store.apple.com/shop/signIn', '_blank')}
                >
                  Sign In
                </Button>
              </Form>

              <div className="text-center mb-4">
                <p className="text-secondary mb-3">Or sign in with</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button 
                    variant="outline-light" 
                    className="rounded-circle p-2" 
                    style={{ width: '45px', height: '45px' }}
                    onClick={() => window.open('https://appleid.apple.com/auth/authorize?client_id=com.apple.store.web&redirect_uri=https%3A%2F%2Fsecure2.store.apple.com%2Fshop%2FsignIn%2Fgoogle', '_blank')}
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    className="rounded-circle p-2" 
                    style={{ width: '45px', height: '45px' }}
                    onClick={() => window.open('https://appleid.apple.com/auth/authorize?client_id=com.apple.store.web&redirect_uri=https%3A%2F%2Fsecure2.store.apple.com%2Fshop%2FsignIn%2Ffacebook', '_blank')}
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button 
                    variant="outline-light" 
                    className="rounded-circle p-2" 
                    style={{ width: '45px', height: '45px' }}
                    onClick={() => window.open('https://appleid.apple.com', '_blank')}
                  >
                    <FontAwesomeIcon icon={faApple} />
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-secondary mb-0">
                  Don't have an account? <a href="https://appleid.apple.com/account" target="_blank" rel="noopener noreferrer" className="text-primary">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .navbar-custom {
      background-color:black !important;
    }
    .navbar-custom.scrolled {
      background-color: rgba(0, 0, 0, 0.95) !important;
    }
  }
    @media (min-width: 768px) {
    .navbar-custom {
      background-color:transparent !important;
    }
    .navbar-custom.scrolled {
      background-color: rgba(0, 0, 0, 0.95) !important;
    }
  }
`;
document.head.appendChild(style);

export default NavigationBar; 