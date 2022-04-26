import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filteredList',
  initialState: {
    value: []
  },
  reducers: {
    search: (state, action) => {
      state.value = action.payload;
    },
    filter: (state, action) => {
      const {        
        temperament,
        from,
        order,
        asc
      } = action.payload
    },
  }
}); 

export const { filter } = filterSlice.actions;

export default filterSlice.reducer;