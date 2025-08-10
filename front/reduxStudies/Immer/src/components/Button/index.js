import styles from "./Button.module.scss"

export default function Button({ children, type, onClick }) {
  return (
    <button type={type || "button"} className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}