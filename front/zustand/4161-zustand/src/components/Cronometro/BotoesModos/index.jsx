import styles from "./styles.module.css";

import BotaoModo from "./BotaoModo";
import { modoCronometro } from "../../../store";

export default function BotoesModos() {
  const modos = [modoCronometro.foco, modoCronometro.longo, modoCronometro.curto];

  return (
    <ul className={styles["cronometer-modes"]}>
      {modos.map((modo) => (
        <li key={modo.id}>
          <BotaoModo modoBotao={modo}>{modo.nome}</BotaoModo>
        </li>
      ))}
    </ul>
  );
}
