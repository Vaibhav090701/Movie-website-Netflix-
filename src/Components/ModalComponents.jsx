// ModalComponent.jsx
import React from 'react';
import YouTube from 'react-youtube';

const ModalComponent = ({ isOpen, onRequestClose, trailerKey }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube videoId={trailerKey} opts={opts} />
      <button onClick={onRequestClose}>Close Trailer</button>
    </div>
  );
};

export default ModalComponent;
