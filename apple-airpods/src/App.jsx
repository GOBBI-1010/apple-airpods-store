import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/Navbar';
import VideoSection from './components/VideoSection';
import Videosection3 from './components/videosection3';
import VideoSection2 from './components/VideoSection2';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import AirPodsPage from './pages/AirPodsPage';
import AirPodsProPage from './pages/AirPodsProPage';
import AirPodsMaxPage from './pages/AirPodsMaxPage';
import Preloader from './components/Preloader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check internet connection when component mounts
    const checkConnection = () => {
      if (!navigator.onLine) {
        alert('Please check your internet connection');
      }
    };

    // Check connection immediately when page loads
    checkConnection();

    // Add event listeners for online/offline status
    window.addEventListener('offline', checkConnection);

    // Hide preloader after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup event listeners and timer
    return () => {
      window.removeEventListener('offline', checkConnection);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      <Preloader loading={loading} />
      <Router>
        <div className="app">
          <NavigationBar />
          <Routes>
            <Route path="/" element={
              <main>
                <Videosection3 />
                <Hero />
                <VideoSection />
                <Features />
                <VideoSection2 />
                <Products />
                <airpodsprosection />
              </main>
            } />
            <Route path="/airpods" element={<AirPodsPage />} />
            <Route path="/airpods-pro" element={<AirPodsProPage />} />
            <Route path="/airpods-max" element={<AirPodsMaxPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
