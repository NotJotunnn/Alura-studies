import { useCronometroStore } from "../../../../store";

import styles from "./styles.module.css";

export default function BotaoModo({ children, modoBotao }) {
  const modoCronometro = useCronometroStore((state) => state.cronometro);
  const setCronometro = useCronometroStore((state) => state.setCronometro);

  const ativo = modoBotao.id === modoCronometro.id;

  return (
    <button
      onClick={() => setCronometro(modoBotao)}
      className={`
        ${styles["cronometer-modes__button"]}
        ${ativo && styles["cronometer-modes__button--active"]}
      `}
    >
      {children}
    </button>
  );
}
