import React from 'react';
import PropTypes from 'prop-types';

function FormButton({ onClick, children, type = 'button', className }) {
  return (
    <button onClick={onClick} type={type} className={`btn ${className}`}>
      {children}
    </button>
  );
}
FormButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default FormButton;
