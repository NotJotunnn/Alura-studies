import type React from "react";

import styles from "./SelectorGroup.module.css";

interface SelectorGroupProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

const SelectorGroup = ({ children, icon, ...rest }: SelectorGroupProps) => {
  return (
    <div className={styles.container}>
      {icon && <div className={styles.icone}>{icon}</div>}
      <select className={styles.selector} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default SelectorGroup;
