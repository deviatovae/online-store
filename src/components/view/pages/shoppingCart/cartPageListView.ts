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
              <div class="cart-item__img"></div>
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
                 <div class="cart-item-qty__value">${cartItem.quantity}</div>
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
  
         document.addEventListener('click', (e: Event) => {
          const clickElement = e.target as HTMLElement; 

          if (clickElement.classList.contains('arrow-up')) {
            controller.addProductToCart(Number(clickElement.dataset.id));
          }

          if (clickElement.classList.contains('arrow-down')) {
            controller.removeProductFromCart(Number(clickElement.dataset.id));
          }

          if (clickElement.classList.contains('cart-item__cross')) {

          }


        })

  }
}

