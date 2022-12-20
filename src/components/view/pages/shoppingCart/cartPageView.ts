import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './cartPageView.scss'


export default class CartPageView extends View<void> {
    render(data?: void): string {
        return `
        <div class="shopping-cart">
          <div class="shopping-cart__header">SHOPPING CART</div>
          <div class="shopping-cart__list">
            <div class="cart-item">
              <div class="cart-item__header">
                <span>Item</span>
                <span>Price</span>
                <span>Subtotal</span>
              </div>
              <div class="cart-item__content">
                <div class="cart-item__img"></div>
                <div class="cart-item__info">
                  <div class="cart-item-info__name"></div>
                  <div class="cart-item-info__color">Color: </div>
                  <div class="cart-item-info__collecrion">Collecrion: </div>
                  <div class="cart-item-info__size">Size: </div>
                  <div class="cart-item-info__category">Category: </div>
                </div>
               <div class="cart-item__price">$8</div>
               <div class="cart-item__qty">
                 <div class="cart-item-qry__value-container">
                   <div class="cart-item-qry__value">2</div>
                 </div>
                 <div class="cart-item-qry__arrow-top"></div>
                 <div class="cart-item-qry__arrow-botom"></div>
               </div>
               <div class="cart-item__subtotal">$16</div>
              </div>
              <div class="cart-item__cross">X</div>
            </div>
          </div>
          <div class="shopping-cart__summery">
            <div class="shopping-cart__summery-info">
              <div class="summery__header">SUMMERY</div>
              <div class="summery__order-container">
                <div class="order-container__text">Order Total</div>
                <div class="order-container__total-value">$8</div>
                <div class="order-container__button">
                  <button class="button-order">Proceed to Checkout</button>
                </div>
            </div>
            <div class="shopping-cart__summery-promo">
              <input class="input-promo" type="text" placeholder="  Enter promo code">
              <button class="button-apply" disabled="disabled">Apply</button>
            </div>
          </div>
        </div>
    `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
    }
}
