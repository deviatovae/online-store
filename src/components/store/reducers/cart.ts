import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

/**
 * интерфейс объектов, лежащих в стейте
 */
interface CartItem {
  product: Product,
  quantity: number,
}

/**
 * начальное состояние стейта
 */
const initialState: CartItem[] = [];

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * добавляет продукт в стейт корзины, при повторном добавлении увеличивает quantity
     */
    addProductToCart: (state, { payload: product }: PayloadAction<Product>) => {
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
    removeProductFromCart: (state, { payload: product }: PayloadAction<Product>) => {
      const item = state.find((item) => item.product.id === product.id);
      if (item) {
        if (item.quantity === 1) {
          return state.filter((stateItem) => stateItem !== item)
        }
        item.quantity -= 1;
      }

      return state;
    },
  },
});

/**
 * экспортируем экшены из слайса, чтобы использовать их в контроллере
 */
export const { addProductToCart, removeProductFromCart } = slice.actions;

/**
 * экспортируем редюсер из слайса, чтобы использовать его для инициализации store
 */
export default slice.reducer;
