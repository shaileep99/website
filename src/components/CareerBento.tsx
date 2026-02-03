import React, { useState } from "react";
import '../assets/styles/CareerBento.scss';

// Define the structure for TypeScript to prevent 'any' errors
interface HistoryItem {
  org: string;
  role: string;
  period: string;
  impact: string;
  details: string | string[]; // Can be a string (Education) or array (Work)
  tools: string[];
  image: string;
}

const CareerBento: React.FC = () => {
  const [activeHistory, setActiveHistory] = useState<number>(0);

  const history: HistoryItem[] = [
    {
      org: "KLAW INDUSTRIES",
      role: "Software Engineer Intern",
      period: "2024 — 2025",
      impact: "AUG 2024 - MAY 2025",
      details: [
        "Cut diagnostic time from 1 day to 1 hour by unifying real-time sensors via AWS IoT Core, through a centralized backend system.",
        "Achieved fault-tolerant telemetry by automating self-healing Python workflows for 10+ IP cameras during network disruptions.",
        "Reduced troubleshooting time by 25% by leveraging AWS IoT TwinMaker & Grafana to integrate factory machine and video data."
      ],
      tools: ["AWS IOT ECOSYSTEM", "PYTHON / SYSTEMD", "GRAFANA", "EMBEDDED SYSTEMS", "KINESIS VIDEO STREAMS", "SQL"],
      image: "https://images.squarespace-cdn.com/content/v1/5cfee7779de45a000197fd31/1622649420794-QC687JBOL698CEBAZOTH/KLAW+Industries+Transparent.png"
    },
    {
      org: "BINGHAMTON UNIVERSITY",
      role: "MS in Computer Science",
      period: "2023 — 2025",
      impact: "AUG 2023 - MAY 2025",
      details: [
        "Specialized in high-performance cloud architecture and distributed systems while transitioning into industrial IoT engineering at KLAW Industries.",
        "Mastered core engineering pillars including Operating Systems, Computer Security, and AI to build robust, scalable technical foundations.",
        "Architected efficient software solutions by applying advanced Design Patterns and Database Management theories to complex system challenges."
      ],
      tools: ["ALGORITHMS", "AI", "SYSTEM SECURITY", "DESIGN PATTERNS", "DATABASE MGMT"],
      image: "https://upload.wikimedia.org/wikipedia/en/6/67/State_University_of_New_York_at_Binghamton_Seal.png"
    },
    {
      org: "LTIMINDTREE",
      role: "Software Engineer",
      period: "2021 — 2023",
      impact: "JUN 2021 - JUL 2023",
      details: [
        "Reduced processing latency by 65% by optimizing Java-based microservices, through the engineering of high-efficiency financial accounting workflows.",
        "Decreased production defects by 25% by migrating legacy PL/SQL into Drools rule engines, through architecting modern business logic frameworks.",
        "Cut audit and reconciliation cycles by 50% by automating PostgreSQL ingestion pipelines, through unifying data from 128 enterprise applications."
      ],
      tools: ["JAVA", "SPRING BOOT", "PostgreSQL", "DISTRIBUTED SYSTEMS", "ETL"],
      image: "https://companieslogo.com/img/orig/LTIM.NS-dea59dc6.png?t=1720244492"
    },
    {
      org: "UNIVERSITY OF MUMBAI",
      role: "BTech in Information Technology",
      period: "2017 — 2021",
      impact: "AUG 2017 - MAY 2021",
      details: [
        "Steered the creative directive for the Alumni Cell as Design Head, managing brand consistency and strategic social media deployments.",
        "Led a team of technical photographers as Shutterbugs Head, coordinating visual coverage and asset management for university-wide events.",
        "Balanced rigorous Information Technology coursework with leadership responsibilities, mastering core pillars of Data Structures and Algorithms."
      ],
      tools: ["DATA STRUCTURES", "ALGORITHMS", "DATABASE MGMT", "OPERATING SYSTEMS", "CLOUD COMPUTING"],
      image: "https://kjsce.somaiya.edu/assets/kjsce/img/newlogo/kjsce-formerly.svg"
    }
  ];

  return (
    <section className="career-bento-section" id="career">
      <div className="bento-container">
        <header className="bento-header">
          <p className="subtitle">LATEST NEWS</p>
          <h2 className="main-title">CAREER ENGINEERING</h2>
        </header>

        <div className="bento-grid">
          {/* LEFT SIDE: Interactive Experience Tabs */}
          <div className="tabs-column">
            {history.map((item, index) => (
              <div 
                key={index}
                className={`career-tab ${activeHistory === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveHistory(index)}
              >
                <div className="active-connector"></div>
                <div className="tab-content">
                  <span className="tab-org">{item.org}</span>
                  <h3 className="tab-role">{item.role}</h3>
                  <p className="tab-preview">{item.impact}</p>
                </div>
                <div className="tab-arrow">↗</div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Detailed Experience View */}
          <div className="detail-column">
            <div className="detail-visual-box" key={activeHistory}>
              <div className="detail-header-row">
                <span className="detail-period">{history[activeHistory].period}</span>
                <img src={history[activeHistory].image} alt="Org Logo" className="detail-logo" />
              </div>
              
              <div className="detail-text-content">
                <h2 className="detail-org-full">{history[activeHistory].org}</h2>
                
                {/* Dynamically render Bullets for Work and Text for Edu */}
                {/* Using explicit type casting to satisfy TypeScript's check */}
                {Array.isArray(history[activeHistory].details) ? (
                  <ul className="detail-bullets">
                    {(history[activeHistory].details as string[]).map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="detail-description">{history[activeHistory].details as string}</p>
                )}
                
                <div className="stack-group">
                  {history[activeHistory].tools.map(tool => (
                    <span key={tool} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
              <div className="vertical-label">TELEMETRY_SCAN</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerBento;