import './headerCartView.scss';
import {Product} from "../../types/product";
import {View} from "../view";
import {Controller} from "../../controller/controller";
import {Router} from "../../router/router";

export class HeaderCartView extends View<Product[]> {
    public render(products: Product[]): string {
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

    public afterRender(controller: Controller) {
        super.afterRender(controller);

        const cart = document.querySelector('.header-cart') as HTMLElement

        console.log(cart)

        cart.addEventListener('click', () => {
            Router.redirectTo('/cart');
        })

        const logo = document.querySelector('.header-link') as HTMLElement
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            Router.redirectTo('/');
        })
    }
}
