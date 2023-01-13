import './productListView.scss'

import {ProductView} from "./productView";
import {Product} from "../../../../types/product";
import {View} from "../../../view";
import {CartDataType} from "../../../../types/cartDataType";

type ProductListViewDataType = {
    cart: CartDataType
    products: Product[]
}

/**
 * view отвечающий за отрисовку списка товаров
 *   - получает список продуктов для отрисовки
 *   - пробегает по всем продуктам и для каждого вызывает render() метод из класса ProductView
 */
export class ProductListView extends View<ProductListViewDataType> {
    protected views = {
        product: new ProductView(),
    }
    public render(data: ProductListViewDataType): string {
        const { products, cart } =data
        if(products.length) {
            return products.map((product) => this.views.product.render({
                product: product,
                isInCart: cart.items.some(({product: inCartProduct}) => {
                    return inCartProduct.id === product.id
                })
            })).join('')
        }

        return `<div class="empty-catalog">No items found</div>`
    }
}

