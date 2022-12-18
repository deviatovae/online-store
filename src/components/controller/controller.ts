import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";
import store from "../store/store";
import {addProductToCart} from "../store/reducers/cart";
import products from '../../assets/data/products.json'
import {CartType} from "../types/cartType";

export class Controller {
    public cart(callback: CallbackFn<CartType>): void {
        const cartItems = store.getState().cart
        const viewData = {
            count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            price: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        }

        callback(viewData);
    }

    public catalog(callback: CallbackFn<void>) {
        callback();
    }

    addProductToCart(id: number) {
        const product = products.find((product: Product) => product.id === id)
        if (product) {
            store.dispatch(addProductToCart(product))
        }
    }
}
