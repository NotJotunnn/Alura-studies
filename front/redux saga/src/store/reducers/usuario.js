import { createSlice } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {},
  reducers: {
    adicionarUsuarios: (state, { payload }) => {
      return payload;
    },
  },
});

export const { adicionarUsuarios } = usuarioSlice.actions;
export default usuarioSlice.reducer;
