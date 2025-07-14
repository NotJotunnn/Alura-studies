import styles from "./Button.module.scss"

export default function Button({ children, type, onClick, ...otherProps }) {
  return (
    <button type={type || "button"} {...otherProps} className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}