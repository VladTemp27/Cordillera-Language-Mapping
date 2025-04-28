import React from 'react';
import './Help.css'; // Import the CSS for styling

// Accept onClose prop to handle closing the modal
const Help = ({ onClose }) => {
  // Prevent clicks inside the modal content from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Modal backdrop (covers the whole screen)
    <div className="help-modal-backdrop" onClick={onClose}>
      {/* Modal content container */}
      <div className="help-modal-content" onClick={handleContentClick}>
        {/* Close button */}
        <button className="help-modal-close-btn" onClick={onClose} aria-label="Close help">
          &times; {/* Simple 'x' character for close */}
        </button>

        <h2>How to Use the Language Map</h2>

        <ol className="help-instructions">
          <li>
            <strong>Explore the Map:</strong> Click on any province within the Cordillera Administrative Region (CAR) on the interactive map to the right.
          </li>
          <li>
            <strong>View Details:</strong> When you select a province, it will be highlighted in yellow. The sidebar on the left will update to show detailed information, including:
            <ul>
              <li>General province details.</li>
              <li>A list of languages spoken there.</li>
              <li>The number of households speaking each language.</li>
              <li>The percentage of the province's population speaking each language.</li>
            </ul>
          </li>
          <li>
            <strong>Search:</strong> Use the search bar to quickly find information about a specific province or language.
          </li>
        </ol>
        <p className="help-note">Click anywhere outside this box or use the 'X' button to close this guide.</p>
      </div>
    </div>
  );
};

export default Help;
