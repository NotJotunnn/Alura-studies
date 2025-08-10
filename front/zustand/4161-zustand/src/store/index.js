import { create } from "zustand";

import audioTempoFinalizado from "../assets/old/sons/beep.mp3"

const audioTempoAcabou = new Audio(audioTempoFinalizado)

export const modoCronometro = {
  foco: {
    id: "foco",
    nome: "Foco",
    frase: ["Otimize sua produtividade,", "mergulhe no que importa."],
    tempoInicialEmSegundos: 30,
  },
  curto: {
    id: "descanso-curto",
    nome: "Descanso Curto",
    frase: ["Que tal dar uma respirada?", "Faça uma pausa curta."],
    tempoInicialEmSegundos: 5,
  },
  longo: {
    id: "descanso-longo",
    nome: "Descanso Longo",
    frase: ["Hora de voltar a superfície.", "Faça uma pausa longa."],
    tempoInicialEmSegundos: 15,
  },
};

export const useCronometroStore = create((set) => ({
  cronometro: modoCronometro.foco,
  tempoEmSegundos: modoCronometro.foco.tempoInicialEmSegundos,
  intervaloId: null,

  iniciarCronometro: () => {
    const novoId = setInterval(contagemRegressiva, 1000);

    set({ intervaloId: novoId });
  },

  pausarCronometro: () => {
    set((state) => {
      clearInterval(state.intervaloId);

      return { intervaloId: null };
    });
  },

  setCronometro: (novoCronometro) => {
    set({
      cronometro: novoCronometro,
      tempoEmSegundos: novoCronometro.tempoInicialEmSegundos,
    });
  },
}));

function contagemRegressiva() {
  const tempoAtual = useCronometroStore.getState().tempoEmSegundos;
  const pausarCronometro = useCronometroStore.getState().pausarCronometro;

  if (tempoAtual > 0) {
    decrementarTempo();
  } else {
    audioTempoAcabou.play()
    
    pausarCronometro();
    redefinirTempo();
  }
}

function decrementarTempo() {
  useCronometroStore.setState((state) => ({ tempoEmSegundos: state.tempoEmSegundos - 1 }));
}

function redefinirTempo() {
  useCronometroStore.setState((state) => ({
    tempoEmSegundos: state.cronometro.tempoInicialEmSegundos,
  }));
}
