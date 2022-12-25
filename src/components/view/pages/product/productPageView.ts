import './productPageView'
import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {CartDataType} from "../../../types/cartDataType";





export default class ProductPageView extends View<CartDataType> {
    protected views = {};
  
      render(cartItems: CartDataType): string {
          return `<div class="cart-item">
          тут ProductPage
          </div>
          
          `;
      }
  
    
      afterRender(controller: Controller) {
          super.afterRender(controller);

        //   const order = document.querySelector('.button-order') as HTMLElement | null;
  
        //   if (order) {
        //       order.onclick = () => Router.redirectTo('/payment');
        //   }
    
        }
  }