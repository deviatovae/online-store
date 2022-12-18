import './headerCartView.scss';
import {Product} from "../../types/product";
import {View} from "../view";

/**
 * view иконки корзины в хедере
 *
 * принимает список продуктов (временно, лучше принимать уже готовый объект с полями count, и price (sum))
 * возвращает готовый html инонки корзины
 */
export class HeaderCartView extends View<Product[]> {
    public render(products: Product[]): string {
        // @todo перенести в контроллер, принимать уже готовый объект данных
        const count: number = products.length || 0
        const price = products.reduce((sum, product) => product.price + sum, 0)

        return `<div class="header-cart">
          <div class="header-cart__img"></div>
          <div class="header-cart__amount-container">
            <p class="header-cart__amount">${count}</p>
          </div>
          <div class="header-cart__num">$${price.toFixed(2)}</div>
        </div>`
    }
}
