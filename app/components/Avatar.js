'use client';

import { useState, useRef, useEffect } from 'react';

export default function Avatar({ isSpeaking, videoToPlay, onVideoEnd }) {
  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (videoToPlay && videoRef.current) {
      setIsPlayingVideo(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [videoToPlay]);

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
      {/* Static Image - Your ChatGPT Avatar */}
      <img
        src="/Avatar.png"
        alt="Miguel's Avatar"
        className={`w-full h-full object-cover transition-opacity duration-500 ${isPlayingVideo ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Video Overlay */}
      {videoToPlay && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlayingVideo ? 'opacity-100' : 'opacity-0'}`}
          onEnded={handleVideoEnd}
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
        >
          <source src={videoToPlay} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
