import {configureStore} from '@reduxjs/toolkit';
import {saveState} from "./reducers/storeDb";
import promocode from "./reducers/promocode";
import cart = require('./reducers/cart');

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

const subscribers: Map<Function, Function> = new Map<Function, Function>()
export function subscribe(callback: Function, ...args: string[]): void {
  const existedUnsubscriber = subscribers.get(callback);
  if (existedUnsubscriber !== undefined) {
    existedUnsubscriber();
  }

  subscribers.set(callback, store.subscribe(() => {
    callback(...args);
  }))
  callback(...args);
}

export default store
