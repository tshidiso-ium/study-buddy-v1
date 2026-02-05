import React,{ useState, useEffect } from 'react';
import '../../Style/Login.css'
import firebaseApp from '../firebase/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,sendEmailVerification, updateProfile} from 'firebase/auth';
import RingLoader from "react-spinners/RingLoader";
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import worning from '../../media/login-worning.png'
import verifyEmail from '../../media/verify-email.avif'
import signupSuccessfull from '../../media/success-signup.avif'
import MessageAlert from '../Alert';
import WindowSize from '../../modules/windowSize'


const  LoginComponent = ({userDetails}) => {

    const [signUpDetails, setSingUpDetails] = useState({
      email: '',
      password: '',
      passwordRepeat: '',
      firstName:'',
      lastName:''
    });
    const [loginDetails, setLoginDetails] = useState({
      email: '',
      password: '',
    });
    const [alertPanel, setAlertPanel] = useState({
      show:false,
      type:''
    });
    const [signupError, setSignupErrors] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
        firstName:'',
        lastName:'',
    });
    const [loginError, setLoginErrors] = useState({
      email: '',
      password: ''
    });
    const [loading, setLoading] = useState(false)
    const [firebaseError, setFirebaseError] = useState('')
    const [alertMessage, setAlertMessage] = useState("");
    const [showPasswordSingUp, setShowPasswordSingUp] = useState(false);
    const [showPasswordSingUpConfirm, setShowPasswordSingUpConfirm] = useState(false);
    const [showPasswordSingIn, setShowPasswordSingIn] = useState(false);


    const deviceWidth = WindowSize();

    const isSignupFormHasErrors = () => {
        const newErrors = {
            email: '',
            password: '',
            passwordRepeat: '',
            lastName:'',
            firstName:''
        };  
        //first validate blank fields
        let isErrorFlag = false;
        Object.keys(newErrors).forEach(function (key) {
          const keyPair = key;
          const displayableKeyName = key.toLowerCase();
    
          if (!signUpDetails[keyPair]){
            console.log(displayableKeyName)
            if(displayableKeyName === "passwordrepeat"){
              newErrors[keyPair] = `password repeat required*`;
            }
            else if(displayableKeyName === "lastname"){
              newErrors[keyPair] = `Last name required*`;
            }
            else if(displayableKeyName === "firstname"){
              newErrors[keyPair] = `First name required*`;
            }
            else{
              newErrors[keyPair] = `${displayableKeyName} required*`;
            }
            isErrorFlag = true;
          } else {
            newErrors[keyPair] = '';
            isErrorFlag = false;
          }
        });
    
        if (isErrorFlag) {
          setSignupErrors(newErrors);
          return isErrorFlag;
        }
    
        if (signUpDetails['password'].length < 8) {
          newErrors.password = 'Password too short';
          isErrorFlag = true;
        }

        if (signUpDetails['passwordRepeat'] !== signUpDetails['password'] ) {
          newErrors.passwordRepeat = 'Password do not match';
          isErrorFlag = true;
        }
        if(signUpDetails['lastName'].length < 1){
          newErrors.lastName = 'Last Name too short';
          isErrorFlag = true;
        }
        if(signUpDetails['firstName'].length < 1){
          newErrors.firstName = 'First Name too short';
          isErrorFlag = true;
        }
        setSignupErrors(newErrors);
        return isErrorFlag;
    };

    const isLoginFormHasErrors = () => {
      const newErrors = {
          email: '',
          password: '',
      };
  
      //first validate blank fields
      let isErrorFlag = false;
      Object.keys(newErrors).forEach(function (key) {
        const keyPair = key;
        const displayableKeyName = key.toLowerCase();
  
        if (!loginDetails[keyPair]){
          newErrors[keyPair] = `${displayableKeyName} required*`;
          isErrorFlag = true;
        } else {
          newErrors[keyPair] = '';
          isErrorFlag = false;
        }
      });
  
      if (isErrorFlag) {
        setLoginErrors(newErrors);
        return isErrorFlag;
      }
  
      setLoginErrors(newErrors);
      return isErrorFlag;
    };
    
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isSignupFormHasErrors()) {
                setLoading(true);
                console.log("handle submit")
                if(signUpDetails.password === signUpDetails.passwordRepeat){
                    const auth = getAuth(firebaseApp);
                    const succesful = await createUserWithEmailAndPassword(auth,signUpDetails.email, signUpDetails.password)
                    console.log(succesful);
                    if(succesful.user){
                      await updateProfile(succesful.user,{displayName: `${signUpDetails.firstName} ${signUpDetails.lastName}`})
                      setLoading(false);
                      const user = succesful.user
                      setAlertPanel({...alertPanel,
                        show: true,
                        type: "signUpSuccess"
                      });
                      
                      setAlertMessage({...alertMessage,alertStatus: true, message: 'Congradulations, you have successfuly created an account. Now lets login', alertType:'success'})
                      setLoginDetails({...loginDetails, email: signUpDetails.email, password: ''});
                      setTimeout(()=> {
                        setAlertMessage({...alertMessage, alertStatus: false, message:'', alertType:''});
                        setSingUpDetails({ ...signUpDetails, email: '', password: '', passwordRepeat: ''});
                        setAlertPanel({...alertPanel,
                          show: false,
                          type: ""
                        });
                      }, 6000);
                    }
                }
                else{
                    console.log("passwords do not match");
                }
            }

            // User successfully registered
          } catch (error) {
            // Handle error
            setLoading(false);
            setAlertPanel({...alertPanel,
              show: true,
              type: "Error"
            });
            console.log(error)
            console.error(error.message);
            setAlertMessage({...alertMessage,alertStatus: true, message: error.message, alertType:"error"})
            setTimeout(()=> {
              setAlertMessage({...alertMessage, alertStatus: false, message:"", alertType:""});
              setSingUpDetails({ ...signUpDetails, email: '', password: '', passwordRepeat: ''});
              setAlertPanel({...alertPanel,
                show: false,
                type: ""
              });
            }, 6000);
          }
        // Add your form submission logic here
    };

    const setUpNewUser = async (userdetails) => {
      try{
        const res = await fetch(`https://us-central1-study-buddy-bceaf.cloudfunctions.net/app/firebase/setUpNewUser?uid=${userdetails.uid}&email=${userdetails.email}&firstName=${"Tshidiso"}&lastName=${"Modiko"}`,{
          method: "Post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
    
          }
        });
        const results = await res.json();
        console.log("setUpNewUser");
        console.log(results);
      }
      catch (err){
        console.log("setUpNewUser: Error")
        console.log(err)
        throw new Error(err);
      }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try{
          if (!isLoginFormHasErrors()) {
            //
            setAlertMessage({...alertMessage,alertStatus: true, message: 'Please wait...', alertType:'info'})
            setLoading(true);
            const auth = getAuth(firebaseApp);
            const success = await signInWithEmailAndPassword(auth,loginDetails.email, loginDetails.password);
            console.log(success.user);
            if(success.user){
              const user = success.user
              if(user.emailVerified === true){
                //set user as logged in
                var logedDetails ={
                  userLogedIn: true,
                  useEmail: user.email,
                  uid: user.uid
                }
                await userDetails({uid: user.uid});
              }
              else if(user.emailVerified === false){
                setLoading(false);
                const verificationSent = await sendEmailVerification(user);
                console.log("send email verification");
                console.log(verificationSent);
                setAlertPanel({...alertPanel,
                  show: true,
                  type: "emailVerified"
                });
                var userdetails = {
                  email: user.email,
                  uid: user.uid
                }
                setUpNewUser(userdetails);
                setAlertMessage({...alertMessage,alertStatus: true, message: 'Hold on, lets verify your email addres first. We have sent you a verification email', alertType:'info'})
                setTimeout(()=> {
                  setAlertMessage({...alertMessage, alertStatus: false, message:'', alertType:''});
                  setSingUpDetails({ ...loginDetails, email: '', password: ''});
                  setAlertPanel({...alertPanel,
                    show: false,
                    type: ""
                  });
                }, 6000);
              }
            }
          }
        }
        catch(error){
          console.log(error);
          if(error.code){
            const errorCode = error.code;
            if(errorCode === "auth/too-many-requests"){
              setLoading(false);
              setAlertPanel({...alertPanel,
                show: true,
                type: "Error"
              });
              console.log(error)
              console.error(error.message);
              setAlertMessage({...alertMessage,alertStatus: true, message: error.message, alertType:"error"})
              setTimeout(()=> {
                setAlertMessage({...alertMessage, alertStatus: false, message:"", alertType:""});
                setSingUpDetails({ ...loginDetails, email: '', password: ''});
                setAlertPanel({...alertPanel,
                  show: false,
                  type: ""
                });
              }, 6000);
            }
            else if(errorCode === "auth/wrong-password"){
              setLoading(false);
              setAlertPanel({...alertPanel,
                show: true,
                type: "Error"
              });
              console.log(error)
              console.error(error.message);
              setAlertMessage({...alertMessage,alertStatus: true, message: error.message, alertType:"error"})
              setTimeout(()=> {
                setAlertMessage({...alertMessage, alertStatus: false, message:"", alertType:""});
                setSingUpDetails({ ...loginDetails, email: '', password: ''});
                setAlertPanel({...alertPanel,
                  show: false,
                  type: ""
                });
              }, 6000);
            }
            else{
              //oops something went wrong, please try again.
              setLoading(false);
              setAlertPanel({...alertPanel,
                show: true,
                type: "Error"
              });
              console.log(error)
              console.error(error.message);
              setAlertMessage({...alertMessage,alertStatus: true, message: "Oops something went wrong, please try again later...", alertType:"error"})
              setTimeout(()=> {
                setAlertMessage({...alertMessage, alertStatus: false, message:"", alertType:""});
                setSingUpDetails({ ...loginDetails, email: '', password: ''});
                setAlertPanel({...alertPanel,
                  show: false,
                  type: ""
                });
              }, 6000);
            }
          }
          throw new Error(error)
        }

    };

    const errorAlert = () => {
      return (
        <>
          <img src={worning} />
          <div className='section-message-alert'>
              <MessageAlert message = {alertMessage} />
          </div>
        </>
      );
    };

    const verifyEmailAlert = () => {
      return (
        <>
          <h2>Verify Your Email</h2>
          <img src={verifyEmail} />
          <div className='section-message-alert'>
              <MessageAlert message = {alertMessage} />
          </div>
        </>
      );
    };

    const signupSuccessfullAlert = () => {
      return (
        <>
          <h2>Signup Successful!</h2>
          <img src={signupSuccessfull} />
          <div className='section-message-alert'>
              <MessageAlert message = {alertMessage} />
          </div>
        </>
      );
    };

    const switchToLogin = () => {
        // Add your logic to switch to the login form here
        setSignupErrors('')
        const login = document.getElementById("login");
        const signup = document.getElementById("signup");

        signup.style.animationName = "toRightLogin";
        signup.style.animationDuration = "1s";
        setTimeout( () => {
            signup.style.zIndex = "1";
            login.style.zIndex = "2";
            signup.style.animationName = "toPosition";
            signup.style.animationDuration = "1s";
        },900)

    };

    const switchToSignUp = () => {
        // Add your logic to switch to the signup form here
        setLoginErrors('')
        const login = document.getElementById("login");
        const signup = document.getElementById("signup");

        console.log(login)
        login.style.transform = "rotate(-5deg)";
        login.style.animationName = "toRightSignup";
        login.style.animationDuration = "1s"
        setTimeout( () => {
            login.style.zIndex = "1";
            signup.style.zIndex = "2";
            login.style.animationName = "toPositionSignup";
            login.style.animationDuration = "1s";
        },900)
    };

    const showUserLongin = () => {
        return(
            <div className="login-body" style={{background: "transparent", width:'100%', Height:"100%"}}>
                <div className="login-card login" id="login">
                    <h2 style={{marginTop: "20px"}}><FontAwesomeIcon icon={faKey} size="sm"/> Sign In</h2>
                    <form className="login-form" onSubmit={handleLoginSubmit} style={{marginTop: '20px'}}>
                        <div className="login-form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                              className={loginError.password ? 'invalid-input' : ''}
                              name="email"
                              type="email"
                              value={loginDetails.email}
                              onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
                          />
                          <p className={loginError.email ? 'invalid-label' : ''}>
                            {loginError.email}
                          </p>
                        </div>
                        <div className="login-form-group">
                        <label htmlFor="password">Password:</label>
                        {/* <input
                            className={loginError.password ? 'invalid-input' : ''}
                            name="password"
                            type="password"
                            value={loginDetails.password}
                            onChange={(e) => setLoginDetails({  ...loginDetails, password: e.target.value })}
                        /> */}
                          <div style={{ position: "relative", minwidth:'100%' }}>
                            <input
                              className={loginError.password ? "invalid-input" : ""}
                              style={{width:'100%'}}
                              name="password"
                              type={showPasswordSingIn ? "text" : "password"}
                              value={loginDetails.password}
                              onChange={(e) =>
                                setLoginDetails({ ...loginDetails, password: e.target.value })
                              }
                            />
                            {/* Eye Icon */}
                            <span
                              onClick={() => setShowPasswordSingIn(!showPasswordSingIn)}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#555"
                              }}
                            >
                              <FontAwesomeIcon icon={showPasswordSingUpConfirm ? faEyeSlash : faEye} />
                            </span>
                          </div>
                        <p className={loginError.password ? 'invalid-label' : ''}>
                          {loginError.password}
                        </p>
                        </div>
                        <button className="login-button" type="submit">Sign In</button>
                    </form>
                    <p className="link-login">
                        Don't have an account yet? 
                        <br/>
                        <span className="login-switchText" onClick={switchToSignUp}>Sign up!</span>
                    </p>
                </div>
                <div className="login-card signup" id="signup">
                    <h2 style={{marginTop: "10px"}}><FontAwesomeIcon icon={faUser} size="sm"/>Sign up</h2>
                    <form className="login-form" onSubmit={handleSignupSubmit}>
                        <div className='login-form-group'>
                          <label htmlFor="text">First Name:</label>                  
                          <input 
                              className={signupError.firstName ? 'invalid-input' : ''}
                              name='firstName'
                              type="text" 
                              value={signUpDetails.firstName} 
                              onChange={(e) => setSingUpDetails({...signUpDetails, firstName: e.target.value})} 
                          />
                            <p className={signupError.firstName ? 'invalid-label' : ''}>
                              {signupError.firstName}
                            </p>
                        </div>
                        <div className='login-form-group'>
                          <label htmlFor="text">Last Name:</label>
                          <input 
                              className={signupError.lastName ? 'invalid-input' : ''}
                              name='lastName'
                              type="text" 
                              value={signUpDetails.lastName} 
                              onChange={(e) => setSingUpDetails({...signUpDetails, lastName: e.target.value})} 
                          />
                          <p className={signupError.lastName ? 'invalid-label' : ''}>
                            {signupError.lastName}
                          </p>
                        </div>
                        <div className="login-form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            className={signupError.email ? 'invalid-input' : ''}
                            name="email"
                            type="text"
                            value={signUpDetails.email}
                            onChange={(e) => setSingUpDetails({...signUpDetails, email: e.target.value })}
                        />
                        <p className={signupError.email ? 'invalid-label' : ''}>
                          {signupError.email}
                        </p>
                        </div>
                        <div className="login-form-group">
                          <label htmlFor="password">Password:</label>
                          <div style={{ position: "relative", minwidth:'100%' }}>
                            <input
                              className={signupError.password ? "invalid-input" : ""}
                              style={{width:'100%'}}
                              name="password"
                              type={showPasswordSingUp ? "text" : "password"}
                              value={signUpDetails.password}
                              onChange={(e) =>
                                setSingUpDetails({ ...signUpDetails, password: e.target.value })
                              }
                            />
                            {/* Eye Icon */}
                            <span
                              onClick={() => setShowPasswordSingUp(!showPasswordSingUp)}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#555"
                              }}
                            >
                              <FontAwesomeIcon icon={showPasswordSingUp ? faEyeSlash : faEye} />
                            </span>
                          </div>
                          <p className={signupError.password ? 'invalid-label' : ''}>
                            {signupError.password}
                          </p>
                        </div>
                        <div className="login-form-group">
                        <label htmlFor="password-repeat">Password repeat:</label>
                          <div style={{ position: "relative", minwidth:'100%' }}>
                            <input
                              className={signupError.passwordRepeat ? "invalid-input" : ""}
                              style={{width:'100%'}}
                              name="password-repeat"
                              type={showPasswordSingUpConfirm ? "text" : "password"}
                              value={signUpDetails.passwordRepeat}
                              onChange={(e) =>
                                setSingUpDetails({ ...signUpDetails, passwordRepeat: e.target.value })
                              }
                            />
                            {/* Eye Icon */}
                            <span
                              onClick={() => setShowPasswordSingUpConfirm(!showPasswordSingUpConfirm)}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#555"
                              }}
                            >
                              <FontAwesomeIcon icon={showPasswordSingUpConfirm ? faEyeSlash : faEye} />
                            </span>
                          </div>
                        <p className={signupError.passwordRepeat ? 'invalid-label' : ''}>
                          {signupError.passwordRepeat}
                        </p>
                        </div>
                        <button className="login-button"  type="submit">Create</button>
                    </form>
                    <p className="link-login">
                        Already have an account?
                        <br/>
                        <span className="login-switchText" onClick={switchToLogin}>Sign in!</span>
                    </p>
                </div>
            </div>
        )
    };

    const showAlertMessage = () => {
      console.log(alertMessage)
      if(alertPanel.show){
        switch(alertPanel.type){
          case "emailVerified" :
              return  verifyEmailAlert()
          case "signUpSuccess":
              return   signupSuccessfullAlert()
          case "Error":
            return errorAlert();
        }
      }
    };

    return(
        <div style={{background: "transparent"}}>
          {
            alertMessage.alertStatus ?  
            <div className={`login-res-info show`} style={{maxHeight: deviceWidth.width <= 768 ? '40vh' : "80vh"}}>
              {
                loading ?
                 <>
                  <div style={{display: "flex", justifyContent: 'center', alignContent: 'center'}}>
                    {
                      deviceWidth.width <= 768  &&
                      <RingLoader size={180} color={"#F9D9E6"}/>
                    }
                    {
                      deviceWidth.width > 768  &&
                      <RingLoader size={380} color={"#F9D9E6"}/>
                    }
                  </div>
                  <div className='section-message-alert' style={{marginTop: '5%', width: '100%'}}>
                    <MessageAlert message = {alertMessage} />
                  </div>
                 </>
                : 
                showAlertMessage()

              }
            </div>
            :
            <div style={{background:"transparent"}}>
              {
                showUserLongin()
              }
            </div>
          }
        </div>
    )
}

export default LoginComponent;