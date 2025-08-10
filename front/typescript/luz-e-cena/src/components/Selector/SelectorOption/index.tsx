import type React from "react";

interface SelectorOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  label: string;
  value: string;
}

const SelectorOption = ({ label, value, ...rest }: SelectorOptionProps) => {
  return (
    <option {...rest} value={value}>
      {label}
    </option>
  );
};

export default SelectorOption;
