import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: null,
  players: [],
  language: "en",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTeam(state, action) {
      state.team = action.payload;
    },
    setPlayers(state, action) {
      state.players = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setTeam, setPlayers, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;
