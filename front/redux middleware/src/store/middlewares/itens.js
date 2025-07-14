import { createListenerMiddleware } from "@reduxjs/toolkit";
import itensService from "services/itens";
import {
  carregarItens,
  adicionarItens,
  carregarItem,
} from "store/reducers/itens";
import criarTarefa from "./utils/criarTarefa";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarItens,
  effect: async (action, { dispatch, unsubscribe, fork }) => {
    const response = await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      buscar: itensService.buscar,
      textoCarregando: "Carregando itens",
      textoSucesso: "Itens carregados com sucesso",
      textoErro: "Erro ao carregar os itens",
    });

    if (response.status === "ok") unsubscribe();
  },
});

listener.startListening({
  actionCreator: carregarItem,
  effect: async (action, { dispatch, fork, getState }) => {
    const { itens } = getState();

    const itensCarregados = itens.some(
      (item) => item.categoria === action.payload
    );

    if (itensCarregados) return;

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      buscar: () => itensService.buscarUmNome(action.payload),
      textoCarregando: "Carregando itens",
      textoSucesso: "Itens carregados com sucesso",
      textoErro: "Erro ao carregar os itens",
    });
  },
});
