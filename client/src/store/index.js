import { configureStore } from '@reduxjs/toolkit'
import dogsReducer from '../slice-reducer/dogsSlice'

export default configureStore({
  reducer: {
    dogs: dogsReducer    
  }
})