import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import videoSrc from '../assets/videos/videoplayback 1.mp4';

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const videoY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  // Detect if in view with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Always keep video playing when in view, just muted
  useEffect(() => {
    if (videoRef.current && isInView) {
      videoRef.current.play().catch(error => console.log("Video autoplay failed:", error));
    }
  }, [isInView]);

  // Skip first 3 seconds of video on load
  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (video && video.duration > 1.5) {
        video.currentTime = 1.5;
        video.play().catch(error => console.log("Video autoplay failed:", error));
      }
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  // Hover handlers - only toggle sound
  const handleMouseEnter = () => {
    if (videoRef.current && isInView) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="video-section d-none d-md-block"
      style={{
        marginTop: '5%',
        bottom: '100%',
        left: 0,
        borderRadius: '20px',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'black',
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          y: videoY,
          height: '100%',
          width: '100%',
          position: 'absolute',
          borderRadius: '80px',
          top: 80,
          left: 0
        }}
      >
        <video
          ref={videoRef}
          className="w-100 h-100"
          playsInline
          loop
          autoPlay
          muted
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50px',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '76%',
            left: '0%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            width: '100%',
            y: textY
          }}
          className="content-overlay text-white text-center p-4"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            alt="apple airpods intro video"
            transition={{ duration: 0.8, delay: 0.7 }}
            className="display-10 fw-bold mb-4"
            style={{ fontFamily: "'Poppins', sans-serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
           
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="lead mb-0"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            {/* Optional subtitle or tagline here */}
          </motion.p>
        </motion.div>

        {/* Gradient Overlay */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* CSS */}
      <style jsx>{`
        .video-section {
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
        }

        @media (max-width: 768px) {
          .content-overlay h2 {
            font-size: 2.5rem;
            padding: 0 20px;
          }
          .content-overlay p {
            font-size: 1.2rem;
            padding: 0 20px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default VideoSection;
