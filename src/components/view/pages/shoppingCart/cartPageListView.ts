import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";

export class CartPageListView extends View<CartItemType[]>{
    protected views = {}

    public render(cartItems: CartItemType[]): string {
        return cartItems.map((cartItem) => {
            return `<div class="cart-item">
            <div class="cart-item__content">
              <div class="cart-item__img" style="background-image: url('${cartItem.product.images[0]}')"></div>
              <div class="cart-item__info">
                <div class="cart-item-info__name">${cartItem.product.name}</div>
                <div class="cart-item-info__color">Color: ${cartItem.product.color}</div>
                <div class="cart-item-info__collecrion">Collection: ${cartItem.product.collection}</div>
                <div class="cart-item-info__size">Size: ${cartItem.product.size}cm</div>
                <div class="cart-item-info__category">Category: ${cartItem.product.category}</div>
              </div>
             <div class="cart-item__price">$${cartItem.product.price}</div>
             <div class="cart-item__qty">
               <div class="cart-item-qty__value-container">
                 <input class="cart-item-qty__value-container quantity-input" type="number" data-id="${cartItem.product.id}" value="${cartItem.quantity}">

               </div>
               <div class="cart-item-qty__arrow-container arrow-up" data-id="${cartItem.product.id}">
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
          })
        });

        document.querySelectorAll<HTMLElement>('.arrow-down').forEach((button: Element) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement
            controller.removeProductFromCart(Number(button.dataset.id));
          })
        });

        document.querySelectorAll<HTMLElement>('.cart-item__cross').forEach((button: Element) => {
          button.addEventListener('click', (event: Event) => {
            const button = event.currentTarget as HTMLElement
            controller.removeProductFromCartAll(Number(button.dataset.id));
          })
        });

        document.querySelectorAll<HTMLElement>('.quantity-input').forEach((input: Element) => {
          input.addEventListener('input', (event: Event) => {
            const input = event.currentTarget as HTMLInputElement
          if (input.value.length > 3) {
              input.value = input.value.slice(0, 3);
            }
          })

          input.addEventListener('change', (event: Event) => {
            const input = event.currentTarget as HTMLInputElement;
            controller.addProductToCartValueInput(Number(input.dataset.id), Number(input.value));
          })
        });
  
    
  }
}

