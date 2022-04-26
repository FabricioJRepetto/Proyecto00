import { createSlice } from '@reduxjs/toolkit'

export const tempsSlice = createSlice({
  name: 'temperaments',
  initialState: {
    value: []
  },
  reducers: {
    loadTemps: (state, action) => {
      state.value.concat(action.payload)
    },
  }
}); 

export const { loadTemps } = tempsSlice.actions;

export default tempsSlice.reducer;