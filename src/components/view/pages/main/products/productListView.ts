import './productListView.scss'

import {ProductView} from "./productView";
import {Product} from "../../../../types/product";
import {View} from "../../../view";

/**
 * view отвечающий за отрисовку списка товаров
 *   - получает список продуктов для отрисовки
 *   - пробегает по всем продуктам и для каждого вызывает render() метод из класса ProductView
 */
export class ProductListView extends View<Product[]> {
    protected views = {
        product: new ProductView(),
    }

    public render(products: Product[]): string {
        return products.map((product) => this.views.product.render(product)).join('')
    }
}

