import { configureStore } from '@reduxjs/toolkit';
import cart from './reducers/cart';

/**
 * инициализируем и возвращаем redux store. устанавливаем нужные редюсеры.
 */
export default configureStore({
  reducer: {
    cart: cart,
  },
});
