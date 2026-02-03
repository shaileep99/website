import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  category: 'Data' | 'Software Systems';
  tech: string[];
}

export const ProjectData: Project[] = [
  {
    title: "Quantitative Stock Analysis",
    description: "Automated statistical trend analysis for NSE data reducing manual analysis by 60% through the development of Python-based time-series modeling and predictive analytics.",
    image: mock04,
    link: "https://www.filmate.club/",
    category: "Data",
    tech: ["TIME-SERIES", "PYTHON", "QUANTITATIVE ANALYSIS"]
  },
  {
    title: "Sephora Review Analysis",
    description: "Derived consumer insights from 500K+ product reviews driving a 20% lift in engagement by applying NLP-based sentiment clustering and custom Tableau dashboards.",
    image: mock03,
    link: "https://www.datumlearn.com/",
    category: "Data",
    tech: ["NLP", "SENTIMENT ANALYSIS", "TABLEAU", "CLUSTERING"]
  },
  {
    title: "Solar Anomaly Detection",
    description: "Engineered an ML-based computer vision system achieving an 85% F1-score and 30% faster response times by deploying Faster R-CNN models and real-time diagnostic dashboards.",
    image: mock02,
    link: "http://www.wemanage.jp/",
    category: "Software Systems",
    tech: ["ML / COMPUTER VISION", "TENSORFLOW", "REAL-TIME DASHBOARDS"]
  },
  {
    title: "WiFi File Transfer:",
    description: "Developed a secure multi-threaded transfer system enabling low-latency concurrent data streams by implementing C-based TCP/UDP socket programming with AES-256 encryption.",
    image: mock01,
    link: "https://github.com/yujisatojr/multi-reg-analysis",
    category: "Software Systems",
    tech: ["SOCKET PROGRAMMING", "C", "AES-256", "MULTI-THREADING"]
  }
];