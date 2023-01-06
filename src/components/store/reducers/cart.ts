import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types/product';
import {CartItemType} from "../../types/cartItemType";
import {loadState} from "./storeDb";
import {CartItemArgType} from "../../types/cartItemArgType";

/**
 * начальное состояние стейта
 */
let initialState = loadState<CartItemType[]>('cart', []);

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * добавляет продукт в стейт корзины, при повторном добавлении увеличивает quantity
     */
    addProductToCart: (state, { payload: cartItem }: PayloadAction<CartItemArgType>): CartItemType[] => {
      const item = state.find((item) => item.product.id === cartItem.product.id);
      if (!item) {
        return [...state, {
          id: state.length + 1,
          product: cartItem.product,
          quantity: cartItem.quantity
        }];
      }
      item.quantity += cartItem.quantity;

      //  quantity не может быть больше stock
      if (item.quantity > item.product.stock) {
        item.quantity = item.product.stock
      }

      return state;
    },

    /**
     * изменяет quantity на величину value из input
     */
    setProductQuantityInCart: (state, { payload: cartItem }: PayloadAction<CartItemArgType>): CartItemType[] => {
      const item = state.find((item) => item.product.id === cartItem.product.id);
      if (!item) {
        return [...state, {
          id: state.length + 1,
          product: cartItem.product,
          quantity: cartItem.quantity
        }];
      }
        item.quantity = cartItem.quantity;

      return state;
    },

    /**
     * удаляет продукт из стейта корзины, если quantity > 1, то просто уменьшает значение этого поля
     */
    removeProductFromCart: (state, { payload: product }: PayloadAction<Product>): CartItemType[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        if (item.quantity <= 1 ) {
          return state.filter((stateItem) => stateItem !== item).map((p, i) => ({...p, id: i + 1}));
        }

        item.quantity -= 1;
      }

      return state;
    },
    /**
     * удаляет продукт с любым количеством из стейта корзины
     */
    removeProductFromCartAll: (state, {payload: product}: PayloadAction<Product>): CartItemType[] => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        return state.filter((stateItem) => stateItem !== item).map((p, i) => ({...p, id: i + 1}));
      }
      return state;
    },

    clearCart: (state): CartItemType[] => {
      return [];
    }
  },
});

/**
 * экспортируем экшены из слайса, чтобы использовать их в контроллере
 */
export const {
  addProductToCart,
  removeProductFromCart,
  removeProductFromCartAll,
  setProductQuantityInCart,
  clearCart
} = slice.actions;

/**
 * экспортируем редюсер из слайса, чтобы использовать его для инициализации store
 */
export default slice.reducer;

module.exports = {
  ...slice,
}
