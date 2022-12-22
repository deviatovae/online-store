import {View} from "../../view";
import {CartItemType} from "../../../types/cartItemType";


export class CartPageListView extends View<CartItemType[]>{
    protected views = {}

    private static getDescription(cartItem: CartItemType): string {
        return [
            cartItem.product.name,
            cartItem.product.color,
            cartItem.product.size + 'cm',
            cartItem.product.collection,
            cartItem.product.category
        ].join(' | ')
    }

    public render(cartItems: CartItemType[]): string {
        return cartItems.map((cartItem) => {
            return `<div class="cart-item">

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
          </div>`
        }).join('')
    }
}