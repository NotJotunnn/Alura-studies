import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";

const { toast } = createStandaloneToast()

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: [],
  extraReducers: (builder) => {
    builder
      .addCase(
        buscarCategorias.fulfilled,
        (state, { payload }) => {
          toast({
            title: "Success",
            description: "Categorias carregadas com sucesso!",
            duration: 2000,
            isClosable: true,
            status: "success"
          })
          return payload;
        }
      )
      .addCase(
        buscarCategorias.pending,
        (state, { payload }) => {
          toast({
            title: "Loading",
            description: "Carregando categorias!",
            duration: 2000,
            isClosable: true,
            status: "loading"
          })
        }
      )
      .addCase(
        buscarCategorias.rejected,
        (state, { payload }) => {
          toast({
            title: "Error",
            description: "Erro na busca por categorias.",
            duration: 2000,
            isClosable: true,
            status: "error"
          })
        }
      );
  },
});

export default categoriasSlice.reducer;
