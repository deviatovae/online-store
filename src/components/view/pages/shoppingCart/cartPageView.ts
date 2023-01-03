import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'
import {Router} from "../../../router/router";
import {CartPageListView} from "./cartPageListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";
import {AppliedPromocodeListView} from "./appliedPromocodeListView";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {PaymentPageView} from "../payment/paymentPageView";


export default class CartPageView extends View<CartDataType> {
    protected views = {
        cartList: new CartPageListView(),
        appliedPromocodes: new AppliedPromocodeListView(),
        header: new HeaderView(),
        footer: new FooterView(),
        payment: new PaymentPageView(),
    };

    render(cart: CartDataType): string {
        // language=HTML
        if (!cart.items.length) {
            return `
              ${this.views.header.render(cart)}
              <main">
              <div class="shopping-cart__empty">
                <div class="shopping-cart__empty-title">SHOPPING CART</div>
                <div class="shopping-cart__empty-subtitle">You have no items in your shopping cart.</div>
              </div>
              </main>
              ${this.views.footer.render()}`
        }
        // language=HTML
        return `
          ${this.views.header.render(cart)}
          <main>
            ${this.views.payment.render(cart)}
            <div class="shopping-cart wrapper">
              <div class="shopping-cart__header">SHOPPING CART</div>
              <div class="shopping-cart__pagination">
              
                <div class="pagination__select">
                 <select class="pagination-select" data-param="">
                 
                 <option value="value">Show items: 5</option>
                 <option value="value">Show items: 10</option>
                 <option value="value">Show items: 15</option>
                </select>
                </div>
              
              </div>
              <div class="shopping-cart__subheader">
                <span>№</span>
                <span>Item</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Subtotal</span>
              </div>
              <div class="shopping-cart__list">
                ${this.views.cartList.render(cart.items)}
              </div>
              <div class="shopping-cart__summary">
                <div class="summery-info">
                  <div class="summery-info__header">SUMMARY</div>
                  <div class="summery-info__order-container">
                    <div class="order-container__content">
                      <div class="order-container__items-count items-count">
                        <div class="items-count__title">Items Total</div>
                        <div class="items-count__count">${cart.productCount}</div>
                      </div>
                      <div class="order-container__total-count total-count">
                        <div class="total-count__text">Order Total</div>
                        <div class="total-count__total-value ${cart.promocodes.applied.length ? 'discount' : ''}">
                            $${formatPrice(cart.getPriceByPromocodes())}
                        </div>
                      </div>
                    </div>
                    <div class="order-container__promocode promocode-order">
                      ${this.views.appliedPromocodes.render(cart)}
                    </div>
                    <div class="order-container-button">
                      <button class="button-order">Proceed to Checkout</button>
                    </div>
                  </div>

                </div>
                <div class="shopping-promo">
                  <input class="input-promo" type="text" maxlength="16" placeholder="  Enter promo code">
                  <button class="button-apply" disabled="disabled">Apply</button>
                  <div class="promo-test">Promo for test:
                    ${cart.promocodes.available.map(code => `<div class="promo-test__name">${code.name}</div>`).join(' | ')}
                  </div>
                </div>
              </div>

              <div class="shopping-cart__pagination-botton-container">
                <div class="pagination-botton pagination-botton-active">1</div>
                <div class="pagination-botton">2</div>
              </div>
            </div>

          </main>
          ${this.views.footer.render()}
        `;
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
        const order = document.querySelector('.button-order') as HTMLElement | null;

        if (order) {
            order.onclick = () => {
                this.views.payment.show();
            }
        }

        if (Router.getUrlParams().has('buy-now')) {
            this.views.payment.show();
        }

        /**
         * promocode
         */
        const promoApplyButton = document.querySelector<HTMLButtonElement>('.button-apply')
        const promoInput = document.querySelector<HTMLInputElement>('.input-promo');
        if (!promoApplyButton || !promoInput) {
            return;
        }

        const updateApplyBtnDisabled = function () {
            if (controller.isPromocodeAvailable(promoInput.value)) {
                promoApplyButton.removeAttribute('disabled')
            } else {
                promoApplyButton.setAttribute("disabled", "true");
            }
        }

        promoInput?.addEventListener('input', () => {
            updateApplyBtnDisabled()
        })

        promoApplyButton.addEventListener('click', (e) => {
            controller.applyPromocode(promoInput.value);
        })

        const promocodes = document.querySelectorAll('.promo-test__name');
        promocodes.forEach((promocode) => {
            promocode.addEventListener('click', () => {
                promoInput.value = promocode.textContent ?? '';
                updateApplyBtnDisabled();
            });
        })
    }
}

