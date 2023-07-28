import { configureStore } from '@reduxjs/toolkit'

import homeSliceReducer, {homeSlice, } from'./homeSlice';





export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
  },
})