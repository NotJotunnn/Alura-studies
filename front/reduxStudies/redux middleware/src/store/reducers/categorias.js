import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";

export const carregarCategorias = createAction("categorias/carregarCategorias");
export const carregarCategoria = createAction("categorias/carregarCategoria");

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: [],
  reducers: {
    adicionarTodasCategorias: (state, { payload }) => {
      return payload;
    },
    adicionarUmaCategoria: (state, { payload }) => {
      state.push(payload)
    },
  },
});

export const { adicionarTodasCategorias, adicionarUmaCategoria } = categoriasSlice.actions;
export default categoriasSlice.reducer;
