import React from 'react';


function RadioButton({ label, selected, onSelect }) {
  return (
    <div 
      className={`radio-button ${selected ? 'selected' : ''}`} 
      onClick={onSelect}
    >
      <label>{label}</label>
    </div>
  );
}

export default RadioButton;
