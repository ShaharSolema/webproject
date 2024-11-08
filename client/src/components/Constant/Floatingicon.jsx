import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axiosInstanse from '../../utils/axiosConfig';
import { API_ROUTES } from '../../utils/apiRoutes';

const FloatingIcon = () => {
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showBugReport, setShowBugReport] = useState(false);
  const [bugReport, setBugReport] = useState({
    title: '',
    description: '',
    reporterInfo: {
      name: '',
      email: ''
    }
  });
  const footerRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = footerRef.current;
      const windowHeight = window.innerHeight;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setIsAboveFooter(footerRect.top <= windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getIconStyle = (index) => ({
    position: 'fixed',
    bottom: isAboveFooter ? `${235 + (index * 60)}px` : `${35 + (index * 60)}px`,
    left: '10px',
    zIndex: 998,
    transition: 'bottom 0.3s, transform 0.3s',
    fontSize: '50px',
    transform: hoveredIcon === index ? 'scale(1.2)' : 'scale(1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  });

  const handleBugReport = () => {
    setShowBugReport(true);
  };

  const handleSubmitBug = async (e) => {
    e.preventDefault();
    try {
      await axiosInstanse.post(API_ROUTES.BUGS.CREATE, bugReport);
      alert('תודה על הדיווח! נטפל בהקדם');
      setShowBugReport(false);
      setBugReport({
        title: '',
        description: '',
        reporterInfo: {
          name: '',
          email: ''
        }
      });
    } catch (error) {
      alert('אירעה שגיאה בשליחת הדיווח. אנא נסה שוב מאוחר יותר');
    }
  };

  return (
    <>
      <div ref={footerRef}></div>
      
      {/* WhatsApp Icon */}
      <div
        style={getIconStyle(0)}
        onMouseEnter={() => setHoveredIcon(0)}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a 
          href="https://wa.me/message/KT2QAE5WRHG3B1" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#25D366' }}
        >
          <i className="fa fa-whatsapp"></i>
        </a>
      </div>

      {/* Bug Report Icon */}
      <div
        style={getIconStyle(1)}
        onMouseEnter={() => setHoveredIcon(1)}
        onMouseLeave={() => setHoveredIcon(null)}
        onClick={handleBugReport}
      >
        <i 
          className="fa fa-bug" 
          style={{ 
            color: '#ff4444',
            fontSize: '40px'
          }}
        ></i>
      </div>

      {/* Bug Report Modal */}
      {showBugReport && (
        <div className="bug-report-overlay">
          <div className="bug-report-modal">
            <h2>דיווח על תקלה</h2>
            <form onSubmit={handleSubmitBug}>
              <div className="form-group">
                <label>כותרת התקלה</label>
                <input
                  type="text"
                  required
                  value={bugReport.title}
                  onChange={(e) => setBugReport({...bugReport, title: e.target.value})}
                  placeholder="תיאור קצר של התקלה"
                />
              </div>

              <div className="form-group">
                <label>תיאור מפורט</label>
                <textarea
                  required
                  value={bugReport.description}
                  onChange={(e) => setBugReport({...bugReport, description: e.target.value})}
                  placeholder="אנא תאר/י את התקלה בפירוט"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>שם (לא חובה)</label>
                <input
                  type="text"
                  value={bugReport.reporterInfo.name}
                  onChange={(e) => setBugReport({
                    ...bugReport,
                    reporterInfo: {...bugReport.reporterInfo, name: e.target.value}
                  })}
                  placeholder="השם שלך"
                />
              </div>

              <div className="form-group">
                <label>אימייל (לא חובה)</label>
                <input
                  type="email"
                  value={bugReport.reporterInfo.email}
                  onChange={(e) => setBugReport({
                    ...bugReport,
                    reporterInfo: {...bugReport.reporterInfo, email: e.target.value}
                  })}
                  placeholder="כתובת אימייל לחזרה"
                />
              </div>

              <div className="button-group">
                <button type="submit" className="submit-btn">שלח דיווח</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowBugReport(false)}
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Tooltips */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .floating-icon-tooltip {
            position: fixed;
            left: 80px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            animation: fadeIn 0.3s;
            white-space: nowrap;
            pointer-events: none;
          }

          .floating-icon-tooltip::before {
            content: '';
            position: absolute;
            left: -5px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
          }

          .bug-report-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .bug-report-modal {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            direction: rtl;
          }

          .bug-report-modal h2 {
            color: #333;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }

          .form-group textarea {
            resize: vertical;
          }

          .button-group {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .submit-btn,
          .cancel-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            flex: 1;
          }

          .submit-btn {
            background: #4CAF50;
            color: white;
          }

          .submit-btn:hover {
            background: #45a049;
          }

          .cancel-btn {
            background: #f44336;
            color: white;
          }

          .cancel-btn:hover {
            background: #da190b;
          }
        `}
      </style>

      {/* Existing Tooltips */}
      {hoveredIcon === 0 && (
        <div 
          className="floating-icon-tooltip"
          style={{ bottom: isAboveFooter ? `${235}px` : `${35}px` }}
        >
          צור/י קשר בוואטסאפ
        </div>
      )}

      {hoveredIcon === 1 && (
        <div 
          className="floating-icon-tooltip"
          style={{ bottom: isAboveFooter ? `${295}px` : `${95}px` }}
        >
          דווח/י על תקלה
        </div>
      )}
    </>
  );
};

export default FloatingIcon;
