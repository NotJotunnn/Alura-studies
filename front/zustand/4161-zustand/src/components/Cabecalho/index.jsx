import styles from "./styles.module.css";
import logoImg from "/src/assets/old/imgs/logo.png";

import focoImg from "/src/assets/old/imgs/foco.png";
import descansoCurtoImg from "/src/assets/old/imgs/descanso-curto.png";
import descansoLongoImg from "/src/assets/old/imgs/descanso-longo.png";

import { useCronometroStore } from "../../store";

export default function Cabecalho() {
  const cronometro = useCronometroStore(state => state.cronometro)

  const [primeiroTexto, segundoTexto] = cronometro.frase;

  const image = cronometro.nome.includes("Descanso") ? cronometro.nome.includes("Curto") ? descansoCurtoImg : descansoLongoImg : focoImg

  return (
    <header className="header">
      <figure className={styles["header__logo-figure"]}>
        <img src={logoImg} alt="Logotipo do Fokus" />
      </figure>

      <section className={styles["header__section-banner-container"]}>
        <h1 className={styles["header__title"]}>
          {primeiroTexto} <strong className={styles["header__title-strong"]}>{segundoTexto}</strong>
        </h1>

        <figure className={styles["header__image-figure"]}>
          <img className={styles["header__image"]} src={image} alt="" />
        </figure>
      </section>
    </header>
  );
}
