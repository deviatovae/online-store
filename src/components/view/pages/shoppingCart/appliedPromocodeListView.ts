import {View} from "../../view";
import {CartData} from "../../../types/cartData";
import {formatPrice} from "../../helpers/helpers";
import {Controller} from "../../../controller/controller";

export class AppliedPromocodeListView extends View<CartData> {
    render(cart: CartData): string {
        // language=HTML
        const items = cart.promocodes.applied.map(code => {
            return `
              <div class="promocode-order__item">
                <div class="promocode-order__name">${code.name} ${code.discount}% OFF<br>
                    ($-${formatPrice(cart.getPriceByPromocodes() - cart.getPriceByPromocodes([code]))})
                </div>
                <div class="promocodes__remove-btn remove-btn" data-id="${code.id}">
                  <div class="remove-btn__icon"></div>
                </div>
              </div>`
        }).join('')

        // language=HTML
        const priceAfterDiscount = items ? `$${formatPrice(cart.getPriceByPromocodes(cart.promocodes.applied))}` : '';

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
