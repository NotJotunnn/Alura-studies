import instance from "common/config/api";

const itensService = {
  buscar: async () => {
    const response = await instance.get("/itens");

    return response.data;
  },
  buscarUmNome: async (payload) => {
    const response = await instance.get(`/itens?categoria=${payload}`);

    return response.data
  }
};

export default itensService;
