import {ViewInterface} from "../viewInterface";
import './headerCartView.scss';
import {Product} from "../../types/product";

export class HeaderCartView implements ViewInterface<Product[]> {
    render(products: Product[]): string {
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
