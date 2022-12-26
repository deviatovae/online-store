import './productPageView.scss'
import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {CartDataType} from "../../../types/cartDataType";

import {CartItemType} from "../../../types/cartItemType";




export default class ProductPageView extends View<CartDataType> {
    protected views = {};
  
      render(cartItems: CartDataType): string {
          return `
          <div class="product-page wrapper">
            <div class="product-page__arrow-back"></div>

            <div class="product-page__img-container">
              <div class="img-container__slider">
                <div class="product-page__img-one"></div>
                <div class="product-page__img-two"></div>
              </div>
              <div class="product-page__img-main"></div>
            </div>

            <div class="product-page__summaru-item">
              Christmas Bauble | Silver | 10cm $8.00
            </div>

            <div class="product-page__cart-container">
              <div class="cart-item__qty">
                <div class="cart-item-qty__value-container">
                  <input class="cart-item-qty__value-container quantity-input" type="number" value="1">
                </div>
                <div class="cart-item-qty__arrow-container arrow-up">
                  <div class="cart-item-qty__arrow-up"></div>
                </div>
                <div class="cart-item-qty__arrow-container arrow-down">
                  <div class="cart-item-qty__arrow-down"></div>
                </div>
              </div>
              <button class="button-add-cart button">ADD TO CART</button>
            </div>
            
              <div class="product-page__specifications-container">
                <div class="specifications__title wrapper">Product specifications</div>
                <div class="specifications__name-content-container wrapper">
                  <div class="specifications__name-container">
                    <div class="specifications__name-title">Item number</div>
                    <div class="specifications__name-title">Color</div>
                    <div class="specifications__name-title">Collection</div>
                    <div class="specifications__name-title">Price</div>
                    <div class="specifications__name-title">Size</div>
                    <div class="specifications__name-title">Category</div>
                  </div>
                  <div class="specifications__content-container">
                    <div class="specifications__item specifications-item-number">0501</div>
                    <div class="specifications__item specifications-color">Silver</div>
                    <div class="specifications__item specifications-collection">2022</div>
                    <div class="specifications__item specifications-price">$8</div>
                    <div class="specifications__item specifications-size">10 cm</div>
                    <div class="specifications__item specifications-category">Tree decorations</div>
                   </div>
                  </div>
              <button class="button-buy-now button">BUY NOW</button>
            </div>
          </div>
          `;
      }
  
    
      afterRender(controller: Controller) {
          super.afterRender(controller);

          const arrowBack = document.querySelector('.product-page__arrow-back') as HTMLElement | null;
  
          if (arrowBack) {
            arrowBack.onclick = () => Router.redirectTo('/');
          }
    
          const buttonAdd = document.querySelector('.button-add-cart') as HTMLElement;
            buttonAdd.addEventListener('click', (event: Event) => {
                  const button = event.currentTarget as HTMLElement
                  controller.addProductToCart(Number(button.dataset.id));
              })

      
        }
  }