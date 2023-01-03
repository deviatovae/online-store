import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";


export class CartPageListView extends View<CartItemType[]>{
    protected views = {}

    public render(cartItems: CartItemType[]): string {
        return cartItems.map((cartItem, ind) => {
            return `<div class="cart-item">
            <div class="cart-item__content">
              <div class="cart-item__number">${ind +1}</div>
              <img class="cart-item__img" data-id="${cartItem.product.id}" src="${cartItem.product.images[0]}" alt="product image">
              <div class="cart-item__info">
                <div class="cart-item-info__name">${cartItem.product.name}</div>
                <div class="cart-item-info__color">Color: ${cartItem.product.color}</div>
                <div class="cart-item-info__collecrion">Collection: ${cartItem.product.collection}</div>
                <div class="cart-item-info__size">Size: ${cartItem.product.size}cm</div>
                <div class="cart-item-info__category">Category: ${cartItem.product.category}</div>
                <div class="cart-item-info__instock" data-id="${cartItem.product.id}">In stock: ${cartItem.product.stock}</div>
              </div>
             <div class="cart-item__price">$${cartItem.product.price}</div>
             <div class="cart-item__qty">
               <div class="cart-item-qty__value-container">
                 <input class="cart-item-qty__value-container quantity-input" type="number" data-id="${cartItem.product.id}" data-stock="${cartItem.product.stock}" value="${cartItem.quantity}">
               </div>
               <div class="cart-item-qty__arrow-container arrow-up" data-stock="${cartItem.product.stock}" data-id="${cartItem.product.id}">
                 <div class="cart-item-qty__arrow-up"></div>
              </div>
              <div class="cart-item-qty__arrow-container arrow-down" data-id="${cartItem.product.id}">
                 <div class="cart-item-qty__arrow-down"></div>
              </div>
             </div>
             <div class="cart-item__subtotal">$${formatPrice(cartItem.product.price * cartItem.quantity)}</div>
            </div>
            <div class="cart-item__cross" data-id="${cartItem.product.id}"></div>
          </div>`
        }).join('')
    }

    afterRender(controller: Controller) {
      super.afterRender(controller);

        document.querySelectorAll<HTMLElement>('.arrow-up').forEach((button: Element) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement
              controller.addProductToCart(Number(button.dataset.id));

                // трести in stock если стрелкой вверх внесено большее количество чем есть
                document.querySelectorAll<HTMLInputElement>(".quantity-input").forEach((input) => {
                  if (Number(input.value) === (Number(button.dataset.stock))) {
                      document.querySelectorAll<HTMLElement>(".cart-item-info__instock").forEach((stock: HTMLElement) => {
                        if (Number(button.dataset.id) === Number(stock.dataset.id)) {
                          stock.classList.add("shake-cart");
                          setTimeout(() => stock.classList.remove("shake-cart"), 3000);
                        }
                    })
                  }
               })
            })
        });

        document.querySelectorAll<HTMLElement>('.arrow-down').forEach((button: Element) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement;
            controller.removeProductFromCart(Number(button.dataset.id));
          })
        });

        document.querySelectorAll<HTMLElement>('.cart-item__cross').forEach((button: Element) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement;
            controller.removeProductFromCartAll(Number(button.dataset.id));
          })
        });

        document.querySelectorAll<HTMLElement>('.quantity-input').forEach((input: HTMLElement) => {

          input.addEventListener('input', (event: Event) => {
            const input = event.currentTarget as HTMLInputElement
            // верификация по in ctock
            if (Number(input.value) > (Number(input.dataset.stock))) {
              input.value = String(input.dataset.stock);

              // трести in stock если импутом внесено большее количество чем есть
              document.querySelectorAll<HTMLElement>(".cart-item-info__instock").forEach((stock: HTMLElement) => {
                if (Number(input.dataset.id) === Number(stock.dataset.id)) {
                  stock.classList.add("shake-cart");
                  setTimeout(() => stock.classList.remove("shake-cart"), 3000);
                }
              })
            }

            // верификация отрицательных чисел
            if (Number(input.value) < 0) {
              input.value = "1";
            }

            // верификация по целым числам
            if (Number(input.value) % 1 !== 0) {
              input.value = String(Math.round(Number(input.value)));
            }
          })

          input.addEventListener('change', (event: Event) => {
            const input = event.currentTarget as HTMLInputElement

            // Добавление в корзину любого количества принятого из инпут
            controller.setProductQuantityInCart(Number(input.dataset.id), Number(input.value));

            // удалить товар если в инпут внести 0
            if (Number(input.value) === 0 ) {
              controller.removeProductFromCartAll(Number(input.dataset.id));
            }
          })
        });

        document.querySelectorAll<HTMLElement>('.cart-item__img').forEach((button: HTMLElement) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement;
            Router.redirectTo('/product/' + button.dataset.id);
          })
        })
  }
}

