import './productPageView.scss'
import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {formatPrice} from "../../helpers/helpers";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {ProductPage} from "../../../types/productPage";

export default class ProductPageView extends View<ProductPage> {
    protected views = {
        header: new HeaderView(),
        footer: new FooterView(),
    };

    render({cart, product, isInCart}: ProductPage): string {

        const inCart = `<div class="product-summary__state-in-cart">In cart</div>`
        const addToCart = `<button class="button-add-cart button" data-id="${product.id}">ADD TO CART</button>`
        const addMore = `<button class="button-add-cart button" data-id="${product.id}">ADD MORE</button>`

        return `
          ${this.views.header.render(cart)}
          <main>
            <div class="product-page__bread-crumbs bread-crumbs">
                  <div class="bread-crumbs__path">
                  <a class="bread-crumbs__home-link" data-href="/">Home</a>
                  </div>
                  <div class="bread-crumbs__path">${product.category}</div>
                  <div class="bread-crumbs__path">${product.name}</div>
            </div>
            <div class="product-page wrapper">
                <div class="product-page__arrow-back"></div>
                <div class="product-page__img-container">
                  <div class="img-container__slider">
                    <img class="product-page-img-min product-page__img-0" src="${product.images[0]}" alt="product image">
                    <img class="product-page-img-min product-page__img-1" src="${product.images[1]}" alt="product image">
                  </div>
                  <img class="product-page__img-main" src="${product.images[0]}" alt="product image">
                </div>
                <div class="product-page__summaru-item product-summary">
                <div class="product-summary__description">
                ${product.name} | ${product.color} | ${product.size}cm | $${formatPrice(product.price)}
                </div>
                ${isInCart ? inCart : ''}
                </div>
                <div class="product-page__cart-container">
                  <div class="cart-item__qty">
                    <div class="cart-item-qty__value-container">
                      <input class="cart-item-qty__value-container quantity-input" data-stock="${product.stock}" type="number" value="1">
                    </div>
                    <div class="cart-item-qty__arrow-container arrow-up">
                      <div class="cart-item-qty__arrow-up"></div>
                    </div>
                    <div class="cart-item-qty__arrow-container arrow-down">
                      <div class="cart-item-qty__arrow-down"></div>
                    </div>
                  </div>
                  ${isInCart ? addMore : addToCart}
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
                        <div class="specifications__name-title in-stock">In stock</div>
                      </div>
                      <div class="specifications__content-container">
                        <div class="specifications__item specifications-item-number">${product.id + 500}</div>
                        <div class="specifications__item specifications-color">${product.color}</div>
                        <div class="specifications__item specifications-collection">${product.collection}</div>
                        <div class="specifications__item specifications-price">$${product.price}</div>
                        <div class="specifications__item specifications-size">${product.size} cm</div>
                        <div class="specifications__item specifications-category">${product.category}</div>
                        <div class="specifications__item specifications-in-stock">${product.stock}</div>
                       </div>
                      </div>
                  <button class="button-buy-now button" data-id="${isInCart}">BUY NOW</button>
                </div>
              </div>
          </main>
          ${this.views.footer.render()}
          `;
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const arrowBack = document.querySelector('.product-page__arrow-back') as HTMLElement | null;

        if (arrowBack) {
            arrowBack.onclick = () => {
                Router.goBack('/');
            }
        }

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

        function shake():void {
          stock.classList.add("shake-product");
          stockItem.classList.add("shake-product");
          setTimeout(() => {
            stock.classList.remove("shake-product");
            stockItem.classList.remove("shake-product");
          }, 3000);
        }

        // Добавление в корзину
        const buttonAdd = document.querySelector('.button-add-cart') as HTMLElement;
        const arrowUp = document.querySelector('.arrow-up') as HTMLElement
        const arrowDown = document.querySelector('.arrow-down') as HTMLElement
        const quantityInput = document.querySelector('.quantity-input') as HTMLInputElement
        const stock = document.querySelector('.in-stock') as HTMLElement
        const stockItem = document.querySelector('.specifications-in-stock') as HTMLElement

        quantityInput.addEventListener('input', (event: Event) => {
          const input = event.currentTarget as HTMLInputElement;
           // верификация отрицательных чисел
          if (Number(input.value) < 0) {
            input.value = "1";
          }
          // верификация по целым числам
          if (Number(input.value) % 1 !== 0) {
            input.value = String(Math.round(Number(input.value)));
          }
          // верификация по in ctock + трести in ctock
          if (Number(quantityInput.value) > Number(quantityInput.dataset.stock)) {
            quantityInput.value = String(quantityInput.dataset.stock);
            shake()
          }
        })

        arrowUp.addEventListener('click', (event: Event) => {
          quantityInput.value = String(Number(quantityInput.value) + 1);
          // верификация по in ctock
          if (Number(quantityInput.value) > Number(quantityInput.dataset.stock)) {
            quantityInput.value = String(quantityInput.dataset.stock);
          }
          // трести in stock если импутом внесено большее количество чем есть
          if (Number(quantityInput.value) == Number(quantityInput.dataset.stock)) {
            shake()
          }
        })

        arrowDown.addEventListener('click', (event: Event) => {
          if (quantityInput.value > '1') {
            quantityInput.value = String(Number(quantityInput.value) - 1);
          }
        })

        buttonAdd.addEventListener('click', (event: Event) => {
          controller.addProductToCart(Number(buttonAdd.dataset.id), Number(quantityInput.value));
        })

        const buttonBuy = document.querySelector('.button-buy-now') as HTMLElement;
        buttonBuy.addEventListener('click', (event: Event) => {
          if (buttonBuy.dataset.id === 'false') {
            controller.addProductToCart(Number(buttonAdd.dataset.id), Number(quantityInput.value));
          }
          Router.redirectTo('/cart?buy-now');
        })

        document.querySelectorAll<HTMLLinkElement>('.bread-crumbs__path > a').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                Router.redirectTo(link.dataset.href ?? '')
            })
        })
    }
}
