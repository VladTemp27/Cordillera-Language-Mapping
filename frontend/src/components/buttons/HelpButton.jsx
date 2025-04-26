import React from 'react';
import helpIcon from '../../assets/question-small.svg';
import '../LanguageMapping/LanguageMapping.css';

const HelpButton = ({ onClick }) => {
    return (
      <button className="help-button" onClick={onClick} aria-label="Help">
        <img src={helpIcon} alt="Help" />
      </button>
    );
  };

export default HelpButton
