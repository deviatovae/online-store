import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'
import {Router} from "../../../router/router";

import {CartPageListView} from "./cartPageListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";

import {PromoListView} from "./promoListView";



export default class CartPageView extends View<CartDataType> {
  protected views = {
    cartList: new CartPageListView()
};
  protected viewsPromo = {
    promoList: new PromoListView()
};

    render(cartItems: CartDataType): string {
        return `
        <div class="shopping-cart wrapper">
          <div class="shopping-cart__header wrapper">SHOPPING CART</div>
          <div class="shopping-cart__subheader">
            <span>Item</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Subtotal</span>
          </div>
          <div class="shopping-cart__list">
          ${this.views.cartList.render(cartItems.items)}
          </div>
          <div class="shopping-cart__summery">
            <div class="summery-info">
              <div class="summery-info__header">SUMMARY</div>
              <div class="summery-info__order-container">
                <div class="order-container__text-value">
                  <div class="order-container__text">Order Total</div>
                  <div class="order-container__total-value">$${formatPrice(cartItems.orderTotal)}</div>
                </div>

                <div class="order-container__text-value-promo">${this.viewsPromo.promoList.render(cartItems.items)}</div>
    
                <div class="order-container-button">
                  <button class="button-order">Proceed to Checkout</button>
                </div>
              </div>
            </div>
            <div class="shopping-promo">
              <input class="input-promo" type="text" maxlength="10" placeholder="  Enter promo code">
              <button class="button-apply" disabled="disabled">Apply</button>
              <div class="ptomo-test">Promo for test: 'RS', 'XMAS2023'</div>
            </div>
        </div>`;
    }

  
    afterRender(controller: Controller) {
        super.afterRender(controller);
        const order = document.querySelector('.button-order') as HTMLElement | null;

        if (order) {
            order.onclick = () => Router.redirectTo('/payment');
        }
    
        // блок промо кода
        const buttom = document.querySelector('.button-apply')as HTMLInputElement
        const input = document.querySelector('.input-promo')as HTMLInputElement
        const totalValue = document.querySelector('.order-container__total-value') as HTMLElement;
        const valuePromo = document.querySelector('.order-container__text-value-promo') as HTMLElement;
        const textPromo = document.querySelector('.order-container__text-promo') as HTMLElement;

        // валидация промо на снятие disabled и Applied / Apply
        input.addEventListener('input', (event: Event) => {
          if (input.value === "XMAS2023" || input.value === "RS") {
            buttom.removeAttribute("disabled");
          }
          else {
            buttom.setAttribute("disabled", "true");
            buttom.textContent = "Apply";
          }

            buttom.addEventListener('click', (event: Event) => {
              if (input.value === "XMAS2023" || input.value === "RS") {
                console.log(input.value)
                buttom.textContent = "Applied";
                totalValue.style.textDecoration = "line-through";
                totalValue.style.fontSize = "16px";
                totalValue.style.color = "#747474";
                valuePromo.style.visibility = "visible"
                textPromo.textContent = input.value + '-15% OFF'
              }
            })

        })
    }
}

