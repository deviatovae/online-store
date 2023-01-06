import { configureStore } from '@reduxjs/toolkit';
import cart = require('./reducers/cart');
import {saveState} from "./reducers/storeDb";
import promocode from "./reducers/promocode";

/**
 * инициализируем и возвращаем redux store. устанавливаем нужные редюсеры.
 */
const store = configureStore({
  reducer: {
    cart: cart.reducer,
    promocode: promocode,
  },
});

saveState(store)

export default store
