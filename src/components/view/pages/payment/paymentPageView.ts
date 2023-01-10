import {View} from "../../view";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartDataType} from "../../../types/cartDataType";
import {CardType} from "../../../types/cardTape";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";

export class PaymentPageView extends View<CartDataType> {
    protected views = {
        paymentList: new PaymentListView(),
        header: new HeaderView(),
        footer: new FooterView(),
    };

    render(cart: CartDataType): string {
        // language=HTML
        return `
          <div class="main-catalog__payment-page payment-page">
            <div class="payment-page__container">
              <div class="payment-page__payment-details payment-details">
                <div class="payment-details__credentials">
                  <div class="payment-details__close-btn"></div>
                  <div class="payment-details__title">PAYMENT DETAILS</div>
                  <div class="payment-details__info">
                    <input type="text" class="payment-details__name" required="required" placeholder="Name">
                    <input type="text" class="payment-details__shipping-address" required="required"
                           placeholder="Address">
                    <input type="email" class="payment-details__email" required="required" placeholder="Email">
                    <input type="tel" class="payment-details__phone-number" required="required"
                           placeholder="Phone +7 ...">
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
                    <input type="text" class="card-details__card-number" required="required"
                           placeholder="хxxx xxxx xxxx xxxx">
                    <div class="card-details__bottom-row bottom-row">
                      <input type="text" class="bottom-row__date" required="required" placeholder="MM/YY">
                      <input type="number" class="bottom-row__cvv" required="required" placeholder="CVV">
                    </div>
                  </div>
                </div>
                <div class="summary-content__order-btn">Place order now</div>
                <div class="payment-test">Test payment data</div>
                <div class="loading-spinner"></div>
              </div>
            </div>
          </div>
        `;
    }

    public show() {
        const container = document.querySelector<HTMLElement>('.payment-page');
        if (container) {
            container.style.display = 'flex';
        }
    }

    public hide() {
        const container = document.querySelector<HTMLElement>('.payment-page');
        if (container) {
            container.style.display = 'none';
            if (Router.getUrlParams().has('buy-now')) {
                Router.removeUrlParamKey('buy-now');
            }
        }
    }

    public afterRender(controller: Controller): void {
        super.afterRender(controller);

        let validName: boolean = false;
        let validAddress: boolean = false;
        let validEmail: boolean = false;
        let validTell: boolean = false;
        let validCardName: boolean = false;
        let validCardNumber: boolean = false;
        let validCardDate: boolean = false;
        let validCardCvv: boolean = false;


        function setInputValidity(input: HTMLElement | null, isValid: boolean) {
            if (!input) return;
        
            if (isValid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        }
        
        // валидация name
        const nameInput = document.querySelector<HTMLInputElement>(".payment-details__name");
        nameInput?.addEventListener('input', (event: Event) => {

            nameInput.value = nameInput.value.replace(/[^A-Za-z, А-Яа-я]/g, '');
            let arrName = Array.from(nameInput.value.split(' '))
            if (arrName.length >= 2 && arrName.every((el) => el.length >= 3)) {
                validName = true;
                setInputValidity(nameInput, validName);
            } else {
                validName = false;
                setInputValidity(nameInput, validName);
            }
        })

        // валидация address
        const addressInput = document.querySelector<HTMLInputElement>(".payment-details__shipping-address");
        addressInput?.addEventListener('input', (event: Event) => {

            addressInput.value = addressInput.value.replace(/[^\-\A-Za-z, А-Яа-я]/g, '');
            let arrAddress = Array.from(addressInput.value.split(' '))
            if (arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5)) {
                validAddress = true;
                setInputValidity(addressInput, validAddress);
            } else {
                validAddress = false;
                setInputValidity(addressInput, validAddress);
            }
        })

        // валидация email
        const emailInput = document.querySelector<HTMLInputElement>(".payment-details__email");
        emailInput?.addEventListener('input', (event: Event) => {

            if (emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                validEmail = true;
                setInputValidity(emailInput, validEmail);

            } else {
                validEmail = false;
                setInputValidity(emailInput, validEmail);
            }
        })

        // валидация phone-number
        const numberInput = document.querySelector<HTMLInputElement>(".payment-details__phone-number");
        numberInput?.addEventListener('input', (event: Event) => {

            numberInput.value = numberInput.value.replace(/[^+\d]/g, '').substring(0, 16);
            if (numberInput.value.match(/^\+\d{9}/g)) {
                validTell = true;
                setInputValidity(numberInput, validTell);
            } else {
                validTell = false;
                setInputValidity(numberInput, validTell);
            }
        })

        // валидация card number
        const cardNumberInput = document.querySelector<HTMLInputElement>(".card-details__card-number");
        const cardsImg = document.querySelector(".cards__img") as HTMLElement | null;

        cardNumberInput?.addEventListener('input', (event: Event) => {
            let arrCardNumber = Array.from(cardNumberInput.value)

            let value = cardNumberInput.value.replace(/[^\d]/g, '').substring(0, 16);
            if (value != '') {
                value = value.match(/.{1,4}/g)?.join(' ') || '';
            } else value = '';
            cardNumberInput.value = value;

            if (!cardsImg) return;

            switch (arrCardNumber[0]) {
                case CardType.Visa:
                    cardsImg.classList.add("cards__img_visa");
                    break;
        
                case CardType.Mastercard:
                    cardsImg.classList.add("cards__img_mastercard");
                    break;
        
                case CardType.Amex:
                    cardsImg.classList.add("cards__img_amex");
                    break;
        
                default:
                    cardsImg.classList.remove("cards__img_visa");
                    cardsImg.classList.remove("cards__img_mastercard");
                    cardsImg.classList.remove("cards__img_amex");
                    break;
            }

            if (arrCardNumber.length >= 19) {
                validCardNumber = true;
                setInputValidity(cardNumberInput, validCardNumber);

            } else {
                validCardNumber = false;
                setInputValidity(cardNumberInput, validCardNumber);
            }
        })

        // валидация name on card
        const nameCardInput = document.querySelector<HTMLInputElement>(".card-details__name");
        nameCardInput?.addEventListener('input', (event: Event) => {

            nameCardInput.value = nameCardInput.value.replace(/[^\A-Za-z /]/g, '');
            let arrName = Array.from(nameCardInput.value.split(' '));

            if (arrName.length >= 2 && arrName.every((el) => el.length >= 3)) {
                validCardName = true;
                setInputValidity(nameCardInput, validCardName);
            } else {
                validCardName = false;
                setInputValidity(nameCardInput, validCardName);
            }
        })

        // валидация CVV
        const cvvInput = document.querySelector<HTMLInputElement>(".bottom-row__cvv");
        cvvInput?.addEventListener('input', (event: Event) => {

            cvvInput.value = cvvInput.value.replace(/[^\0-9]/g, '').substring(0, 3);

            if (cvvInput.value.match(/^\d{3}/g)) {
                validCardCvv = true;
                setInputValidity(cvvInput, validCardCvv);
            } else {
                validCardCvv = false;
                setInputValidity(cvvInput, validCardCvv);
            }
        })

        // валидация MM/YY
        const dateInput = document.querySelector<HTMLInputElement>(".bottom-row__date");
        dateInput?.addEventListener('input', (event: Event) => {

            const thisYear = new Date().getFullYear().toString().substring(2, 4)
            let value = dateInput.value.replace(/[^\d]/g, '').substring(0, 4);

            if (value != '') {
                value = value.match(/.{1,2}/g)?.join('/') || '';
            } else value = '';
            dateInput.value = value;

            if (Number(dateInput.value.substring(0, 2)) >= 12) {

                dateInput.classList.add('invalid');
            } else dateInput.classList.remove('invalid');

            if (dateInput.value.match(/.{5}/g) &&
                Number(dateInput.value.substring(0, 2)) <= 12 &&
                Number(dateInput.value.substring(3, 5)) >= +thisYear) {
                validCardDate = true;
                setInputValidity(dateInput, validCardDate);
            } else {
                validCardDate = false;
                setInputValidity(dateInput, validCardDate);
            }
        })

    const closeButton = document.querySelector<HTMLElement>('.payment-details__close-btn');
    closeButton?.addEventListener('click', () => {
        this.hide();
    })

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.hide();
        }
    })

        const paymentPage = document.querySelector<HTMLElement>('.payment-page');
        paymentPage?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hide();
            } else {
                return;
            }
        })

        const loadingSpinner = document.querySelector<HTMLInputElement>(".loading-spinner");
        const orderBtn = document.querySelector<HTMLInputElement>(".summary-content__order-btn");
        orderBtn?.addEventListener('click', (event: Event) => {

            if (validName && validAddress && validEmail &&
                validTell && validCardName && validCardNumber &&
                validCardDate && validCardCvv) {
                orderBtn.textContent = "Your order has been placed!";
                orderBtn.style.color = "green";
                paymentTest!.style.display = "none";
                loadingSpinner!.style.display = "block";
                setTimeout(() => {
                    controller.clearCart().then(() => Router.redirectTo('/'))
                }, 3000);
            } else {
                orderBtn.textContent = "Check your data";
                orderBtn.style.color = "red";
                setTimeout(() => {
                    orderBtn.textContent = "Place order now",
                        orderBtn.style.color = "#eee";
                }, 2000);

                // Подсвететка не валидных блоков
                if (!validName)setInputValidity(nameInput, validName);

                if (!validAddress)setInputValidity(addressInput, validAddress);

                if (!validEmail) setInputValidity(emailInput, validEmail);

                if (!validTell) setInputValidity(numberInput, validTell);

                if (!validCardName) setInputValidity(nameCardInput, validCardName);

                if (!validCardNumber) setInputValidity(cardNumberInput, validCardNumber);

                if (!validCardDate) setInputValidity(dateInput, validCardDate);

                if (!validCardCvv) setInputValidity(cvvInput, validCardCvv);
            }
        })

        // обработка кнопки тестовых платежных данных
        const paymentTest = document.querySelector<HTMLInputElement>(".payment-test");
        paymentTest?.addEventListener('click', (event: Event) => {
            if (nameInput) {
                nameInput.value = 'Rubi Rhod';
                validName = true;
                nameInput.classList.add('valid');
                nameInput.classList.remove('invalid');
            }

            if (addressInput) {
                addressInput.value = "United States, New-York, Times Square";
                validAddress = true;
                addressInput.classList.add('valid');
                addressInput.classList.remove('invalid');
            }

            if (emailInput) {
                emailInput.value = "Rubi_Rohod@icloud.com";
                validEmail = true;
                emailInput.classList.add('valid');
                emailInput.classList.remove('invalid');
            }

            if (numberInput) {
                numberInput.value = "+7123456789";
                validTell = true;
                numberInput.classList.add('valid');
                numberInput.classList.remove('invalid');
            }

            if (nameCardInput) {
                nameCardInput.value = "RUBI RHOD";
                validCardName = true;
                nameCardInput.classList.add('valid');
                nameCardInput.classList.remove('invalid');
            }

            if (cardNumberInput && cardsImg) {
                cardNumberInput.value = "5761 8744 9011 0008";
                validCardNumber = true;
                cardNumberInput.classList.add('valid');
                cardNumberInput.classList.remove('invalid');
                cardsImg.classList.add("cards__img_mastercard");
            }

            if (dateInput) {
                dateInput.value = "04/24";
                validCardDate = true;
                dateInput.classList.add('valid');
                dateInput.classList.remove('invalid');
            }

            if (cvvInput) {
                cvvInput.value = "344";
                validCardCvv = true;
                cvvInput.classList.add('valid');
                cvvInput.classList.remove('invalid');
            }
        })
    }
}
