import React, { useState } from "react";
import '../assets/styles/ProjectArchive.scss';
import { ProjectData, Project } from '../data/projects'; 

function ProjectArchive() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Data', 'Software Systems'];

  // Map display categories to actual project categories for the F1 Strategist persona
  const categoryMap: { [key: string]: string } = {
    'All': 'All',
    'Data': 'Data',
    'Software Systems': 'Software Systems'
  };

  const filteredProjects = filter === 'All' 
    ? ProjectData
    : ProjectData.filter((p: Project) => p.category === categoryMap[filter]);

  return (
    <div className="project-archive-container" id="projects" style={{ backgroundColor: '#FAFAF8', padding: '100px 10%' }}>
      <h1 style={{ 
        fontFamily: "'Inter', sans-serif", 
        fontWeight: 800, 
        textTransform: 'uppercase', 
        letterSpacing: '3px', 
        color: '#1E1E1E',
        fontSize: '2.5rem',
        marginBottom: '10px'
      }}>
        Launch Log
      </h1>
      <p style={{ color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '40px' }}>
        Telemetry & Deployments
      </p>
      
      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px' }}>
        {categories.map((cat: string) => (
          <button 
            key={cat} 
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
            style={{
              padding: '10px 25px',
              border: filter === cat ? 'none' : '2px solid #2C2C2C',
              backgroundColor: filter === cat ? '#FF7A1A' : 'transparent',
              color: filter === cat ? '#FAFAF8' : '#1E1E1E',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0px' // Sharp, technical edges
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="project-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '40px' 
      }}>
        {filteredProjects.map((project: Project, index: number) => (
          <div className="project-card" key={index} style={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid rgba(30, 30, 30, 0.1)',
            borderRadius: '0px',
            textAlign: 'left',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="image-container" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="overlay" style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(30, 30, 30, 0.9)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: '0.3s ease'
              }}>
                <a href={project.link} target="_blank" rel="noreferrer" style={{ 
                  color: '#FAFAF8', 
                  backgroundColor: '#FF7A1A', 
                  padding: '12px 24px', 
                  textDecoration: 'none', 
                  fontWeight: 800, 
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '1px'
                }}>
                  View Telemetry
                </a>
              </div>
            </div>
            
            <div className="card-content" style={{ padding: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="category-tag" style={{ 
                  fontSize: '0.7rem', 
                  color: '#FF7A1A', 
                  textTransform: 'uppercase', 
                  fontWeight: 800,
                  letterSpacing: '1px'
                }}>
                  {project.category}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: 700, fontFamily: 'monospace' }}>
                  v1.0.4
                </span>
              </div>
              
              <h3 style={{ margin: '0 0 15px 0', fontSize: '1.25rem', color: '#1E1E1E', fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>
                {project.title}
              </h3>
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#6B7280', 
                lineHeight: '1.6', 
                height: '60px', 
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                {project.description}
              </p>
              
              <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(30,30,30,0.05)', paddingTop: '15px' }}>
                {project.tech.map((t: string) => (
                  <span key={t} style={{ 
                    fontSize: '0.65rem', 
                    color: '#1E1E1E', 
                    backgroundColor: 'rgba(255, 122, 26, 0.1)', 
                    padding: '4px 10px',
                    fontWeight: 700,
                    fontFamily: 'monospace'
                  }}>
                    #{t.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectArchive;