import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";

export const carregarItens = createAction("itens/carregarItens")
export const carregarItem = createAction("itens/carregarItem")

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState: [],
  reducers: {
    mudarFavorito: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state[index].favorito = !state[index].favorito;
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
    adicionarItens: (state, { payload }) => {
      state.push(...payload)
    }
  },
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem, adicionarItens } =
  itensSlice.actions;

export default itensSlice.reducer;
