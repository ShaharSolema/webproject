import React, { useEffect, useRef, useState } from 'react';
import '../../styles/StoreMap.css';
import Michal from '../data/pictures/pictures/categories/WhatsApp Image 2024-11-08 at 00.13.16 (1).jpeg';
const StoreMap = () => {
    const mapRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    const [currentLayer, setCurrentLayer] = useState('normal');
    const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

    const mapStyles = {
        container: {
            position: 'relative',
            height: '500px',
            width: '100%',
        },
        mapWrapper: {
            height: '100%',
            width: '100%',
            transition: 'width 0.3s ease',
        },
        mapWrapperWithSidebar: {
            width: 'calc(100% - 400px)',
        }
    };

    const studioLocation = {
        lat: 31.96125,
        lng: 34.792056
    };

    useEffect(() => {
        if (!window.H) return;

        const platform = new window.H.service.Platform({
            apikey: 'TDbP7vj_n6hQBhuhB_scEwZGTVLzaxPLfb8-O8MwP9A'
        });

        const defaultLayers = platform.createDefaultLayers();
        const map = new window.H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: studioLocation,
                zoom: 15,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
        
        const normalIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">' +
            '<path fill="#e91e63" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>' +
            '<circle fill="#fff" cx="12" cy="9" r="2.5"/>' +
            '</svg>';

        const hoverIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">' +
            '<path fill="#d81557" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>' +
            '<circle fill="#fff" cx="12" cy="9" r="2.5"/>' +
            '</svg>';
        
        const icon = new window.H.map.Icon(normalIcon);
        const hoverMarkerIcon = new window.H.map.Icon(hoverIcon);
        const marker = new window.H.map.Marker(studioLocation, { icon });
        
        marker.addEventListener('pointerenter', () => {
            mapRef.current.style.cursor = 'pointer';
            marker.setIcon(hoverMarkerIcon);
        });

        marker.addEventListener('pointerleave', () => {
            mapRef.current.style.cursor = 'grab';
            marker.setIcon(icon);
        });

        marker.addEventListener('tap', () => {
            setIsSidebarOpen(true);
            mapRef.current.style.cursor = 'grab';
        });

        mapRef.current.addEventListener('mousedown', () => {
            if (mapRef.current.style.cursor !== 'pointer') {
                mapRef.current.style.cursor = 'grabbing';
            }
        });
        
        mapRef.current.addEventListener('mouseup', () => {
            if (mapRef.current.style.cursor !== 'pointer') {
                mapRef.current.style.cursor = 'grab';
            }
        });
        
        mapRef.current.addEventListener('mouseleave', () => {
            if (mapRef.current.style.cursor !== 'pointer') {
                mapRef.current.style.cursor = 'grab';
            }
        });

        map.addEventListener('dragstart', () => {
            if (mapRef.current.style.cursor !== 'pointer') {
                mapRef.current.style.cursor = 'grabbing';
            }
        });
        
        map.addEventListener('dragend', () => {
            if (mapRef.current.style.cursor !== 'pointer') {
                mapRef.current.style.cursor = 'grab';
            }
        });

        map.addObject(marker);
        setMapInstance(map);

        window.addEventListener('resize', () => map.getViewPort().resize());

        return () => {
            map.dispose();
        };
    }, []);

    const toggleMapLayer = (newLayer) => {
        if (!mapInstance) return;

        const platform = new window.H.service.Platform({
            apikey: 'TDbP7vj_n6hQBhuhB_scEwZGTVLzaxPLfb8-O8MwP9A'
        });

        const layers = platform.createDefaultLayers();
        
        switch(newLayer) {
            case 'normal':
                mapInstance.setBaseLayer(layers.vector.normal.map);
                break;
            case 'satellite':
                mapInstance.setBaseLayer(layers.raster.satellite.map);
                break;
        }
        
        setCurrentLayer(newLayer);
        setIsLayerMenuOpen(false);
    };

    const zoomIn = () => {
        if (mapInstance) {
            const currentZoom = mapInstance.getZoom();
            mapInstance.setZoom(currentZoom + 1);
        }
    };

    const zoomOut = () => {
        if (mapInstance) {
            const currentZoom = mapInstance.getZoom();
            mapInstance.setZoom(currentZoom - 1);
        }
    };

    return (
        <div style={mapStyles.container}>
            <div 
                style={{
                    ...mapStyles.mapWrapper,
                    ...(isSidebarOpen ? mapStyles.mapWrapperWithSidebar : {})
                }}
            >
                <div 
                    ref={mapRef} 
                    style={{ 
                        height: '100%',
                        cursor: 'grab',
                        userSelect: 'none',
                        '-webkit-user-select': 'none',
                        '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                    }} 
                />
                
                {/* Controls Container */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 1000,
                }}>
                    {/* Layer Controls */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
                            style={{
                                padding: '8px',
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"/>
                            </svg>
                        </button>

                        {isLayerMenuOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '45px',
                                right: '0',
                                backgroundColor: '#333',
                                borderRadius: '2px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                width: '120px',
                            }}>
                                <button 
                                    onClick={() => toggleMapLayer('normal')}
                                    style={{
                                        padding: '8px 12px',
                                        width: '100%',
                                        backgroundColor: currentLayer === 'normal' ? '#555' : '#333',
                                        border: 'none',
                                        borderBottom: '1px solid #555',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    🗺️ רגילה
                                </button>
                                <button 
                                    onClick={() => toggleMapLayer('satellite')}
                                    style={{
                                        padding: '8px 12px',
                                        width: '100%',
                                        backgroundColor: currentLayer === 'satellite' ? '#555' : '#333',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    🛰️ לוויין
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Zoom Controls */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#333',
                        borderRadius: '2px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}>
                        <button 
                            onClick={zoomIn}
                            style={{
                                padding: '8px',
                                backgroundColor: '#333',
                                border: 'none',
                                borderBottom: '1px solid #555',
                                cursor: 'pointer',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            +
                        </button>
                        <button 
                            onClick={zoomOut}
                            style={{
                                padding: '8px',
                                backgroundColor: '#333',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            −
                        </button>
                    </div>
                </div>
            </div>
            
            {isSidebarOpen && (
                <div className="location-sidebar">
                    <button className="close-button" onClick={() => setIsSidebarOpen(false)}>×</button>
                    
                    <div className="location-image">
                        <img src={Michal} alt="Michal NailArt Studio" />
                    </div>
                    
                    <div className="location-info">
                        <h2 className='header1'>Michal NailArt</h2>
                        <p className="description">סדנאות קורסים והשתלמויות, הכל במקום אחד</p>
                        
                        <div className="info-section">
                            <h3>🕒 שעות פעילות</h3>
                            <p>ראשון - חמישי: 9:00-17:00</p>
                            <p>שישי: 9:00-13:00</p>
                            <p>שבת: סגור</p>
                        </div>
                        
                        <div className="info-section">
                            <h3>📞 יצירת קשר</h3>
                            <p>טלפון: 052-288-1460</p>
                            <a href="tel:+972XXXXXXXXX" className="action-button">התקשרי עכשיו</a>
                        </div>
                        
                        <div className="info-section">
                            <h3>📍 כתובת</h3>
                            <p>רחוב שפטל,ראשון לציון</p>
                            <div className="navigation-buttons">
                                <a href={`https://waze.com/ul?ll=${studioLocation.lat},${studioLocation.lng}&navigate=yes`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="action-button waze-button">
                                    <img src="https://hzahav.co.il/wp-content/uploads/2023/08/waze-app-icon-vector.jpg" alt="Waze" />
                                    נווט/י עם Waze
                                </a>
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${studioLocation.lat},${studioLocation.lng}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="action-button google-maps-button">
                                    <img src="https://image.similarpng.com/very-thumbnail/2021/09/Google-maps-icon-on-transparent-background-PNG.png" alt="Google Maps" />
                                    נווט/י עם Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreMap;
