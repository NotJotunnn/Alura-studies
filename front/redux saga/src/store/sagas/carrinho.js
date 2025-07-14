import {
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import bandeirasService from "services/bandeiras";
import cartoesService from "services/cartoes";
import usuarioService from "services/usuarios";
import {
  carregarPagamento,
  finalizarPagamento,
  mudarCarrinho,
  mudarQuantidade,
  mudarTotal,
  resetarCarrinho,
} from "store/reducers/carrinho";
import { adicionarUsuarios } from "store/reducers/usuario";
import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

const usuarioLogado = 2;

function* carregarPagamentoSaga() {
  try {
    const usuario = yield call(usuarioService.buscarPorId, usuarioLogado);

    const cartoes = yield call(
      cartoesService.buscarPorIdUsuario,
      usuarioLogado
    );

    const bandeiraIds = cartoes.map((cartao) => cartao.bandeiraId);

    const bandeiras = yield call(bandeirasService.buscarPorId, bandeiraIds);

    const cartoesComBandeiras = cartoes.map((cartao) => {
      const bandeiraDoCartao = bandeiras.find(
        (bandeira) => Number(bandeira.id) === cartao.bandeiraId
      );

      return {
        ...cartao,
        taxa: bandeiraDoCartao.taxa,
        bandeira: bandeiraDoCartao.nome,
      };
    });

    yield put(adicionarUsuarios({ ...usuario, cartoes: cartoesComBandeiras }));
  } catch (e) {}
}

function* calcularTotal() {
  yield delay(500);

  const state = yield select();

  const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
    const item = state.itens.find((item) => item.id === itemNoCarrinho.id);

    return total + item.preco * itemNoCarrinho.quantidade;
  }, 0);

  yield put(mudarTotal(total));
}

function* finalizarPagamentoSaga({ payload }) {
  try {
    const { valorTotal, formaDePagamento } = payload;
  
    if (valorTotal > formaDePagamento.saldo) {
      return yield toast({
        title: "Error",
        description: "Saldo insuficiente",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } else {
      yield toast({
        title: "Success",
        description: "Compra realizada com sucesso",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      return yield put(resetarCarrinho());
    }
  } catch (e) {
    console.error(e)
  }
}

export function* carrinhoSaga() {
  yield takeLatest(carregarPagamento, carregarPagamentoSaga);
  yield takeEvery([mudarQuantidade, mudarCarrinho, resetarCarrinho], calcularTotal);
  yield takeLatest(finalizarPagamento, finalizarPagamentoSaga);
}
