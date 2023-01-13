import {View} from "../../view";
import {CartItem} from "../../../types/cartItem";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";


export class CartPageListView extends View<CartItem[]>{
    protected views = {}

    public render(cartItems: CartItem[]): string {
        return cartItems.map((cartItem) => {
          const {
            id: itemId,
            quantity,
            product: {id, images, name, color, collection, size, category, stock, price}
          } = cartItem

          return `<div class="cart-item">
            <div class="cart-item__content">
              <div class="cart-item__number">${itemId}</div>
              <img class="cart-item__img" data-id="${id}" src="${images[0]}" alt="product image">
              <div class="cart-item__info">
                <div class="cart-item-info__name">${name}</div>
                <div class="cart-item-info__color">Color: ${color}</div>
                <div class="cart-item-info__collecrion">Collection: ${collection}</div>
                <div class="cart-item-info__size">Size: ${size}cm</div>
                <div class="cart-item-info__category">Category: ${category}</div>
                <div class="cart-item-info__instock" data-id="${id}">In stock: ${stock}</div>
              </div>
             <div class="cart-item__price">$${price}</div>
             <div class="cart-item__qty">
               <div class="cart-item-qty__value-container">
                 <input class="cart-item-qty__value-container quantity-input" type="number" data-id="${id}" data-stock="${stock}" value="${quantity}">
               </div>
               <div class="cart-item-qty__arrow-container arrow-up" data-stock="${stock}" data-id="${id}">
                 <div class="cart-item-qty__arrow-up"></div>
              </div>
              <div class="cart-item-qty__arrow-container arrow-down" data-id="${id}">
                 <div class="cart-item-qty__arrow-down"></div>
              </div>
             </div>
             <div class="cart-item__subtotal">$${formatPrice(price * quantity)}</div>
            </div>
            <div class="cart-item__cross" data-id="${id}"></div>
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
            // верификация по in stock
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

