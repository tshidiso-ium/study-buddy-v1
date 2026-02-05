import React, {useState, useEffect} from "react";
//import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGraduationCap, faComments, faBolt, faCheckCircle, faDownload} from '@fortawesome/free-solid-svg-icons';
import '../Style/Home.css';
import logo from "../media/Study-Budy-Logo.png"
import ExamPapers from './OldPapers';
import LoginComponent from "./login/LoginComponent";
import { Download } from "@mui/icons-material";

function Home({changePan}) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadPapers, setDownloadPapers] = useState(false);
  useEffect(() => {
    setIsOpen(true)
  },[]);

    return (
      <div>
        <section className="hero-section">
          <div className={`hero-section-right ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt="logo" className="logo"/>
          </div>
          <div className="hero-section-left">
            <h1>Welcome to</h1> 
            <h1>Study Buddy!</h1>
            <br/>
            <p>Practice makes perfect, and Study Buddy offers a range of 
            past exam papers to help you ace your next exams.</p>
          </div>
        </section>
        <section className="features-section">
            <div className={`section-container-left ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="token-left-panel">
                <FontAwesomeIcon icon={faGraduationCap} className="icon" />
              </div>
              <div className="token-right-panel">
                <h3>Exam Success Unlocked!</h3>
                <p>Ace exams with our vast collection of past papers. Practice diverse formats & topics. Start acing today!</p>
              </div>
            </div>
        </section>
        <section className="features-section">
            <div className={`section-container-right ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="token-right-panel">
                <h3>Boost Your Exam Readiness!</h3>
                <p>Unleash your full potential with past exam papers! Sharpen time management, uncover strengths & weaknesses, and craft winning study tactics.</p>
              </div>
              <div className="token-left-panel">
                <FontAwesomeIcon icon={faBolt} className="icon" />
              </div>
            </div>
        </section>
        <section className="features-section">
            <div className={`section-container-left ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="token-left-panel">
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
              </div>
              <div className="token-right-panel ">
                <h3>Your Trusted Exam Companion!</h3>
                <p>We guarantee accuracy and reliability, with our authentic papers sourced from trusted educational sources. Rely on our papers for a successful exam journey. Your preparation partner awaits!</p>
              </div>
            </div>
        </section>

        <section className="features-section"  id="pastG12LinkClick" 
              onClick={(e) =>
              changePan({
                target: { id: e.currentTarget.id }
              })
            }>
            <div id="pastG12LinkClick" className={`section-container-right ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div 
                className="token-right-panel"
                onClick={(e)=>{changePan(e)}}
                onMouseEnter={()=>{setDownloadPapers(true)}} 
                onMouseLeave={()=>{setDownloadPapers(false)}} 
                style={{ cursor: "pointer", background: downloadPapers ?"#F9D9E6" :  "" }}>
                <h3 id="pastG12LinkClick" style={{ textDecoration: downloadPapers ? "underline": ""  , color: downloadPapers ? "white" :  "black"}}>DOWNLOAD PAST PAPERS</h3>
              </div>
              <div className="token-left-panel" id="pastG12LinkClick" >
                <FontAwesomeIcon icon={faDownload} id="pastG12LinkClick" className="icon" />
              </div>
            </div>
        </section>
      </div>
    )
}

export default Home;