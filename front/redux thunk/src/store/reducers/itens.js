import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";

const { toast } = createStandaloneToast();

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarItens.fulfilled, (state, { payload }) => {
        toast({
          title: "Success",
          description: "Itens carregados com sucesso!",
          duration: 2000,
          isClosable: true,
          status: "success",
        });
        return payload;
      })
      .addCase(buscarItens.pending, (state, { payload }) => {
        toast({
          title: "Loading",
          description: "Carregando itens!",
          duration: 2000,
          isClosable: true,
          status: "loading",
        });
      })
      .addCase(buscarItens.rejected, (state, { payload }) => {
        toast({
          title: "Success",
          description: "Erro ao buscar por itens.",
          duration: 2000,
          isClosable: true,
          status: "error",
        });
      });
  },
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem } =
  itensSlice.actions;

export default itensSlice.reducer;
