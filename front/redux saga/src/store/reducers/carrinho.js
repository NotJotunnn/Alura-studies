import { createStandaloneToast } from "@chakra-ui/toast";

const { createSlice, createAction } = require("@reduxjs/toolkit");

const { toast } = createStandaloneToast();

export const carregarPagamento = createAction("carrinho/carregarPagamento");
export const finalizarPagamento = createAction("carrinho/finalizarPagamento");

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: {
    data: [],
    total: 0,
  },
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.data.some((item) => item.id === payload);

      if (!temItem)
        return {
          ...state,
          data: [
            ...state.data,
            {
              id: payload,
              quantidade: 1,
            },
          ],
        };

      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== payload)],
      };
    },
    mudarQuantidade: (state, { payload }) => {
      const index = state.data.findIndex((item) => item.id === payload.id);
      state.data[index].quantidade += payload.quantidade;
    },
    resetarCarrinho: (state) => {
      return {
        data: [],
        total: 0,
      };
    },
    mudarTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho, mudarTotal } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;

Utilizando a arquitetura Saga com Redux Saga, Programação Orientada a Objetos, Criando API Rest com autenticação, perfis de usuários e permissões, Criptografia e tokens JWT , Implementando testes em uma API Rest, Autenticação, Passport e OAuth 2.0, Avançando em Middlewares com Listener Middleware , Entendendo Middlewares com Redux Thunk, Gerenciamento de estados globais com Redux, Mutabilidade x Imutabilidade no Redux Toolkit com Immer, JavaScript Algorithms and Data Structures, Testes unitários e de integração, Graduação em Ciências da computação, Responsive Web Design, Especializar, Certificado de participação no desenvolvimento de software, Conectar, Fundamentar, Sistema Eletrônico de Informações - SEI! USAR, Cambridge English Level 1 Certificate in ESOL international (First)