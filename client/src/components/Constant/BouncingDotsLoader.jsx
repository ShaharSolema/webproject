import React from 'react';
import '../../styles/BouncingDotsLoader.css';

const BouncingDotsLoader = ({ text = 'טוען' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {text && <span style={{ color: '#333' }}>{text}</span>}
      <div className="bouncing-dots-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default BouncingDotsLoader; 