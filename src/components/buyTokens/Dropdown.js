import React, { useState } from 'react';
import '../../Style/BuyTokenDropDown.css'  // Make sure to create this CSS file

const Dropdown = ({selectedTokenPackage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [{text:'5,000 Tokens For R50.00', amount: 50}, {text:'8,500 Tokens For R80.00', amount: 80},{text: '10,000 Tokens for R90.00', amount: 90}];

  const handleOptionSelect = (option) => {
    console.log(option);
    setSelectedOption(option.text);
    selectedTokenPackage(option)
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown" >
        <div
          className={`selected-option ${isOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
          tabIndex="0"
        >
          {selectedOption || 'Select an Option'}
        </div>
        {isOpen && (
          <div className="options">
            {options.map((option) => (
              <div
                key={option.text}
                className={`option ${selectedOption === option.text ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;