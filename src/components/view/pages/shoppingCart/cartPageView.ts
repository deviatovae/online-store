import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'
import {Router} from "../../../router/router";
import {CartPageListView} from "./cartPageListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";
import {AppliedPromocodeListView} from "./appliedPromocodeListView";


export default class CartPageView extends View<CartDataType> {
    protected views = {
        cartList: new CartPageListView(),
        appliedPromocodes: new AppliedPromocodeListView(),
    };

    render(cart: CartDataType): string {
        // language=HTML
        if(!cart.items.length){
            return `<div class="shopping-cart__empty">
                      <div class="shopping-cart__empty-title">SHOPPING CART</div>
                      <div class="shopping-cart__empty-subtitle">You have no items in your shopping cart.</div>
                    </div>`
        }
        return `
          <div class="shopping-cart wrapper">
            <div class="shopping-cart__header">SHOPPING CART</div>
            <div class="shopping-cart__subheader">
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
            </div>
            <div class="shopping-cart__list">
              ${this.views.cartList.render(cart.items)}
            </div>
            <div class="shopping-cart__summery">
              <div class="summery-info">
                <div class="summery-info__header">SUMMARY</div>
                <div class="summery-info__order-container">
                  <div class="order-container__text-value">
                    <div class="order-container__text">Order Total</div>
                    <div class="order-container__total-value ${cart.promocodes.applied.length ? 'discount' : ''}">
                        $${formatPrice(cart.getPriceByPromocodes())}
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
              </div>`;
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
        const order = document.querySelector('.button-order') as HTMLElement | null;

        if (order) {
            order.onclick = () => Router.redirectTo('/payment');
        }

        /**
         * promocode
         */
        const promoApplyButton = document.querySelector('.button-apply') as HTMLInputElement
        const promoInput = document.querySelector<HTMLInputElement>('.input-promo') as HTMLInputElement;
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

