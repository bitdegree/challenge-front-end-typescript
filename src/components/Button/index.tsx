import React from "react";

interface ButtonProps {
  disabled?: boolean;
  className?: string;
  value: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = (props: ButtonProps) => {
  const { disabled, className, type, value } = props;
  return (
    <div>
      <button type={type} className={className} disabled={disabled}>
        {value}
      </button>
    </div>
  );
};
export default Button;
