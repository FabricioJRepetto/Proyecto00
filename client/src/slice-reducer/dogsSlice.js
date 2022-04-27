import { createSlice } from '@reduxjs/toolkit'

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState: {
    main: [],
    filtered: [],
    temps: [],
    page: 1
  },
  reducers: {
    loadDogs: (state, action) => {
      state.main = state.main.concat(action.payload);
    },
    loadTemps: (state, action) => {
      state.value.concat(action.payload)
    },
    searchByName: (state, action) => {
      state.filtered = state.filtered.concat(action.payload)
    },
    pageIncrease: (state, action) => {
      if (state.page < action.payload) state.page += 1;
    },
    pageDecrease: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    pageExact: (state, action) => {
      state.page = action.payload;
    },
  }
}); 

export const { loadDogs, loadTemps, searchByName, pageIncrease, pageDecrease, pageExact } = dogsSlice.actions;

export default dogsSlice.reducer;