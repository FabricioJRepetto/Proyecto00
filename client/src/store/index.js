import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from '../slice-reducer/dogsSlice'
import tempsReducer from '../slice-reducer/filterSlice'
import filterReducer from '../slice-reducer/tempsSlice'

export default configureStore({
  reducer: {
    dogs: dogsReducer,
    temps: tempsReducer,
    filter: filterReducer
  }
})