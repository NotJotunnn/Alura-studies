import styles from "./styles.module.css";

import play_arrowImg from "/src/assets/old/imgs/play_arrow.png";
import pauseImg from "/src/assets/old/imgs/pause.png";

import audioPlaySom from "/src/assets/old/sons/play.wav";
import audioPauseSom from "/src/assets/old/sons/pause.mp3";

import { useCronometroStore } from "../../../store";

export default function BotaoCronometro() {
  const intervaloId = useCronometroStore((state) => state.intervaloId);
  const iniciarCronometro = useCronometroStore((state) => state.iniciarCronometro);
  const pausarCronometro = useCronometroStore((state) => state.pausarCronometro);

  const audioPlay = new Audio(audioPlaySom)
  const audioPause = new Audio(audioPauseSom)

  const texto = intervaloId ? "Pause" : "Começar";
  const icone = intervaloId ? pauseImg : play_arrowImg;

  function pausarOuIniciar() {
    if(intervaloId) {
      audioPause.play()
      pausarCronometro();
    }
    else {
      audioPlay.play()
      iniciarCronometro()
    }
  }

  return (
    <div className={styles["cronometer__primary-button-wrapper"]}>
      <button onClick={pausarOuIniciar} className={styles["cronometer__primary-button"]}>
        <img className={styles["cronometer__primary-button-icon"]} src={icone} alt="" />
        <span>{texto}</span>
      </button>
    </div>
  );
}
