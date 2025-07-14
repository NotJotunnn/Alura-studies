import styles from "./Footer.module.scss"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const iconeProps = {
  color: "white",
  size: 24
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div >
        <FaFacebook {...iconeProps} />
        <FaTwitter {...iconeProps} />
        <FaInstagram {...iconeProps} />
      </div>

      <span>
        Desenvolvido por Leandro na Alura
      </span>
    </footer>
  )
}