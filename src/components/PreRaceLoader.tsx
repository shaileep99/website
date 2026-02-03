import React, { useEffect, useState } from 'react';

const PreRaceLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEMS");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); 
          return 100;
        }
        // Smooth acceleration: speed increases slightly as we go
        const increment = prev > 80 ? 0.5 : 1; 
        return prev + increment;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const systemChecks = [
      "CHECKING AERODYNAMICS...",
      "CALIBRATING TELEMETRY...",
      "WARMING UP TYRES...",
      "SYNCING STRATEGY...",
      "READY TO RACE"
    ];
    // Transitions text every 20%
    const index = Math.min(Math.floor(progress / 20), systemChecks.length - 1);
    setStatus(systemChecks[index]);
  }, [progress]);

  // Simulate high-speed vibration when near 100%
  const shakeClass = progress > 90 && progress < 100 ? 'vibrate' : '';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#0A0A0A', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Inter", "Monaco", monospace'
    }}>
      <style>{`
        @keyframes vibrate {
          0% { transform: translate(0); }
          25% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
          75% { transform: translate(1px, 1px); }
          100% { transform: translate(0); }
        }
        .vibrate { animation: vibrate 0.1s linear infinite; }
      `}</style>

      <div style={{ width: '80%', maxWidth: '500px' }}>
        
        {/* Telemetry Header */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', 
          color: '#FF7A1A', fontSize: '14px', fontWeight: '900', 
          marginBottom: '20px', letterSpacing: '2px',
          textShadow: '0 0 10px rgba(255, 122, 26, 0.3)'
        }}>
          <span>{'>'} {status}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(progress)}%</span>
        </div>

        {/* The Track */}
        <div style={{ 
          width: '100%', height: '2px', 
          backgroundColor: 'rgba(255, 122, 26, 0.1)',
          position: 'relative',
          overflow: 'visible'
        }}>
          
          {/* Active Progress Line */}
          <div style={{ 
            height: '100%', backgroundColor: '#FF7A1A', 
            width: `${progress}%`, transition: 'width 0.1s linear',
            boxShadow: '0 0 15px #FF7A1A'
          }} />

          {/* The Car Container */}
          <div 
            className={shakeClass}
            style={{
              position: 'absolute',
              left: `${progress}%`,
              top: '-25px', 
              transform: 'translateX(-100%)', 
              transition: 'left 0.1s linear',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            {/* Speed Lines (Tail) */}
            <div style={{
              position: 'absolute', right: '45px', top: '12px',
              display: 'flex', gap: '3px'
            }}>
              <div style={{ width: '15px', height: '1px', background: '#FF7A1A', opacity: 0.4 }} />
              <div style={{ width: '8px', height: '1px', background: '#FF7A1A', opacity: 0.2 }} />
            </div>

            {/* F1 Car Icon (Side View Silhouette) */}
            <svg width="50" height="20" viewBox="0 0 24 24" fill="#FF7A1A">
              <path d="M23.5 15.5l-2-2h-3.5l-1-1h-6l-1 1h-6l-2 2h-1v2h2l1-1h15l1 1h2v-2zM6 13h12v-1h-12v1z" />
              <circle cx="6.5" cy="17.5" r="1.5" />
              <circle cx="17.5" cy="17.5" r="1.5" />
            </svg>
          </div>
        </div>

        {/* Bottom Label */}
        <div style={{ 
          marginTop: '30px', color: 'rgba(255,255,255,0.2)', 
          fontSize: '9px', textAlign: 'center', letterSpacing: '5px' 
        }}>
          SYSTEM_VERSION_2026.01
        </div>
      </div>
    </div>
  );
};

export default PreRaceLoader;