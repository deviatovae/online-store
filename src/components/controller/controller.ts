import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";
import store from "../store/store";
import {addProductToCart} from "../store/reducers/cart";
import products from '../../assets/data/products.json'
import {CartDataType} from "../types/cartDataType";

/**
 * контроллер получает, изменяет, фильтрует данные, которые потребуются для view
 * нужно доделать редакс и роутер чтобы получить все данные, сейчас мы может прокинуть только весь массив с товарами
 */
export class Controller {
    /**
     * возвращает данные для корзины / иконки в хэдере
     */
    public cart(callback: CallbackFn<CartDataType>): void {
        const cartItems = store.getState().cart
        const cartData: CartDataType = {
            items: cartItems,
            orderTotal: cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0),
            productCount: cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
        }
        callback(cartData);
    }

    /**
     * метод возвращает данные для страницы каталога и передает их в коллбэк
     */
    public catalog(callback: CallbackFn<void>) {
        callback();
    }

    /**
     * добавление продукта в корзину по идентификатору
     */
    addProductToCart(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(addProductToCart(product))
        }
    }
}
