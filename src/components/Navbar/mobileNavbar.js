// Navbar.jsx
import React, { useEffect, useState } from "react";
import "../../Style/MobileNavbar.css";
import logo from "../../media/Study-Budy-Logo.png"
import Profile from '../login/Profile';

export default function Navbar({userLoginDetails, changeLiState, logoutClicked }) {
  const [open, setOpen] = useState(false);

useEffect(()=>{
    console.log("userLoginDetails: ", userLoginDetails);
    console.log("logoutClicked: ", logoutClicked);
    console.log("changeLiState: ", changeLiState);
}, [])

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
        <a href="#login"  id="loginLinkClick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Sign In</a>
        <a href="#Home"  id="homeLinkClick"  onClick={(e)=>{changeLiState(e); setOpen(false)}}>Home</a>
        <a href="#PastPapers" id="pastPapersLinkClick"  onClick={(e)=>{changeLiState(e); setOpen(false)}}>Exam Papers</a>
        <a href="#Donate" id="donateLinkClick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Donate</a>

            {
              userLoginDetails.userLogedIn &&
                <>
                    <a id="chatbotLinkCLick"  href="#Chatbot" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Chat</a>
                    <a id="purchasTokensLinkClick" href="#puchaseTokens" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Purchase Tokens</a>
                    <div className={`profile-container ${logoutClicked ? 'profile-container-logout' : 'profile-container'}`}>
                        <li>
                        <div className="li-a-avator"><Profile user={userLoginDetails}/></div>
                        </li>
                        <li>
                        <a href="#Profile" id="profileComponentCLick" onClick={(e)=>{changeLiState(e); setOpen(false)}}>Profile</a>
                        </li>
                    </div>
                </>
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