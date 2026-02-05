import React, { Fragment, useCallback, useState } from 'react';
import Card from './card';
import CardForm from './cardForm';


const initialState = {
  id: '',
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
};

export default function AddCard(donationAmount) {
  const [state, setState] = useState(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  console.log(donationAmount.donationAmount);
  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || '',
      });
    },
    [state],
  );

  async function handleSubmitAction () {
    console.log("Card Details Looking good!")
    try{
        const amount = donationAmount.donationAmount
        const res = await fetch(`https://us-central1-study-buddy-bceaf.cloudfunctions.net/app/yoco/make_donation?donationAmount=${amount}`,{
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
    
          }
        });
        const redirectUrl = await res.json()
        console.log(redirectUrl.redirect);
        window.location.href = redirectUrl.redirect; 
    }
    catch(err){
      throw new Error(err);
    }
  }



  
  return (
    <div>
      <Fragment>
        <div className="add-card-content">
          <div className="wrapper">
            <CardForm
              amount={donationAmount.donationAmount} 
              selectedCreditCard={state}
              onUpdateState={updateStateValues}
              setIsCardFlipped={setIsCardFlipped}
              handleSubmitAction={handleSubmitAction}
            >
              <Card
                cardNumber={state.cardNumber}
                cardHolder={state.cardHolder}
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                cardCvv={state.cardCvv}
                isCardFlipped={isCardFlipped}
              ></Card>
            </CardForm>
          </div>
        </div>
      </Fragment>
    </div>
  );
}