import React, {useState, useEffect} from "react"
import '../../Style/UserDetails.css'
import Profile from './Profile'

export default function ProfileComponent(user) {

    const currentUser = user;
    const [userDetails, setUserDetails] = useState(0);
    //const userDetail = await getUserDetails(currentUser.user.uid);
    useEffect(() => {
       (
            async () => {
                try{    
                    console.log(currentUser);
                    var currentUserDetails = await getUserDetails(currentUser.userDetails.uid);
                    currentUserDetails = currentUserDetails.userDetails
                    setUserDetails(currentUserDetails);
                }
                catch(err){
                    console.log("useEffect : Err");
                    console.log(err);
                    throw new Error(err);
                }    
            }
        )();

        return () => {
            // this now gets called when the component unmounts
        };

      }, []);

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

          return results;
        }
        catch (err){
          console.log("getUserDetails: Error")
          console.log(err)
          throw new Error(err);
        }
    };

    return (
        <div className="user-profile">
            <div className="user-profile-container">
                {
                    userDetails ?
                        <div className="profile-details">
                        <h2 style={{ display: 'inline-block' }}>User Profile </h2>
                        <div>
                            <strong>First Name:</strong> {userDetails.userFName}
                        </div>
                        <div>
                            <strong>Last Name:</strong> {userDetails.userLName}
                        </div>
                        <div>
                            <strong>Email:</strong> {userDetails.userEmail}
                        </div>
                        <div>
                            <strong>Date Registered:</strong> {userDetails.dateRegistered}
                        </div>
                        <div>
                            <strong>Available Tokens:</strong> {userDetails.availableTokens}
                        </div>
        
                        </div>
                        
                    :
                    <div>please wait...</div>
                }
            </div>
        </div>
    );
}

/*
                <div>
                    <button>Buy Tokkens</button>
                    <button>Logout</button>
                </div>
*/