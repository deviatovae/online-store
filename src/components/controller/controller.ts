import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";

export class Controller {
    public cart(callback: CallbackFn<Product[]>): void {
        const products: Product[] = [];

        callback(products);
    }

    public catalog(callback: CallbackFn<void>) {
        callback();
    }
}
