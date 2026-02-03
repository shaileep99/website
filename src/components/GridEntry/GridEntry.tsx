import React, { useState, useEffect } from 'react';
import './GridEntry.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { supabase } from '../../supabaseClient';

const f1Data: Record<string, string[]> = {
  McLaren: ["Lando Norris", "Oscar Piastri"],
  Ferrari: ["Charles Leclerc", "Lewis Hamilton"],
  "Red Bull": ["Max Verstappen", "Isack Hadjar"],
  Mercedes: ["George Russell", "Kimi Antonelli"],
  "Aston Martin": ["Fernando Alonso", "Lance Stroll"],
  Audi: ["Nico Hülkenberg", "Gabriel Bortoleto"],
  Williams: ["Alex Albon", "Carlos Sainz"],
  Alpine: ["Pierre Gasly", "Franco Colapinto"],
  Haas: ["Esteban Ocon", "Oliver Bearman"],
  "Racing Bulls": ["Liam Lawson", "Arvid Lindblad"],
  Cadillac: ["Sergio Pérez", "Valtteri Bottas"]
};

const GridEntry = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', team: '', driver: '' });
  const [allVotes, setAllVotes] = useState<any[]>([]); // Shared state for cloud data

  // 1. Fetch Shared Predictions on Load
  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setAllVotes(data);
      if (error) console.error("Telemetry Fetch Error:", error.message);
    };
    fetchVotes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit to Cloud
  const handleSubmit = async () => {
    if (!formData.name || !formData.driver) {
      alert("CRITICAL ERROR: COMPLETE ALL TELEMETRY FIELDS");
      return;
    }

    const { error } = await supabase
      .from('predictions')
      .insert([{ 
        name: formData.name, 
        team: formData.team, 
        driver: formData.driver 
      }]);

    if (!error) {
      // Re-fetch to show the updated Pit Wall
      const { data } = await supabase.from('predictions').select('*');
      setAllVotes(data || []);
      setStep(3);
    } else {
      console.error("Transmission Error:", error.message);
    }
  };

  return (
    <div className="grid-entry-container" id="contact">
      <div className="main-content-area">
        <div className={`f1-terminal ${step === 3 ? 'wide' : ''}`}>

          {/* STEP 1: OBJECTIVE */}
          {step === 1 && (
            <div className="terminal-content">
              <h2 className="terminal-header">{'>'} MISSION_OBJECTIVE</h2>
              <p className="objective-text">
                <b>Formula 1 represents the intersection of performance, precision, and relentless optimization; values that shape how I approach software engineering. </b> <br />
                In F1, success is driven by data, systems thinking, and the pursuit of marginal gains through thoughtful design and execution. 
                I bring the same mindset to building scalable, data-driven systems where architecture, reliability, and performance matter as much as creativity. <br />
                The F1-inspired design of this portfolio reflects my personality: fast but intentional, minimal yet expressive, and grounded in continuous improvement. 
                As a McLaren and Lando Norris fan, I’m inspired by the balance of technical excellence and adaptability, qualities I strive to bring into every system I design. <br/>
                The Prediction Wall invites you to step into the pit lane and place your call for the 2026 championship, where data meets instinct.
              </p>
              <div className="actions">
                <button onClick={() => setStep(2)} className="btn-primary">
                  JOIN THE GRID <ArrowForwardIosIcon fontSize="inherit" />
                </button>
                <button onClick={() => setStep(3)} className="btn-secondary">
                  VIEW PIT WALL
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: REGISTRATION */}
          {step === 2 && (
            <div className="terminal-content">
              {/* New header container to handle alignment */}
              <div className="registration-header" style={{ 
                display: 'flex', 
                flexDirection: 'row-reverse', // This flips the order
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '30px' 
              }}>
                <button onClick={() => setStep(1)} className="btn-back" style={{ marginBottom: 0 }}>
                  <ArrowBackIosNewIcon style={{ fontSize: '12px', marginLeft: '5px' }} /> BACK
                </button>
                
                <h2 className="terminal-header" style={{ margin: 0 }}>
                  {'>'} STRATEGIST_REGISTRATION
                </h2>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label>USER_ID</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Name..." />
                </div>
                <div className="input-group">
                  <label>CONSTRUCTOR</label>
                  <select name="team" value={formData.team} onChange={handleInputChange}>
                    <option value="">SELECT TEAM</option>
                    {Object.keys(f1Data).map(team => <option key={team}>{team}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>PILOT</label>
                  <select name="driver" value={formData.driver} onChange={handleInputChange} disabled={!formData.team}>
                    <option value="">SELECT DRIVER</option>
                    {formData.team && f1Data[formData.team].map(driver => <option key={driver}>{driver}</option>)}
                  </select>
                </div>
                <button onClick={handleSubmit} className="btn-primary">
                  LOCK STRATEGY & DEPLOY
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PIT WALL */}
          {step === 3 && (
            <div className="terminal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 className="terminal-header" style={{ margin: 0 }}>{'>'} PIT_WALL_TELEMETRY</h2>
                <button onClick={() => setStep(2)} className="btn-back" style={{ marginBottom: 0 }}>
                  <ArrowBackIosNewIcon fontSize="inherit" /> BACK TO REGISTRATION
                </button>
              </div>

              <div className="telemetry-grid">
                {Object.entries(f1Data).map(([team, drivers]) =>
                  drivers.map(driver => {
                    // Map over the cloud data
                    const votes = allVotes.filter(v => v.driver === driver);
                    const pct = Math.min(votes.length * 20, 100);

                    return (
                      <div className="driver-card" key={driver}>
                        <div className="driver-meta">
                          <span className="team">{team}</span>
                          <span className="votes">{votes.length} V</span>
                        </div>
                        <div className="driver-main">
                          <div className="name">{driver.toUpperCase()}</div>
                        </div>
                        <div className="supporters">
                          {votes.length
                            ? votes.map((v, i) => <span key={i}>{v.name}</span>)
                            : <span className="muted">NO DATA</span>}
                        </div>
                        <div className="bar">
                          <div className="fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridEntry;