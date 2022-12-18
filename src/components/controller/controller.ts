import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";
import store from "../store/store";
import {addProductToCart} from "../store/reducers/cart";
import products from '../../assets/data/products.json'
import {CartType} from "../types/cartType";

/**
 * контроллер получает, изменяет, фильтрует данные, которые потребуются для view
 * нужно доделать редакс и роутер чтобы получить все данные, сейчас мы может прокинуть только весь массив с товарами
 */
export class Controller {
    /**
     * возвращает данные для корзины / иконки в хэдере
     */
    public cart(callback: CallbackFn<CartType>): void {
        const cartItems = store.getState().cart
        const viewData = {
            count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            price: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        }

        callback(viewData);
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
