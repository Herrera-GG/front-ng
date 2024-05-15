import React from "react";

function Button({ action, disabled, label }) {
  return (
    <button
      className={`p-2 border rounded-lg`}
      onClick={action}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  action: undefined,
  disabled: false,
  label: "Texto de ejemplo",
};

export default Button;
