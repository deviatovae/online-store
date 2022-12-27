import './headerView.scss';
import {View} from "../view";
import {Controller} from "../../controller/controller";
import {Router} from "../../router/router";
import {CartDataType} from "../../types/cartDataType";

/**
 * view иконки корзины в хедере
 *
 * принимает список продуктов (временно, лучше принимать уже готовый объект с полями count, и price (sum))
 * возвращает готовый html инонки корзины
 */
export class HeaderView extends View<CartDataType> {
    public render(cart: CartDataType): string {
        // language=HTML
        return `
          <header class="header">
            <div class="header__container wrapper">
              <a class="header-link" href="#">
                  <span class="header-logo">
                    <span class="header-logo__title">Christmas</span>
                    <span class="header-logo__img"></span>
                    <span class="header-logo__subtitle">Decorations</span>
                  </span>
              </a>
              <div class="header-cart">
                <div class="header-cart__img"></div>
                <div class="header-cart__amount-container">
                  <p class="header-cart__amount">${cart.productCount}</p>
                </div>
                <div class="header-cart__num">$${cart.priceAfterDiscount.toFixed(2)}</div>
              </div>
            </div>
          </header>`
    }

    public afterRender(controller: Controller) {
        super.afterRender(controller);

        const cart = document.querySelector('.header-cart') as HTMLElement
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
