import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import {CartItemType} from "../../types/cartItemType";
import {loadState} from "./storeDb";
import store from "../store";

/**
 * начальное состояние стейта
 */
let initialState: CartItemType[] = loadState('cart');

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * добавляет продукт в стейт корзины, при повторном добавлении увеличивает quantity
     */
    addProductToCart: (state, { payload: product }: PayloadAction<Product>): CartItemType[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (!item) {
        return [...state, { product: product, quantity: 1 }];
      }
      item.quantity += 1;

      return state;
    },
    /**
     * удаляет продукт из стейта корзины, если quantity > 1, то просто уменьшает значение этого поля
     */
    removeProductFromCart: (state, { payload: product }: PayloadAction<Product>): CartItemType[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        if (item.quantity === 1) {
          return state.filter((stateItem) => stateItem !== item)
        }
        item.quantity -= 1;
      }

      return state;
    },
    /**
     * удаляет продукт с любым количеством из стейта корзины
     */
    removeProductFromCartAll: (state, { payload: product }: PayloadAction<Product>): CartItemType[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        return state.filter((stateItem) => stateItem !== item)
      }
      return state;
    },
  },
});

/**
 * экспортируем экшены из слайса, чтобы использовать их в контроллере
 */
export const { addProductToCart, removeProductFromCart, removeProductFromCartAll } = slice.actions;

/**
 * экспортируем редюсер из слайса, чтобы использовать его для инициализации store
 */
export default slice.reducer;


function addTodo(text: string) {
  return { type: 'todos/todoAdded', payload: text }
}

const action = addTodo('Learn about actions' )
