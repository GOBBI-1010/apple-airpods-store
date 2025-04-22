import React, { useEffect, useRef, useState } from 'react';
import mobileVideoSrc from '../assets/videos/videomobile.mp4';

const VideoSection2 = () => {
  const mobileVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play();
    }
  }, []);

  const handleDoubleClick = () => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.muted = !mobileVideoRef.current.muted;
      setIsMuted(mobileVideoRef.current.muted);
    }
  };

  return (
    <div
      className="d-block d-md-none position-relative"
      style={{
        marginTop: '0%',
        width: '100%',
        height: '50vh',
        overflow: 'hidden',
        background: 'black',
        borderRadius: '20px'
      }}
      onDoubleClick={handleDoubleClick}
    >
      <video
        ref={mobileVideoRef}
        className="w-100 h-100"
        playsInline
        autoPlay
        muted
        loop
        style={{
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <source src={mobileVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Sound Status Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          width: '71%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          padding: '12px 24px',
          borderRadius: '30px',
          fontSize: '14px',
          fontWeight: '500',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.46)',
          textAlign: 'center'
        }}
      >
        {isMuted ? 'Double-click to unmute' : 'Double-click to mute'}
      </div>
    </div>
  );
};

export default VideoSection2;
