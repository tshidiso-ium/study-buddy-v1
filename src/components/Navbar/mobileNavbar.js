// Navbar.jsx
import React, { useEffect, useState } from "react";
import "../../Style/MobileNavbar.css";
import logo from "../../media/Study-Budy-Logo.png"
import Profile from '../login/Profile';

export default function Navbar({userLoginDetails, changeLiState, logoutClicked }) {
  const [open, setOpen] = useState(false);
    const [activePan, setActivePan] = useState("Home");
    const [liHome, setLiHome] = useState({class:"nav-link-active"});
    const [profileComponent, setProfileComponent] = useState({class:"nav-link"});
    const [donatePage, setDonatePage] = useState({class:"nav-link"});
    const [loginComponent, setLoginComponent] = useState({class:"nav-link"});
    const [liPastPapers, setLiPastPapers] = useState({class:"nav-link"});
    // const [logoutClicked, setLogoutClicked] = useState(false);
    const [chatBotComponent, setChatBotComponent] = useState({class:"nav-link"});
    const [purchaseTokensComponent, setPurchaseTokensComponent] = useState({class:"nav-link"});

  function changeLiStateFunction(event){
    if(event?.preventDefault)
    {
      console.log("preventDefault")
      event.preventDefault();
    }
    console.log(event.target)
    console.log(event.target.id)
    switch (event.target.id) {
    case  "homeLinkClick": 
      setLiHome(
        {class:"nav-link-active"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setDonatePage(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      break;
    case "pastPapersLinkClick":
      setLiHome(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setLiPastPapers(
        {class:"nav-link-active"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setDonatePage(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      break;
    case "donateLinkClick":
      setLiHome(
        {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setDonatePage(
       {class:"nav-link-active"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      break;
    case "loginLinkClick":
      console.log("Login clicked")
      setLiHome(
        {class:"nav-link"}
      )
      setDonatePage(
       {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link-active"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      setActivePan(
        "Home"
      )
      break;
    case "chatbotLinkCLick":
      console.log("Chat Bot clicked")
      setLiHome(
        {class:"nav-link"}
      )
      setDonatePage(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link-active"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      break;
    case "profileComponentCLick":
      console.log("Profile Component Activiated")
      setLiHome(
        {class:"nav-link"}
      )
      setDonatePage(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link-active"}
      )
      break;
    case "purchasTokensLinkClick":
      console.log("Puchase Tokens Component Activiated")
      setLiHome(
        {class:"nav-link"}
      )
      setDonatePage(
        {class:"nav-link"}
      )
      setLoginComponent(
        {class:"nav-link"}
      )
      setChatBotComponent(
        {class:"nav-link"}
      )
      setProfileComponent(
        {class:"nav-link"}
      )
      setLiPastPapers(
        {class:"nav-link"}
      )
      setPurchaseTokensComponent(
        {class:"nav-link-active"}
      )
      break;
    default:
      break;
    }
  }


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
        <div className={liHome.class}>
          <span href="#Home"  id="homeLinkClick"  onClick={(e)=>{changeLiStateFunction(e); changeLiState(e); setOpen(false)}}>Home</span>
        </div>
        <div  className={liPastPapers.class}>
          <span href="#PastPapers" id="pastPapersLinkClick"  onClick={(e)=>{changeLiStateFunction(e); changeLiState(e); setOpen(false)}}>Exam Papers</span>
        </div>
        <div  className={donatePage.class}>
          <span href="#Donate" id="donateLinkClick" onClick={(e)=>{changeLiStateFunction(e); changeLiState(e); setOpen(false)}}>Donate</span>
        </div>
            {
              userLoginDetails.userLogedIn ? 
                <>
                  <div className={chatBotComponent.class}>
                    <span id="chatbotLinkCLick"  href="#Chatbot" onClick={(e)=>{changeLiStateFunction(e); changeLiState(e); setOpen(false)}}>Chat</span>
                  </div>
                  <div className={purchaseTokensComponent.class}>
                    <span id="purchasTokensLinkClick" href="#puchaseTokens" onClick={(e)=>{changeLiStateFunction(e); 
                      changeLiState(e); setOpen(false)}}>Purchase Tokens</span>
                  </div>
                  <div className={profileComponent.class}>
                        <div className="li-a-avator">
                            <Profile user={userLoginDetails}/>
                        </div>
                        <span href="#Profile" id="profileComponentCLick" onClick={(e)=>{changeLiStateFunction(e); 
                          changeLiState(e); setOpen(false)}}>Profile</span>
                  </div>
                </>
                : 
                <div className={`nav-link`}>
                  <span id="loginLinkClick" onClick={(e)=>{changeLiStateFunction(e); changeLiState(e); setOpen(false)}}>Sign In</span>
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