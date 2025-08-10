import Image from "next/image";
import styles from  "./Aside.module.css"

import logo from "./logo.png"
import Link from "next/link";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <Link href={"/"}>
        <Image width={128} src={logo} alt="Logo da Code Connect" />
      </Link>
    </aside>
  );
}
 
export default Aside;