import React, { useState, useEffect } from 'react';
import AddCard from './card/addCard';
import '../Style/Donate.css'

const Donate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDonationAmount, setShowDonationAmount] = useState(true);
    const [fontSize, setFontSize] = useState(20);
    const [inputValue, setInputValue] = useState('');
    const [displayedValue, setDisplayedValue] = useState('');
  
    useEffect( () => {
        setIsOpen(true)
      }, []);

    const handleAmountSubmit = (e) => {
        e.preventDefault();
        if (parseInt(inputValue) < 20) {
            alert('Amount must be at least R20 or more');
            return;
        }
        else{
            setShowDonationAmount(false);
        }
        // Handle submission logic here
        console.log('Submitted value:', inputValue);
    };

    const handleAmountInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setDisplayedValue(value);
    };
    
    const DonationAmount = () => {

    return (
        <div 
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: "100%",
                height: "100%"
            }}
        >
            <div className={`amount-panel ${showDonationAmount ? 'show' : ''}`}
            >

                    <form onSubmit={handleAmountSubmit}>
                        <div style={{   
                            width: '100%',
                            display: "flex", 
                            justifyContent:'end',
                            color: "gray"
                        }}
                        >
                            <p 
                                style={{
                                    cursor: 'pointer',
                                    fontSize: fontSize,
                                }}
                                onMouseEnter={() => {
                                    setFontSize(25)
                                }}
                                onMouseLeave={() => {
                                    setFontSize(21)
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowDonationAmount(false);
                                    setDisplayedValue(0);
                                    setInputValue(0);
                                }}
                            >
                                x
                            </p>
                        </div>
                        <label className="input-label" htmlFor="numberInput">
                            Enter Donation Amount (min: R20):
                        </label>
                        <input
                            className="input-field"
                            type="number"
                            id="numberInput"
                            name="numberInput"
                            value={inputValue}
                            onChange={handleAmountInputChange}
                            min="20"
                            required/>
                        <br/>
                        <label className="input-label" htmlFor="displayNumber">
                            You entered:
                        </label>
                        <p id="displayNumber">R{displayedValue}</p>
                        <br />
                        <button className="confirm-button" type="submit">
                            Confirm
                        </button>
                    </form>
            </div>
        </div>

    );
    }
  return (
    <div>
        {
            showDonationAmount &&
            DonationAmount()
        }
        <div className={`donation-page ${isOpen ? 'open' : ''}`}>
            <div className="donation-info">
                <h2>Why Donate?</h2>
                <p>
                    We rely on your generous donations to keep our website ad-free
                    and provide high-quality content. Your support helps us continue
                    delivering a great user experience.
                </p>
            </div>
            <div className="donation-form">
            <h1 
                style={{
                    cursor: "pointer"
                }}
                onClick={() =>{ setShowDonationAmount(true)}}
            > 
                Donate R{inputValue}
            </h1>
                <AddCard donationAmount = {inputValue}/>
            </div>
        </div>
    </div>
    );
};
    
export default Donate;

