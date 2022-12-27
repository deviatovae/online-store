import './productPageView.scss'
import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {CartDataType} from "../../../types/cartDataType";
import {CartItemType} from "../../../types/cartItemType";
import {Product} from "../../../types/product";
import {formatPrice} from "../../helpers/helpers";

export default class ProductPageView extends View<Product> {
    protected views = {};

      render(product: Product): string {
          return `
          <div class="product-page wrapper">
            <div class="product-page__arrow-back"></div>

            <div class="product-page__img-container">
              <div class="img-container__slider">
                <img class="product-page-img-min product-page__img-0" src="${product.images[0]}" alt="product image">
                <img class="product-page-img-min product-page__img-1" src="${product.images[1]}" alt="product image">
              </div>
              <img class="product-page__img-main" src="${product.images[0]}" alt="product image">
            </div>
            <div class="product-page__summaru-item">
              ${product.name} | ${product.color} | ${product.size}cm | $${formatPrice(product.price)}
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
              <button class="button-add-cart button" data-id="${product.id}">ADD TO CART</button>
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
                    <div class="specifications__name-title">In stock</div>
                  </div>
                  <div class="specifications__content-container">
                    <div class="specifications__item specifications-item-number">${product.id+500}</div>
                    <div class="specifications__item specifications-color">${product.color}</div>
                    <div class="specifications__item specifications-collection">${product.collection}</div>
                    <div class="specifications__item specifications-price">${product.price}</div>
                    <div class="specifications__item specifications-size">${product.size} cm</div>
                    <div class="specifications__item specifications-category">${product.category}</div>
                    <div class="specifications__item specifications-In-stock">${product.stock}</div>
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

          // смена картинок
          const buttonImg0 = document.querySelector('.product-page__img-0') as HTMLImageElement;
          const buttonImg1 = document.querySelector('.product-page__img-1') as HTMLImageElement;
          const buttonMain = document.querySelector('.product-page__img-main') as HTMLImageElement;

          buttonImg1.addEventListener('click', (event: Event) => {
            buttonMain.src = buttonImg1.src;
            buttonImg1.style.borderBottom = "2px solid #8B9D93";
            buttonImg0.style.borderBottom = "2px solid #D9D9D9";
          })

          buttonImg0.addEventListener('click', (event: Event) => {
            buttonMain.src = buttonImg0.src;
            buttonImg1.style.borderBottom = "2px solid #D9D9D9";
            buttonImg0.style.borderBottom = "2px solid #8B9D93"
          })


          const buttonAddCart = document.querySelector('.button-add-cart') as HTMLElement;
          buttonAddCart.addEventListener('click', (event: Event) => {
            controller.addProductToCart(Number(buttonAddCart.dataset.id));
          })






      }
  }
