import React, {useState, useEffect} from "react";
// import Typist from 'react-typist';
//import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGraduationCap, faComments} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faXing, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
// import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../Style/WelcomPage.css';
import ExamPapers from './OldPapers';
import Home from './Home';
import Donate from "./Donate";
import thankYou from '../media/thank-you.gif';
import LoginComponent from './login/LoginComponent';
import Chatbot from './Chatbot';
import Profile from './login/Profile';
import ProfileComponent from './login/ProfileComponent';
import BuyTokens from './buyTokens/BuyTokens';
import { Widgets } from "@mui/icons-material";
import WindowSize from "../modules/windowSize";
import MobileNavbar from "./Navbar/mobileNavbar"
import logo from "../media/Study-Budy-Logo.png"


function WelcomePage() {
  //const [activePan, setActivePan] = useState("");
  const [activePan, setActivePan] = useState("Home");
  const [liHome, setLiHome] = useState({class:"active"});
  const [liG10, setLiG10] = useState({class:""});
  const [liG11, setLiG11] = useState({class:""});
  const [liG12, setLiG12] = useState({class:""});
  const [profileComponent, setProfileComponent] = useState({class:""});
  const [donatePage, setDonatePage] = useState({class:""});
  const [loginComponent, setLoginComponent] = useState({class:""});
  const [liPastPapers, setLiPastPapers] = useState({class:""});
  const [showPanel, setShowPanel] = useState({status: false, type:""});
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [userLoginDetails, setUserLoginDetails] = useState({userLogedIn:false});
  const [chatBotComponent, setChatBotComponent] = useState({class:""});
  const [purchaseTokensComponent, setPurchaseTokensComponent] = useState({class:""});
  const deviceWidth = WindowSize();

  useEffect(() => {
    // Read the current URL
    if(window.location.search.length > 0){
      const searchParams = new URLSearchParams(window.location.href);
      const parameters = {};
      // Iterate over the parameters and extract their values
      for (const [key, value] of searchParams.entries()) {
      parameters[key] = value;
      }
      const keys = Object.keys(parameters);

      // Access the first key and its value
      const redirectTypeKey = keys[0];
      const type = parameters[redirectTypeKey];

      if(type === "Donation" && parameters.status === "Successful"){
        console.log("Show user thank you notification");
        handleShowThankYou("Donation");
      }
      else if (type === "purchaseTokens" && parameters.status === "Successful"){
        console.log("Show user suuccesful notification");
        handleShowThankYou("purchaseTokens");
        setUserTokenPurchased();
      }

    }
    else{
      console.log("No url?")
    }

  }, []);

  const handleShowThankYou = (panelType) => {
    setShowPanel({...setShowPanel, status: true, type: panelType});

    // You can set a timeout to hide the panel after a few seconds if needed
    setTimeout(() => {
      setShowPanel(false);
    }, 7000); // 3000 milliseconds (3 seconds) in this example
  };

  function changeLiState(event){
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
        {class:"active"}
      )
      setActivePan(
        "Home"
      )
      setLiG10(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      break;
    case "pastG10LinkClick":
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:"active"}
      )
      setActivePan(
        "G10"
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
    break;
    case "pastG11LinkClick":
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:"active"}
      )
      setActivePan(
        "G11"
      )
      setLiG12(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      break;
    case "pastG12LinkClick":
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:"active"}
      )
      setChatBotComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setActivePan(
        "G12"
      )
      setDonatePage(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      break;
    case "pastPapersLinkClick":
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setLiG12(
        {class:"active"}
      )
      setChatBotComponent(
        {class:""}
      )
      setActivePan(
        "G12"
      )
      setDonatePage(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      break;
    case "donateLinkClick":
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setDonatePage(
       {class:"active"}
      )
      setActivePan(
        "Donate"
      )
      setLoginComponent(
        {class:""}
      )
      break;
    case "loginLinkClick":
      console.log("Login clicked")
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setDonatePage(
       {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setLoginComponent(
        {class:"active"}
      )
      setActivePan(
        "Home"
      )
      break;
    case "chatbotLinkCLick":
      console.log("Chat Bot clicked")
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:"active"}
      )
      setActivePan(
        "Chatbot"
      )
      break;
    case "profileComponentCLick":
      console.log("Profile Component Activiated")
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:""}
      )
      setProfileComponent(
        {class:"active"}
      )
      setActivePan(
        "ProfileComponent"
      )
      break;
    case "purchasTokensLinkClick":
      console.log("Puchase Tokens Component Activiated")
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setPurchaseTokensComponent(
        {class:"active"}
      )
      setActivePan(
        "BuyTokens"
      )
      break;
    default:
      break;
    }
  }

  const displayChosenPan = () =>{
    switch(activePan){
        case "Home" :
          return  (<Home changePan = {changeLiState}/>);
        case "Donate":
          return  ( <div><br/> <Donate/> </div>);
        case "G11":
          return ( <div><br/> <ExamPapers Grade = {activePan} /></div>);
        case "G12":
          return ( <div><br/> <ExamPapers Grade = {activePan} /></div>);
        case "Login":
          return ( <div><br/> <LoginComponent userDetails={setUserDetails}/></div>);
        case "Chatbot":
          return(<div><br/> <Chatbot userDetails={userLoginDetails}/> </div>)
        case "ProfileComponent":
          return ( <div><br/> <ProfileComponent userDetails={userLoginDetails}/></div>);
        case "BuyTokens":
          return (<div> <br/> <BuyTokens userDetails={userLoginDetails}/></div>)
        default:
          return <Home/>
    }
  };
  const setUserDetails = async (user) => {
    console.log(user);
    console.log(user.uid);
    console.log(`${user.uid ? "true" :"false"}`);
    if(user.userDetails){
      //update user details here 
      setUserLoginDetails({...userLoginDetails, userLogedIn:true,user})
      //show chat gpt
      setLiHome(
        {class:""}
      )
      setLiG10(
        {class:""}
      )
      setLiG11(
        {class:""}
      )
      setLiG12(
        {class:""}
      )
      setDonatePage(
        {class:""}
      )
      setLoginComponent(
        {class:""}
      )
      setProfileComponent(
        {class:""}
      )
      setChatBotComponent(
        {class:"active"}
      )
      setActivePan(
        "Chatbot"
      )
    }
    else if(user.uid){
      console.log("getting user details");
      try{
        console.log(await getUserDetails(user.uid));
        const currentUser = await getUserDetails(user.uid)
        setUserLoginDetails({...userLoginDetails, userLogedIn:true,userFName: currentUser.userDetails.userFName, userLName: currentUser.userDetails.userLName,uid:user.uid})
        //show chat gpt
        setLiHome(
          {class:""}
        )
        setLiG10(
          {class:""}
        )
        setLiG11(
          {class:""}
        )
        setLiG12(
          {class:""}
        )
        setDonatePage(
          {class:""}
        )
        setLoginComponent(
          {class:""}
        )
        setProfileComponent(
          {class:""}
        )
        setChatBotComponent(
          {class:"active"}
        )
        setActivePan(
          "Chatbot"
        )
      }
      catch(err){
        console.log("setUserDetails:err")
        console.log(err)
        throw new Error(err);
      }
    }
    else{
      ///dont do anything
    }
  };
  const setUserTokenPurchased = () => {
    setLiHome(
      {class:""}
    )
    setLiG10(
      {class:""}
    )
    setLiG11(
      {class:""}
    )
    setLiG12(
      {class:""}
    )
    setDonatePage(
      {class:""}
    )
    setLoginComponent(
      {class:"active"}
    )
    setProfileComponent(
      {class:""}
    )
    setChatBotComponent(
      {class:""}
    )
    setActivePan(
      "Login"
    )
  };
  const thankYouPan = () => {
    return (
      <div className={`thank-you-panel ${showPanel ? 'show' : ''}`}>
        <img src={thankYou} alt="Thank You" />
        <h2>Donation Received!</h2>
        {/* <Typist> */}
          <p>Thanks a million!🙏 Your awesome support keeps our exam papers flying high. 🚀</p>
        {/* </Typist> */}
      </div>
    );
  };

  const tokenPurchased = () => {
    return (
      <div className={`thank-you-panel ${showPanel ? 'show' : ''}`}>
        <img src={thankYou} alt="Thank You" />
        <h2>Tokens Purchased Successfully✅</h2>
        {/* <Typist> */}
          <p>Your payment is being processed. Please login again to continue learning🎓</p>
        {/* </Typist> */}
      </div>
    );
  };
  const getUserDetails = async (uid) => {
    try{
      const res = await fetch(`https://us-central1-study-buddy-bceaf.cloudfunctions.net/app/firebase/getUserDetails?uid=${uid}`,{
        method: "Get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
  
        }
      });
      const results = await res.json();
      
      console.log("getUserDetails");
      console.log(results);
      return results;
    }
    catch (err){
      console.log("getUserDetails: Error")
      console.log(err)
      throw new Error(err);
    }
  };

  return (
    <div className="welcome-page">
      <header>

      </header>
      <main>
        {
          deviceWidth.width >= 768  &&
          <ul className="ul">
              <div style={{display:'flex', alignItems:"center"}}>
                  <img src={logo} alt="logo" style={{ maxWidth: "35px", maxHeight: "35px", paddingBottom: '4px'}}/>
                  <div style={{
                          height:'30px',
                          paddingTop: "2px",
                          paddingLeft: "12px",
                          paddingRight: "20px",
                          color: '#F9D9E6'               
                      }}>Study Buddy </div>
              </div>
              <li ><a id="homeLinkClick" class={liHome.class} href="#Home" onClick={changeLiState}> Home</a></li>
              <li ><a id="pastPapersLinkClick" class={liG12.class} href="#PastPapers" onClick={changeLiState}>Exam Papers</a></li>
              <li ><a id="donateLinkClick" class={donatePage.class} href="#Donate" onClick={changeLiState}>Donate</a></li>
              {
              userLoginDetails.userLogedIn ?
                <>
                  <li> <a id="chatbotLinkCLick" className={chatBotComponent.class} href="#Chatbot" onClick={changeLiState}>Chat</a></li>
                  <li> <a id="purchasTokensLinkClick" className={purchaseTokensComponent.class} href="#puchaseTokens" onClick={changeLiState}>Purchase Tokens</a></li>
                  <div className={`profile-container ${logoutClicked ? 'profile-container-logout' : 'profile-container'}`}>
                      <li>
                      <div className="li-a-avator"><Profile user={userLoginDetails}/></div>
                      </li>
                      <li>
                      <a className={profileComponent.class} id="profileComponentCLick" onClick={changeLiState}>Profile</a>
                      </li>
                  </div>
                </>
                :
                <div className={`profile-container ${logoutClicked ? 'profile-container-logout' : 'profile-container'}`}>
                    <div className="profile-wrapper">
                      <li ><a id="loginLinkClick" class={loginComponent.class} onClick={changeLiState}>Sign In</a></li>
                    </div>
                </div>
              }
          </ul>
        }
        {
          deviceWidth.width <= 768  &&
          <MobileNavbar userLoginDetails={userLoginDetails} changeLiState={changeLiState} logoutClicked={logoutClicked}/>
        }
        {
          loginComponent.class === "active" ? (
            <div className="loginPageFadeIn"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 98,
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: "100%",
                height: "100%"
              }}
            >
              <LoginComponent userDetails={setUserDetails} />
            </div>
          ) : null
        }
        <div >
            {
              displayChosenPan()
            }
            {
              showPanel.type === "Donation" && showPanel.status ?
                <>
                  {thankYouPan()}
                </>
                :
              showPanel.type === "purchaseTokens" && showPanel.status ?
                <>
                  {tokenPurchased()}
                </>
                :
                <>
                </>
            }
          <br/>
        </div>
      </main>
      
      <footer>
        <div class="social-icons">
          <a href="#" className="facebook">
            <FontAwesomeIcon icon={faFacebook} size="xl" className="social-icons-color" />
          </a>
          <a href="#" className="twitter">
            <FontAwesomeIcon icon={faXTwitter} size="xl"  className="social-icons-color"/>
          </a>
          <a href="#" className="instagram">
            <FontAwesomeIcon icon={faInstagram} size="xl" className="social-icons-color"/>
        </a>
        </div>
        <p>Copyright © {new Date().getFullYear()} Study Buddy.
          All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
