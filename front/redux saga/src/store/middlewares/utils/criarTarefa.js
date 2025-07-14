import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default async function criarTarefa({
  fork,
  dispatch,
  action,
  buscar,
  textoCarregando,
  textoSucesso,
  textoErro,
}) {
  toast({
    title: "Loading",
    description: textoCarregando,
    duration: 1000,
    isClosable: true,
    status: "loading",
  });

  const task = fork(async (api) => {
    await api.delay(1000);
    return await buscar();
  });

  const response = await task.result;

  if (response.status === "ok") {
    dispatch(action(response.value));
    toast({
      title: "Success",
      description: textoSucesso,
      duration: 1000,
      isClosable: true,
      status: "success",
    });
  } else if (
    response.status === "cancelled" ||
    response.status === "rejected"
  ) {
    toast({
      title: "Error",
      description: textoErro,
      duration: 1000,
      isClosable: true,
      status: "error",
    });
  }

  return response
}
