import { configureStore } from '@reduxjs/toolkit';
import cart from './reducers/cart';
import {saveState} from "./reducers/storeDb";

/**
 * инициализируем и возвращаем redux store. устанавливаем нужные редюсеры.
 */
const store = configureStore({
  reducer: {
    cart: cart,
  },
});

saveState(store)

export default store
