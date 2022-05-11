import { createSlice } from '@reduxjs/toolkit'

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState: {
    main: [],
    filtered: [],
    temps: [],
    filters: {source: 'all', order: 'name'},
    asc: true,
    page: 1,
    dogsPerPage: 16,
    nav: true,
    firstLoad: true,
  },
  reducers: {
//? estados
    loadDogs: (state, action) => {
       state.main = action.payload
    },
    loadTemps: (state, action) => {
        state.temps = action.payload
    },
    loadFiltered: (state, action) =>{
        state.filtered = action.payload;      
    //   return{
    //     ...state,
    //     filtered: action.payload
    //   }
    },

//? filtros
    searchByName: (state, action) => {
        state.filtered = [...state.filtered].filter(dog => (
            dog.name.toLowerCase().includes(action.payload.toLowerCase())
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
        let aux = [];
            aux = state.filtered.filter((dog) => (
            dog.temperaments?.includes(action.payload)
            ))
        state.filtered = aux;        
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
    // filters: {source: 'all', order: 'name'}
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
    loaded: (state, action) => {
        state.firstLoad = action.payload;
    },
    reloadFiltered: (state) => {
        state.filtered = [...state.main]
    },
    viewNav: (state, action) => {
        state.nav = action.payload;
    },
    dogsPerPage: (state, action) => {
        state.dogsPerPage = action.payload;
    }
  }
}); 

export const { loadDogs, loadTemps, loadFiltered, loadFavList, deleteFav, searchByName, orderBy, setAsc, updateFilters, filterSource, filterTemperament, pageIncrease, pageDecrease, pageExact, loaded, reloadFiltered, viewNav, dogsPerPage } = dogsSlice.actions;

export default dogsSlice.reducer;