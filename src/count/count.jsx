import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation eslint stuff
import "./count.css";

function Count({ count, onIncrement, onDecrement }) {
  return (
    <div className="count-container">
      <button className="count-button top-left" onClick={onIncrement}>
        +
      </button>

      <div className="count-display">{count}</div>

      <button className="count-button top-right" onClick={onDecrement}>
        -
      </button>
    </div>
  );
}
// Define PropTypes for the component, eslint stuff
Count.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};
export default Count;
