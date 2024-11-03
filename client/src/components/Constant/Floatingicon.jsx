const FloatingIcon = () => {
  const iconStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    zIndex: 998, // שיניתי ל-998 כדי שה-overlay יכסה אותו
    marginBottom: '400px',
  };

  const imgStyle = {
    width: '50px', // או גודל אחר שמתאים לך
    height: '50px', // או גודל אחר שמתאים לך
  };

  return (
    <div style={iconStyle}>
      <a href="https://wa.me/message/KT2QAE5WRHG3B1" target="_blank" rel="noopener noreferrer">
        <img src="https://i.pinimg.com/736x/85/be/cb/85becb35e8864e42a5796fd8e240fbfb.jpg" alt="Icon" style={imgStyle} />
      </a>
    </div>
  );
};

export default FloatingIcon;
