import React from 'react';
import '../assets/styles/Footer.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  const currentYear = new Date().getFullYear();

  // 1. Define the 2026 Race Schedule
  const raceSchedule = [
    { name: "Australian GP", date: "2026-03-08" },
    { name: "Chinese GP", date: "2026-03-15" },
    { name: "Japanese GP", date: "2026-03-29" },
    { name: "Bahrain GP", date: "2026-04-12" },
    { name: "Saudi Arabian GP", date: "2026-04-19" },
    { name: "Miami GP", date: "2026-05-03" },
    { name: "Canadian GP", date: "2026-05-24" },
    { name: "Monaco GP", date: "2026-06-07" },
    { name: "Barcelona-Catalunya GP", date: "2026-06-14" },
    { name: "Austrian GP", date: "2026-06-28" },
    { name: "British GP", date: "2026-07-05" },
    { name: "Belgian GP", date: "2026-07-19" },
    { name: "Hungarian GP", date: "2026-07-26" },
    { name: "Dutch GP", date: "2026-08-23" },
    { name: "Italian GP", date: "2026-09-06" },
    { name: "Spanish GP (Madrid)", date: "2026-09-13" },
    { name: "Azerbaijan GP", date: "2026-09-26" },
    { name: "Singapore GP", date: "2026-10-11" },
    { name: "United States GP", date: "2026-10-25" },
    { name: "Mexico City GP", date: "2026-11-01" },
    { name: "São Paulo GP", date: "2026-11-08" },
    { name: "Las Vegas GP", date: "2026-11-21" },
    { name: "Qatar GP", date: "2026-11-29" },
    { name: "Abu Dhabi GP", date: "2026-12-06" }
  ];

  // 2. Logic to find the next race based on system date
  const today = new Date();
  const nextRace = raceSchedule.find(race => new Date(race.date) >= today) || raceSchedule[0];

  // 3. Format date for display (e.g., "MARCH 8")
  const displayDate = new Date(nextRace.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  return (
    <footer className="f1-footer">
      <div className="footer-main-content">
        <div className="footer-branding">
          <h2 className="footer-logo">SHA<span>ILEE</span></h2>
          <p className="footer-tagline">Software Engineer & F1 Tech Enthusiast</p>
        </div>

        <div className="footer-socials">
          <a href="https://github.com/shailee-p" target="_blank" rel="noreferrer"><GitHubIcon /></a>
          <a href="https://www.linkedin.com/in/shailee-patel/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
          <a href="https://www.instagram.com/shaileeeepatel" target="_blank" rel="noreferrer"><InstagramIcon /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} ALL SYSTEMS OPERATIONAL
        </div>
        <div className="championship-standing">
          NEXT RACE: <span className="p1">{nextRace.name} — {displayDate}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;