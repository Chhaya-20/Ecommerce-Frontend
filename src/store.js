import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './reducers/CartSlice'
import UserReducer from './reducers/UserSlice'
import ProductSlice from './reducers/Product'

export const store = configureStore({
  reducer: {
    Cart: CartReducer,
    User: UserReducer,
    Product:ProductSlice
  },
})