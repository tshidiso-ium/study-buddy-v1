// Navbar.jsx
import React, { useEffect, useState } from "react";
import "../../Style/MobileNavbar.css";
import logo from "../../media/Study-Budy-Logo.png"
import Profile from '../login/Profile';

export default function Navbar({userLoginDetails, changeLiState, logoutClicked }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div style={{display:'flex'}}>
        <img src={logo} alt="logo" style={{ maxWidth: "40px", maxHeight: "40px"}}/>
        <div style={{
                height:'40px',
                paddingTop: "10px",
                paddingLeft: "10px",
                color: '#F9D9E6'               
            }}>Study Buddy </div>
      </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <div className={`nav-link`}>
          <span href="#Home"  id="homeLinkClick"  onClick={(e)=>{changeLiState(e); setOpen(false)}}>Home</span>
        </div>
        <div className={`nav-link`}>
          <span href="#PastPapers" id="pastPapersLinkClick"  onClick={(e)=>{changeLiState(e); setOpen(false)}}>Exam Papers</span>
        </div>
        <div className={`nav-link`}>
          <span href="#Donate" id="donateLinkClick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Donate</span>
        </div>
            {
              userLoginDetails.userLogedIn ? 
                <>
                  <div className={`nav-link`}>
                    <span id="chatbotLinkCLick"  href="#Chatbot" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Chat</span>
                  </div>
                  <div className={`nav-link`}>
                    <span id="purchasTokensLinkClick" href="#puchaseTokens" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Purchase Tokens</span>
                  </div>
                  <div className={`nav-link`}>
                        <div className="li-a-avator">
                            <Profile user={userLoginDetails}/>
                        </div>
                        <span href="#Profile" id="profileComponentCLick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Profile</span>
                  </div>
                </>
                : 
                <div className={`nav-link`}>
                  <span id="loginLinkClick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Sign In</span>
                </div>
            }
      </div>

      <div 
        className={`hamburger ${open ? "open" : ""}`} 
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}