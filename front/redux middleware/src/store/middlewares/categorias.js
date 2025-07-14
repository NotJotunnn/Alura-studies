// import { createStandaloneToast } from "@chakra-ui/toast";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import {
  adicionarTodasCategorias,
  adicionarUmaCategoria,
  carregarCategoria,
  carregarCategorias,
} from "store/reducers/categorias";
import criarTarefa from "./utils/criarTarefa";

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: carregarCategorias,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const response = await criarTarefa({
      fork,
      dispatch,
      action: adicionarTodasCategorias,
      buscar: categoriasService.buscar,
      textoCarregando: "Carregando categorias!",
      textoSucesso: "Categorias carregadas com sucesso!",
      textoErro: "Erro na busca por categorias.",
    });

    if (response.status === "ok") unsubscribe();
  },
});

listener.startListening({
  actionCreator: carregarCategoria,
  effect: async (action, { dispatch, fork, unsubscribe, getState }) => {
    const { categorias } = getState();

    const categoriaCarregada = categorias.some(
      (categoria) => categoria.id === action.payload
    );

    if (categoriaCarregada) return;

    const response = await criarTarefa({
      fork,
      dispatch,
      action: adicionarUmaCategoria,
      buscar: () => categoriasService.buscarPorNome(action.payload),
      textoCarregando: "Carregando categorias!",
      textoSucesso: "Categorias carregadas com sucesso!",
      textoErro: "Erro na busca por categorias.",
    });

    if (response.status === "ok") unsubscribe();
  },
});
