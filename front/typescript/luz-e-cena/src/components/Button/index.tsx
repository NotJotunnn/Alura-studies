import type React from "react";

import styles from "./Button.module.css"
import classNames from "classnames";

type ButtonProps = {
  variant: "default" | "icon"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, variant = "default", ...rest }: ButtonProps) => {
  const classMap = {
    default: styles.default,
    icon: styles.icon
  }

  return <button {...rest} className={classNames(styles.button, classMap[variant])}>{children}</button>;
};

export default Button;
