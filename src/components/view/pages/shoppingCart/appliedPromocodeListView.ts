import {View} from "../../view";
import {CartData} from "../../../types/cartData";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";

export class AppliedPromocodeListView extends View<CartData> {
    render(cart: CartData): string {
        const {promocodes: {applied: promocodes}} = cart
        // language=HTML
        const items = promocodes.map((promocode) => {
            const {id, name, discount} = promocode
            return `
              <div class="promocode-order__item">
                <div class="promocode-order__name">${name} ${discount}% OFF<br>
                    ($-${formatPrice(cart.getPriceByPromocodes() - cart.getPriceByPromocodes([promocode]))})
                </div>
                <div class="promocodes__remove-btn remove-btn" data-id="${id}">
                  <div class="remove-btn__icon"></div>
                </div>
              </div>`
        }).join('')

        // language=HTML
        const priceAfterDiscount = items ? `$${formatPrice(cart.getPriceByPromocodes(promocodes))}` : '';

        // language=HTML
        return `
          <div class="promocode-order__list">
            ${items}
          </div>
          <div class="promocode-order__total-value">${priceAfterDiscount}</div>
        `
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);

        const promoRemoveButtons = document.querySelectorAll<HTMLElement>('.remove-btn')
        promoRemoveButtons.forEach((promoRemoveButton) => {
            promoRemoveButton.addEventListener('click', () => {
                controller.removeAppliedPromocode(Number(promoRemoveButton.dataset.id))
            })
        })
    }
}
