import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import videoSrc1 from '../assets/videos/videoplayback.mp4';

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const videoY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="video-section  d-none d-md-block"
      style={{
        
      marginToptop: '100%',
        bottom: '100%',
        left: 0,
        borderRadius: '20px' ,
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
          borderRadius: '80px' ,
          top: 80,

          left: 0
        }}
      >
        <video
          ref={videoRef}
          className="w-100 h-100"
          playsInline
          autoPlay
          muted
          loop
          style={{
            objectFit: 'cover',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            borderRadius: '0px' ,
            height: '100%'
          }}
        >
          <source src={videoSrc1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
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
            transition={{ duration: 0.8, delay: 0.7 }}
            className="display-3 fw-bold mb-4"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="lead mb-0"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
           
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

      <style jsx>{`
        .video-section {
          position:relative;
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