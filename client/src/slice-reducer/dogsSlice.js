import { createSlice } from '@reduxjs/toolkit'

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState: {
    main: [],
    filtered: [],
    temps: [],
    filters: {name: false, source: 2, temps: []},
    page: 1,
    asc: true,
    firstLoad: true,
  },
  reducers: {
//? estados
    loadDogs: (state, action) => {
       return{
        ...state,
        main: action.payload
      }  
    },
    loadTemps: (state, action) => {      
       return{
        ...state,
        temps: action.payload
      }
    },
    loadFiltered: (state, action) =>{
      return{
        ...state,
        filtered: action.payload
      }
    },

//? filtros
    searchByName: (state, action) => {
      state.filtered = [...state.main].filter(dog => (
        dog.name.toLowerCase().includes(action.payload)
      ))
    },
    filterSource: (state, {payload}) => {
      if (payload === 'all') {
        state.filtered = [...state.main]
      } else {
      state.filtered = [...state.main].filter(e => typeof e.id === payload)
      }        
    },
    filterTemperament: (state, action) => {
        state.filtered = [...state.filtered].filter(dog => (
          dog.temperaments?.includes(action.payload)
        ))
    },
    orderBy: ( state, { payload }) => {
      if (state.asc) { //Ascendente
          if (payload === 'name') { //alfabetico
            state.filtered = state.filtered.slice().sort((a, b) => {
              return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0
            })
          } else { // numeros
            state.filtered = state.filtered.slice().sort((a, b) => {
              return parseInt(a[payload].split(' - ')[0]) - parseInt(b[payload].split(' - ')[0]);
            })
          }
      } else { //Descendente
          if (payload === 'name') { //alfabetico
            state.filtered = state.filtered.slice().sort((a, b) => {
              return (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0
            })
          } else { // numeros
            state.filtered = state.filtered.slice().sort((a, b) => {
              return parseInt(b[payload].split(' - ')[0]) - parseInt(a[payload].split(' - ')[0]);
            })
          }
      }
    },
    setAsc: (state) => {
      state.asc ? state.asc = false : state.asc = true
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
    reload: (state) => {
      state.filtered = [...state.main]
    },
  }
}); 

export const { loadDogs, loadTemps, loadFiltered, searchByName, orderBy, setAsc, updateFilters, filterSource, filterTemperament, pageIncrease, pageDecrease, pageExact, loaded, reload } = dogsSlice.actions;

export default dogsSlice.reducer;