import { createSlice } from '@reduxjs/toolkit'

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState: {
    main: [],
    filtered: [],
    temps: [],
    filters: {name: false, source: 2, order: 'N', asc: true, temps: []},
    page: 1,
    firstLoad: true,
  },
  reducers: {
//? estados
    loadDogs: (state, action) => {
      state.main = action.payload;
      //state.main = state.main.concat(action.payload);
    },
    loadTemps: (state, action) => {
      state.temps = action.payload;
    },
    loadFiltered: (state, action) =>{
      state.filtered = action.payload
    },


//? filtros

    searchByName: (state, action) => {
      state.filtered = action.payload;
    },
    filterSource: (state, {payload}) => {
      if (payload === 'all') {
        state.filtered = [...state.main]
      } else {
      state.filtered = [...state.main].filter(e => typeof e.id === payload)
      }        
    },



    updateFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload}
    },

//? paginacion
    pageIncrease: (state, action) => {
      if (state.page < action.payload) state.page += 1;
    },
    pageDecrease: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    pageExact: (state, action) => {
      state.page = action.payload;
    },

//? extra
    loaded: (state) => {
      state.firstLoad = false;
    },
    reload: () => { },
  }
}); 

export const { loadDogs, loadTemps, loadFiltered, searchByName, updateFilters, filterSource, pageIncrease, pageDecrease, pageExact, loaded } = dogsSlice.actions;

export default dogsSlice.reducer;