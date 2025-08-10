const { default: instance } = require("common/config/api");

const usuarioService = {
  buscarPorId: async (id) => {
    const response = await instance.get(`/usuarios/${id}`);

    return response.data;
  },
};

export default usuarioService;
