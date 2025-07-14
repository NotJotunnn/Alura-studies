import { createStandaloneToast } from "@chakra-ui/toast";

const { createSlice } = require("@reduxjs/toolkit");

const { toast } = createStandaloneToast();

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: [],
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.some((item) => item.id === payload);

      if (!temItem)
        return [
          ...state,
          {
            id: payload,
            quantidade: 1,
          },
        ];

      return state.filter((item) => item.id !== payload);
    },
    mudarQuantidade: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      state[index].quantidade += payload.quantidade;
    },
    resetarCarrinho: (state) => {
      toast({
        title: "Success",
        description: "Compra realizada com sucesso!",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      return [];
    },
  },
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;
