const { default: instance } = require("common/config/api");

const cartoesService = {
  buscarPorIdUsuario: async (userId) => {
    const response = await instance.get(`/cartoes?usuarioId=${userId}`);

    return response.data;
  },
};

export default cartoesService;
