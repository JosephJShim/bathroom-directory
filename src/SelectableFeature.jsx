import React, { useState } from 'react';
import './global.css';

function SelectableFeature({ feature, onSelect }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
        onSelect(feature, !isSelected);
    };

    return (
        <div className={`selectable-feature ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            <div className="checkbox"></div>
            <label>{feature}</label>
        </div>
    );
}

export default SelectableFeature;
