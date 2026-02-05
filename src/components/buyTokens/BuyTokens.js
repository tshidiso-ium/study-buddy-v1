import React, {useState, useEffect} from "react";
import '../../Style/BuyToken.css'
import StudyBuddyLogo from "../../media/Study-Budy-Logo.png"
import Dropdown from './Dropdown';


function BuyTokens(userDetails) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionAmount, setSelectedOptionAmount] = useState(null)
    console.log("User Details");
    //console.log(userDetails);
    const currentUser = userDetails.userDetails;
    console.log(currentUser);
    const selectedToken = (SelectedOption) =>{
        console.log(SelectedOption)
        setSelectedOption(SelectedOption.text);
        setSelectedOptionAmount(SelectedOption.amount);
    }

    async function handlePurchaseTokens () {
        try{
            //const amount = donationAmount.donationAmount
            var raw = JSON.stringify({
                "userUid": currentUser.user.uid,
                "tokenAmount": selectedOptionAmount,
                "token": selectedOption,
                "userEmail": currentUser.user.userDetails.userEmail
              });
            const res = await fetch(`https://us-central1-study-buddy-bceaf.cloudfunctions.net/app/yoco/purchase_tokens?tokenAmount=${selectedOptionAmount}&token=${selectedOption}`,{
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              },
              body: raw
            });

            const redirectUrl = await res.json()
            console.log(redirectUrl);
            console.log(redirectUrl.redirect);
            window.location.href = redirectUrl.redirect; 
        }
        catch(err){
          throw new Error(err);
        }
      }

    return (
        <div className="token-panel">
            <div className="buy-token-container">
                <div className="token-left-panel">
                    {/* Content for the left panel goes here */}
                    <h1>Buy STUDY BUDDY Tokens Instantly</h1>
                    <a>Prices are per 5,000 tokens. You can think of tokens as pieces of words, where 1,000 tokens is about 750 words. This paragraph is 35 tokens.</a>
                    <br/>
                    <p>Purchase tokens here to continue receiving the best AI assistance for your academic studies.</p>
                </div>
                <br/>
                <div className="token-right-panel">
                    {/* Content for the right panel goes here */}
                    <img src={StudyBuddyLogo} width={"60px"} hight={"60px"}></img>
                    <h2>Buy Tokens</h2>
                    <Dropdown selectedTokenPackage={selectedToken} />
                    <hr/>
                    {
                        selectedOption ? 
                        <div className="profile-details">
                        <div>
                        <h3>Purchase:</h3><h4>{selectedOption}</h4>
                        </div>
                        <button className="confirm-button" onClick={handlePurchaseTokens}>
                        Confirm
                        </button>
                        </div>
                        :
                        <></>
                    }

                </div>
            </div>
        </div>
    )
}

export default BuyTokens;