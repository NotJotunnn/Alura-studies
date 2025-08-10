import instance from "common/config/api";

const categoriasService = {
  buscar: async () => {
    const response = await instance.get("/categorias");

    return response.data;
  },
};

export default categoriasService;
