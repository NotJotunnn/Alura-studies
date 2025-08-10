import { call, delay, put, takeLatest } from "redux-saga/effects"
import { adicionarTodasCategorias, carregarCategorias } from "store/reducers/categorias"
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriasService from "services/categorias";

const { toast } = createStandaloneToast();

function* observarCategorias() {
  toast({
    title: "Loading",
    description: "Carregando categorias!",
    duration: 1000,
    isClosable: true,
    status: "loading",
  });

  try {
    toast({
      title: "Success",
      description: "Categorias carregadas com sucesso!",
      duration: 1000,
      isClosable: true,
      status: "success",
    });

    const categorias = yield call(categoriasService.buscar)

    yield delay(1000)

    yield put(adicionarTodasCategorias(categorias))
  } catch (e) {
    toast({
      title: "Error",
      description: "Erro na busca por categorias.",
      duration: 1000,
      isClosable: true,
      status: "error",
    });
  }
}

export function* categoriasSaga() {
  const task = yield takeLatest(carregarCategorias, observarCategorias)

  yield takeLatest(adicionarTodasCategorias, () => task.cancel())
}