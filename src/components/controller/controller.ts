import {CallbackFn} from "../types/callbackFn";
import {Product} from "../types/product";

/**
 * контроллер получает, изменяет, фильтрует данные, которые потребуются для view
 * нужно доделать редакс и роутер чтобы получить все данные, сейчас мы может прокинуть только весь массив с товарами
 */
export class Controller {
    /**
     * возвращает данные для корзины / иконки в хэдере
     */
    public cart(callback: CallbackFn<Product[]>): void {
        const products: Product[] = [];

        callback(products);
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
    }
}
