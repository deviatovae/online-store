import {View} from "../../view";
import {Controller} from "../../../controller/controller";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";

export class PaymentPageView extends View<CartDataType> {
    protected views = {
        paymentList: new PaymentListView()
    };

    render(cartItems: CartDataType): string {
        // language=HTML
        return `
          <div class="main-catalog__payment-page payment-page">
            <div class="payment-page__container">
              <div class="payment-page__payment-details payment-details">
                <div class="payment-details__credentials">
                  <div class="payment-details__title">PAYMENT DETAILS</div>
                  <div class="payment-details__info">
                    <input type="text" class="payment-details__name" placeholder="Name">
                    <input type="text" class="payment-details__shipping-address" placeholder="Address">
                    <input type="text" class="payment-details__email" placeholder="Email">
                    <input type="text" class="payment-details__phone-number" placeholder="+7">
                  </div>
                </div>
                <div class="payment-details__payment-method payment-method">
                  <div class="payment-method__top">
                    <div class="payment-method__title">PAYMENT METHOD</div>
                    <div class="payment-method__cards cards">
                      <div class="cards__img cards__img_visa"></div>
                      <div class="cards__img cards__img_mastercard"></div>
                      <div class="cards__img cards__img_amex"></div>
                    </div>
                  </div>
                  <div class="payment-method__card-details card-details">
                    <input type="text" class="card-details__name" placeholder="Name on card">
                    <input type="text" class="card-details__card-number" placeholder="5xxx xxxx xxxx xxxx">
                    <div class="card-details__bottom-row bottom-row">
                      <input type="text" class="bottom-row__date" placeholder="MM/YY">
                      <input type="text" class="bottom-row__cvv" placeholder="CVV">
                    </div>
                  </div>
                </div>
              </div>
              <div class="payment-page__order-summary order-summary">
                <div class="order-summary__content summary-content">
                  <div class="summary-content__title">ORDER SUMMARY</div>
                  <div class="summary-content__list summary-list">${this.views.paymentList.render(cartItems.items)}
                  </div>
                  <div class="summary-content__discount summary-discount">
                    <div class="summary-discount__name">XMAS2023 -15% OFF</div>
                    <div class="summary-discount__amount">$-7.20</div>
                  </div>
                  <div class="summary-content__total summary-total">
                    <div class="summary-total__name">Order Total</div>
                    <div class="summary-total__amount">$${formatPrice(cartItems.priceAfterDiscount)}</div>
                  </div>
                  <div class="summary-content__order-btn">Place order now</div>
                </div>
              </div>
            </div>
          </div>`;
    }

    afterRender(controller: Controller) {
        super.afterRender(controller);
    }
}
