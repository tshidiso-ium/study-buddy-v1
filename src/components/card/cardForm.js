import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../Style/cardform.scss'
import RingLoader from "react-spinners/RingLoader";
// import Typist from 'react-typist';
const currentYear = new Date().getFullYear();
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});
const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);

function CardForm(props) {
  const {
    amount,
    selectedCreditCard,
    onUpdateState,
    setIsCardFlipped,
    handleSubmitAction,
    children,
  } = props;
  const [errors, setErrors] = useState({
    id: '',
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
  });
  const [loading, setLoading] = useState(false)
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event) => {
    const { name, value } = event.target;
    if (isNaN(Number(value))) return; //only accept numbers
    onUpdateState(name, value);
  };

  const onCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const onCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const handleConfirmAction = (e) => {
    if(amount <= 20){
      alert("Donations must be R20 or more.");
      return;
    }
    // validate errors
    if (!isFormHasErrors()) {
      setLoading(true);
      handleSubmitAction();
    }

  };

  const isFormHasErrors = () => {
    const newErrors = {
      id: '',
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    };

    //first validate blank fields
    let isErrorFlag = false;
    Object.keys(newErrors).forEach(function (key) {
      const keyPair = key;
      const displayableKeyName = key.toLowerCase().replace('card', 'Card ');

      if (!selectedCreditCard[keyPair]) {
        newErrors[keyPair] = `${displayableKeyName} value required.`;
        isErrorFlag = true;
      } else {
        newErrors[keyPair] = '';
        isErrorFlag = false;
      }
    });

    if (isErrorFlag) {
      setErrors(newErrors);
      return isErrorFlag;
    }

    //if no blank field then check other validation
    if (selectedCreditCard['cardNumber'].length !== 16) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      isErrorFlag = true;
    }

    if (selectedCreditCard['cardCvv'].length < 3) {
      newErrors.cardCvv = 'Card number should be 3 - 4 digits long';
      isErrorFlag = true;
    }

    setErrors(newErrors);
    return isErrorFlag;
  };
  const DonationLoading = () => {
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
        <div className={`donation-loading-panel ${loading ? 'show' : ''}`}>
            <div className='donation-loading-container'> 
              <br/>
                <RingLoader  size={250} color={"#F9D9E6"} loading={loading} speedMultiplier={2.0}/>
              <br/>
              <p>Please wait...</p>
            </div>
        </div>
      </div>

    )
  }
  return (
    <div className="card-form">
      {
        loading &&
        DonationLoading()
      }
      <div className="card-list">{children}</div>
      <div className="card-form__inner">
        <div className="card-input">
          <label htmlFor="cardNumber" className="card-input__label">
            Card Number
          </label>
          <Form.Control
            type="text"
            name="cardNumber"
            className="card-input__input"
            autoComplete="off"
            onChange={handleFormChangeNumbers}
            maxLength={16}
            value={selectedCreditCard.cardNumber}
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardNumber}
          </Form.Control.Feedback>
        </div>

        <div className="card-input">
          <label htmlFor="cardName" className="card-input__label">
            Card Holder Name
          </label>
          <Form.Control
            type="text"
            className="card-input__input"
            autoComplete="off"
            name="cardHolder"
            onChange={handleFormChange}
            value={selectedCreditCard.cardHolder}
            isInvalid={!!errors.cardHolder}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardHolder}
          </Form.Control.Feedback>
        </div>

        <div className="card-form__row">
          <div className="card-form__col">
            <div className="card-form__group">
              <label htmlFor="cardMonth" className="card-input__label">
                Expiration Date
              </label>
              <Form.Control
                as="select"
                className="card-input__input -select"
                value={selectedCreditCard.cardMonth}
                name="cardMonth"
                onChange={handleFormChange}
                isInvalid={!!errors.cardMonth}
              >
                <option value="" disabled>
                  Month
                </option>

                {monthsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cardMonth}
              </Form.Control.Feedback>
              <Form.Control
                as="select"
                name="cardYear"
                className="card-input__input -select"
                value={selectedCreditCard.cardYear}
                onChange={handleFormChange}
                isInvalid={!!errors.cardYear}
              >
                <option value="" disabled>
                  Year
                </option>

                {yearsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cardYear}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label htmlFor="cardCvv" className="card-input__label">
                CVV (Security Code)
              </label>
              <Form.Control
                type="text"
                className="card-input__input"
                maxLength={4}
                autoComplete="off"
                name="cardCvv"
                value={selectedCreditCard.cardCvv}
                onChange={handleFormChangeNumbers}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                isInvalid={!!errors.cardCvv}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardCvv}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>
        <div className="card-form__row">
          <div className="card-form__col">
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={handleConfirmAction}>
                Confirm
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardForm;