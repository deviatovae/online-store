import {View} from "../../view";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartDataType} from "../../../types/cartDataType";
import {Validation} from "../../../types/validation";
import {Card} from "../../../types/card";
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
        
        const valid: Validation = {
            validName: false,
            validAddress: false,
            validEmail: false,
            validTell: false,
            validCardName: false,
            validCardNumber: false,
            validCardDate: false,
            validCardCvv: false
        };

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
                valid.validName = true;
                setInputValidity(nameInput, valid.validName);
            } else {
                valid.validName = false;
                setInputValidity(nameInput, valid.validName);
            }
        })

        // валидация address
        const addressInput = document.querySelector<HTMLInputElement>(".payment-details__shipping-address");
        addressInput?.addEventListener('input', (event: Event) => {

            addressInput.value = addressInput.value.replace(/[^\-\A-Za-z, А-Яа-я]/g, '');
            let arrAddress = Array.from(addressInput.value.split(' '))
            if (arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5)) {
                valid.validAddress = true;
                setInputValidity(addressInput, valid.validAddress);
            } else {
                valid.validAddress = false;
                setInputValidity(addressInput, valid.validAddress);
            }
        })

        // валидация email
        const emailInput = document.querySelector<HTMLInputElement>(".payment-details__email");
        emailInput?.addEventListener('input', (event: Event) => {

            if (emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                valid.validEmail = true;
                setInputValidity(emailInput, valid.validEmail);

            } else {
                valid.validEmail = false;
                setInputValidity(emailInput, valid.validEmail);
            }
        })

        // валидация phone-number
        const numberInput = document.querySelector<HTMLInputElement>(".payment-details__phone-number");
        numberInput?.addEventListener('input', (event: Event) => {

            numberInput.value = numberInput.value.replace(/[^+\d]/g, '').substring(0, 16);
            if (numberInput.value.match(/^\+\d{9}/g)) {
                valid.validTell = true;
                setInputValidity(numberInput, valid.validTell);
            } else {
                valid.validTell = false;
                setInputValidity(numberInput, valid.validTell);
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
                case Card.VISA:
                    cardsImg.classList.add("cards__img_visa");
                    break;
        
                case Card.MASTERCARD:
                    cardsImg.classList.add("cards__img_mastercard");
                    break;
        
                case Card.AMEX:
                    cardsImg.classList.add("cards__img_amex");
                    break;
        
                default:
                    cardsImg.classList.remove("cards__img_visa");
                    cardsImg.classList.remove("cards__img_mastercard");
                    cardsImg.classList.remove("cards__img_amex");
                    break;
            }

            if (arrCardNumber.length >= 19) {
                valid.validCardNumber = true;
                setInputValidity(cardNumberInput, valid.validCardNumber);

            } else {
                valid.validCardNumber = false;
                setInputValidity(cardNumberInput, valid.validCardNumber);
            }
        })

        // валидация name on card
        const nameCardInput = document.querySelector<HTMLInputElement>(".card-details__name");
        nameCardInput?.addEventListener('input', (event: Event) => {

            nameCardInput.value = nameCardInput.value.replace(/[^\A-Za-z /]/g, '');
            let arrName = Array.from(nameCardInput.value.split(' '));

            if (arrName.length >= 2 && arrName.every((el) => el.length >= 3)) {
                valid.validCardName = true;
                setInputValidity(nameCardInput, valid.validCardName);
            } else {
                valid.validCardName = false;
                setInputValidity(nameCardInput, valid.validCardName);
            }
        })

        // валидация CVV
        const cvvInput = document.querySelector<HTMLInputElement>(".bottom-row__cvv");
        cvvInput?.addEventListener('input', (event: Event) => {

            cvvInput.value = cvvInput.value.replace(/[^\0-9]/g, '').substring(0, 3);

            if (cvvInput.value.match(/^\d{3}/g)) {
                valid.validCardCvv = true;
                setInputValidity(cvvInput, valid.validCardCvv);
            } else {
                valid.validCardCvv = false;
                setInputValidity(cvvInput, valid.validCardCvv);
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
                    valid.validCardDate = true;
                setInputValidity(dateInput, valid.validCardDate);
            } else {
                valid.validCardDate = false;
                setInputValidity(dateInput, valid.validCardDate);
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

            if (valid.validName && valid.validAddress && valid.validEmail &&
                valid.validTell && valid.validCardName && valid.validCardNumber &&
                valid.validCardDate && valid.validCardCvv) {
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
                if (!valid.validName)setInputValidity(nameInput, valid.validName);

                if (!valid.validAddress)setInputValidity(addressInput, valid.validAddress);

                if (!valid.validEmail) setInputValidity(emailInput, valid.validEmail);

                if (!valid.validTell) setInputValidity(numberInput, valid.validTell);

                if (!valid.validCardName) setInputValidity(nameCardInput, valid.validCardName);

                if (!valid.validCardNumber) setInputValidity(cardNumberInput, valid.validCardNumber);

                if (!valid.validCardDate) setInputValidity(dateInput, valid.validCardDate);

                if (!valid.validCardCvv) setInputValidity(cvvInput, valid.validCardCvv);
            }
        })

        // обработка кнопки тестовых платежных данных
        const paymentTest = document.querySelector<HTMLInputElement>(".payment-test");
        paymentTest?.addEventListener('click', (event: Event) => {
            if (nameInput) {
                nameInput.value = 'Rubi Rhod';
                valid.validName = true;
                setInputValidity(nameInput, valid.validName);
            }

            if (addressInput) {
                addressInput.value = "United States, New-York, Times Square";
                valid.validAddress = true;
                setInputValidity(addressInput, valid.validAddress);
            }

            if (emailInput) {
                emailInput.value = "Rubi_Rohod@icloud.com";
                valid.validEmail = true;
                setInputValidity(emailInput, valid.validEmail);
            }

            if (numberInput) {
                numberInput.value = "+7123456789";
                valid.validTell = true;
                setInputValidity(numberInput, valid.validTell);
            }

            if (nameCardInput) {
                nameCardInput.value = "RUBI RHOD";
                valid.validCardName = true;
                setInputValidity(nameCardInput, valid.validCardName);
            }

            if (cardNumberInput && cardsImg) {
                cardNumberInput.value = "5761 8744 9011 0008";
                valid.validCardNumber = true;
                setInputValidity(cardNumberInput, valid.validCardNumber);
                cardsImg.classList.add("cards__img_mastercard");
            }

            if (dateInput) {
                dateInput.value = "04/24";
                valid.validCardDate = true;
                setInputValidity(dateInput, valid.validCardDate);
            }

            if (cvvInput) {
                cvvInput.value = "344";
                valid.validCardCvv = true;
                setInputValidity(cvvInput, valid.validCardCvv);
            }
        })
    }
}
