import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
    addUser: (state, action) => {
      state.push({ ...action.payload, id: state.length ? state[state.length - 1].id + 1 : 1 });
    },
    updateUser: (state, action) => {
      const idx = state.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteUser: (state, action) => {
      return state.filter(u => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;