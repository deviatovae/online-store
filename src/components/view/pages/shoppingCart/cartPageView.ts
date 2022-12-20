import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'


export default class CartPageView extends View<void> {
    render(data?: void): string {
        return `
        <div class="shopping-cart wrapper">
          <div class="shopping-cart__header wrapper">SHOPPING CART</div>
          <div class="shopping-cart__list">
            <div class="cart-item">
              <div class="cart-item__header">
                <span>Item</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Subtotal</span>
              </div>
              <div class="cart-item__content">
                <div class="cart-item__img"></div>
                <div class="cart-item__info">
                  <div class="cart-item-info__name">Christmas bauble</div>
                  <div class="cart-item-info__color">Color: </div>
                  <div class="cart-item-info__collecrion">Collecrion: </div>
                  <div class="cart-item-info__size">Size: </div>
                  <div class="cart-item-info__category">Category: </div>
                </div>
               <div class="cart-item__price">$8</div>
               <div class="cart-item__qty">
                 <div class="cart-item-qty__value-container">
                   <div class="cart-item-qty__value">2</div>
                 </div>
                 <div class="cart-item-qty__arrow-container up">
                   <div class="cart-item-qty__arrow-up"></div>
                </div>
                <div class="cart-item-qty__arrow-container down">
                   <div class="cart-item-qty__arrow-down"></div>
                </div>
               </div>
               <div class="cart-item__subtotal">$16</div>
              </div>
              <div class="cart-item__cross"></div>
            </div>
          </div>
          <div class="shopping-cart__summery">
            <div class="summery-info">
              <div class="summery-info__header">SUMMERY</div>
              <div class="summery-info__order-container">
                <div class="order-container__text-value">
                  <div class="order-container__text">Order Total</div>
                  <div class="order-container__total-value">$8</div>
                </div>
                <div class="order-container-button">
                  <button class="button-order">Proceed to Checkout</button>
                </div>
              </div>
            </div>
            <div class="shopping-promo">
              <input class="input-promo" type="text" placeholder="  Enter promo code">
              <button class="button-apply" disabled="disabled">Apply</button>
            </div>
        </div>
    `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
    }
}
