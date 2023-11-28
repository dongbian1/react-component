import React from "react";
import "./style/button.scss";

export interface ButtonProps {
  /**
   * 这是111
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * 这是一个按钮
 */
const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor = "#1ea7fd",
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={{ backgroundColor }}
      {...props}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

export default Button;
