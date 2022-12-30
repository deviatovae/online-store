import {View} from "../../view";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartDataType} from "../../../types/cartDataType";
import {formatPrice} from "../../helpers/helpers";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {Controller} from "../../../controller/controller"; 

// <div class="cards__img cards__img_mastercard"></div>
// <div class="cards__img cards__img_amex"></div>


export class PaymentPageView extends View<CartDataType> {
    protected views = {
        paymentList: new PaymentListView(),
        header: new HeaderView(),
        footer: new FooterView(),
    };

    render(cart: CartDataType): string {
        // language=HTML
        return `
          ${this.views.header.render(cart)}
          <main>
            <div class="main-catalog__payment-page payment-page">
              <div class="payment-page__container">
                <div class="payment-page__payment-details payment-details">
                  <div class="payment-details__credentials">
                    <div class="payment-details__title">PAYMENT DETAILS</div>
                    <div class="payment-details__info">
                      <input type="text" class="payment-details__name" required="required" placeholder="Name">
                      <input type="text" class="payment-details__shipping-address" required="required" placeholder="Address">
                      <input type="email" class="payment-details__email" required="required" placeholder="Email">
                      <input type="tel" class="payment-details__phone-number" required="required"  placeholder="Phone +7 ...">
                    </div>
                  </div>
                  <div class="payment-details__payment-method payment-method">
                    <div class="payment-method__top">
                      <div class="payment-method__title">PAYMENT METHOD</div>
                      <div class="payment-method__cards cards">
                        <div class="cards__img"></div>
                      </div>
                    </div>
                    <div class="payment-method__card-details card-details">
                      <input type="text" class="card-details__name" required="required" placeholder="Name on card">
                      <input type="text" class="card-details__card-number" required="required" placeholder="хxxx xxxx xxxx xxxx">
                      <div class="card-details__bottom-row bottom-row">
                        <input type="text" class="bottom-row__date" required="required" placeholder="MM/YY">
                        <input type="number" class="bottom-row__cvv" required="required" placeholder="CVV">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="payment-page__order-summary order-summary">
                  <div class="order-summary__content summary-content">
                    <div class="summary-content__title">ORDER SUMMARY</div>
                    <div class="summary-content__list summary-list">${this.views.paymentList.render(cart.items)}
                    </div>
                    <div class="summary-content__discount summary-discount">
                      <div class="summary-discount__name">
                        ${cart.promocodes.applied.map(p => `<div>${p.name}  ${p.discount}% OFF</div>`).join('')}
                      </div>
                      <div class="summary-discount__amount">
                        ${cart.promocodes.applied.map(p => `<div>-$${formatPrice(cart.getPriceByPromocodes() - cart.getPriceByPromocodes([p]))}</div>`).join('')}
                      </div>
                    </div>
                    <div class="summary-content__total summary-total">
                      <div class="summary-total__name">Order Total</div>
                      <div class="summary-total__amount">$${formatPrice(cart.priceAfterDiscount)}</div>
                    </div>
                    <div class="summary-content__order-btn">Place order now</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          ${this.views.footer.render()}
        `;
    }

       public afterRender(controller: Controller): void {
    super.afterRender(controller);

    // валидация name
    const nameInput  = document.querySelector(".payment-details__name") as HTMLInputElement;
    nameInput.addEventListener('input', (event: Event) => {

      nameInput.value = nameInput.value.replace(/[^\a-z, а-я]/g, "");
      let arrName = Array.from(nameInput.value.split(' '))
      if (arrName.length >= 2 && arrName.every((el) => el.length >= 3 )){
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
      } else {
        nameInput.classList.remove('valid');
        nameInput.classList.add('invalid');
      }
    })

    // валидация adress
    const addressInput = document.querySelector(".payment-details__shipping-address") as HTMLInputElement;
    addressInput.addEventListener('input', (event: Event) => {

      addressInput.value = addressInput.value.replace(/[^\a-z, а-я]/g, "");
      let arrAddress = Array.from(addressInput.value.split(' '))
      if (arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5)){
        addressInput.classList.add('valid');
        addressInput.classList.remove('invalid');
      } else {
        addressInput.classList.remove('valid');
        addressInput.classList.add('invalid');
      }
    })

    // валидация email
    const emailInput  = document.querySelector(".payment-details__email") as HTMLInputElement;
    emailInput.addEventListener('input', (event: Event) => {
      emailInput.classList.add('invalid');
    })

    // валидация phone-number
    const numberInput  = document.querySelector(".payment-details__phone-number") as HTMLInputElement;
    numberInput.addEventListener('input', (event: Event) => {

      numberInput.value = numberInput.value.replace(/[^\0-9]/g, "").substring(0,16);
      if (numberInput.value.match(/^\+\d{9}/g)){
        numberInput.classList.add('valid');
        numberInput.classList.remove('invalid');
      } else {
        numberInput.classList.remove('valid');
        numberInput.classList.add('invalid');
      }
    })

    // валидация card number
    const cardNumberInput  = document.querySelector(".card-details__card-number") as HTMLInputElement;
    const cardsImg  = document.querySelector(".cards__img") as HTMLElement;

    cardNumberInput.addEventListener('input', (event: Event) => {
      let arrCardNumber = Array.from(cardNumberInput.value)

      let value: string | any = cardNumberInput.value.replace(/[^\d]/g, '').substring(0,16);
      if (value != '') {
        value = value.match(/.{1,4}/g).join(' ');
      } else value = ''
      cardNumberInput.value = value;

      if (arrCardNumber[0] === '4') {
        cardsImg.classList.add("cards__img_visa")
      } else {
        cardsImg.classList.remove("cards__img_visa")
      }

      if (arrCardNumber[0] === '5') {
        cardsImg.classList.add("cards__img_mastercard")
      } else {
        cardsImg.classList.remove("cards__img_mastercard")
      }

      if (arrCardNumber[0] === '6') {
        cardsImg.classList.add("cards__img_amex")
      } else {
        cardsImg.classList.remove("cards__img_amex")
      }

      if (arrCardNumber.length >= 19){
        cardNumberInput.classList.add('valid');
        cardNumberInput.classList.remove('invalid');
      } else {
        cardNumberInput.classList.remove('valid');
        cardNumberInput.classList.add('invalid');
      }
    })

    // валидация name on card
    const nameCardInput  = document.querySelector(".card-details__name") as HTMLInputElement;
    nameCardInput.addEventListener('input', (event: Event) => {

      nameCardInput.value = nameCardInput.value.replace(/[^\a-z, а-я]/g, "");
      let arrName = Array.from(nameCardInput.value.split(' '))

      if (arrName.length >= 2 && arrName.every((el) => el.length >= 3 )){
        nameCardInput.classList.add('valid');
        nameCardInput.classList.remove('invalid');
      }
      else { 
        nameCardInput.classList.remove('valid');
        nameCardInput.classList.add('invalid');
      }
    })

    // валидация CVV
    const cvvInput  = document.querySelector(".bottom-row__cvv") as HTMLInputElement;
    cvvInput.addEventListener('input', (event: Event) => {

      cvvInput.value = cvvInput.value.replace(/[^\0-9]/g, "").substring(0,3);

      if (cvvInput.value.match(/^\d{3}/g)){
        cvvInput.classList.add('valid');
        cvvInput.classList.remove('invalid')
      }
      else {
        cvvInput.classList.remove('valid');
        cvvInput.classList.add('invalid')
      };
    })

    // валидация MM/YY
    const dateInput  = document.querySelector(".bottom-row__date") as HTMLInputElement;
    dateInput.addEventListener('input', (event: Event) => {

      dateInput.value = dateInput.value.replace(/[^\0-9]/g, "").substring(0,5);

      let value: string | any = dateInput.value.replace(/[^\d]/g, '').substring(0,4);
      if (value != '') {
        value = value.match(/.{1,2}/g).join('/');
      } else value = ''
      dateInput.value = value;

      if (Number(dateInput.value.substring(0,2)) >= 12) {

        dateInput.classList.add('invalid');
      } else dateInput.classList.remove('invalid');

      if (dateInput.value.match(/.{5}/g) && Number(dateInput.value.substring(0,2)) <= 12){
        dateInput.classList.add('valid');
        dateInput.classList.remove('invalid')
      }
      else {
        dateInput.classList.remove('valid')
        dateInput.classList.add('invalid');
      }
    })
  } 
}
