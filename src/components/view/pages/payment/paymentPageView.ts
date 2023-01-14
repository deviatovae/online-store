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
        
        const formFields: Validation = {
            validName: false,
            validAddress: false,
            validEmail: false,
            validTell: false,
            validCardName: false,
            validCardNumber: false,
            validCardDate: false,
            validCardCvv: false
        };

        function makeInputValid(input: HTMLElement | null) {
            if (!input) return;
                input.classList.remove('invalid');
                input.classList.add('valid');
        }

       function makeInputInvalid(input: HTMLElement | null) {
            if (!input) return;
                input.classList.add('invalid');
                input.classList.remove('valid');
        }

        // name
        const nameInput = document.querySelector(".payment-details__name") as HTMLInputElement;

        const checkFormatName = (value: string) => value.replace(/[^-\A-Za-z, А-Яа-я]/g, '');
        const checkNameLength = (value: string) => {
            const arrName = value.split(' ');
            return arrName.length >= 2 && arrName.every((el) => el.length >= 3);
        }

        nameInput?.addEventListener('input', (event: Event) => {
            nameInput.value = checkFormatName(nameInput.value);
            const isValidNameInput = checkNameLength(nameInput.value);
            if (isValidNameInput) {
                formFields.validName = true;
                makeInputValid(nameInput);
            } else {
                formFields.validName = false;
                makeInputInvalid(nameInput);
            }
        })

        // address
        const addressInput = document.querySelector(".payment-details__shipping-address") as HTMLInputElement;

        const checkFormatAddress = (value: string) => value.replace(/[^-\A-Za-z, А-Яа-я]/g, '');
        const checkAddressLength = (value: string) => {
            const arrAddress = value.split(' ');
            return arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5);
        }

        addressInput?.addEventListener('input', (event: Event) => {
            addressInput.value = checkFormatAddress(addressInput.value);
            const isValidAddressInput = checkAddressLength(addressInput.value);
            if (isValidAddressInput) {
                formFields.validAddress = true;
                makeInputValid(addressInput);
            } else {
                formFields.validAddress = false;
                makeInputInvalid(addressInput);
            }
        })

        // email
        const emailInput = document.querySelector(".payment-details__email") as HTMLInputElement;

        const checkFormatEmail = (value: string) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

        emailInput?.addEventListener('input', (event: Event) => {
            const isValidEmailInput = checkFormatEmail(emailInput.value);
            if (isValidEmailInput) {
                formFields.validEmail = true;
                makeInputValid(emailInput);

            } else {
                formFields.validEmail = false;
                makeInputInvalid(emailInput);
            }
        })

        // phone-number
        const numberInput = document.querySelector(".payment-details__phone-number") as HTMLInputElement;

        const checkFormatNumber = (value: string) => value.replace(/[^+\d]/g, '').substring(0, 16)
        const checkNumberLength = (value: string) => value.match(/^\+\d{9}/g);
        
        numberInput?.addEventListener('input', (event: Event) => {
            numberInput.value = checkFormatNumber(numberInput.value);
            const isValidNumberInput = checkNumberLength(numberInput.value);
            if (isValidNumberInput) {
                formFields.validTell = true;
                makeInputValid(numberInput);
            } else {
                formFields.validTell = false;
                makeInputInvalid(numberInput);
            }
        })

        // валидация card number

        const cardNumberInput = document.querySelector(".card-details__card-number") as HTMLInputElement;
        const cardsImg = document.querySelector(".cards__img") as HTMLElement | null;

        cardNumberInput?.addEventListener('input', (event: Event) => {

            const value = cardNumberInput.value.replace(/[^\d]/g, '').substring(0, 16);
            const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            cardNumberInput.value = formattedValue;

            if (!cardsImg) return;

            switch (value[0]) {
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
            if (value.length >= 16) {
                formFields.validCardNumber = true;
                makeInputValid(cardNumberInput);

            } else {
                formFields.validCardNumber = false;
                makeInputInvalid(cardNumberInput);
            }
        })

        // валидация name on card

        const nameCardInput = document.querySelector(".card-details__name") as HTMLInputElement;

        const checkFormatNameCard = (value: string) => value.replace(/[^\A-Za-z /]/g, '');
        const checkFormatLength = (value: string) => {
          const arrName = value.split(' ');
          return arrName.length >= 2 && arrName.every((el) => el.length >= 3);
        }
        
        nameCardInput?.addEventListener('input', (event: Event) => {
            nameCardInput.value = checkFormatNameCard(nameCardInput.value);
            const isValidNameInput = checkFormatLength(nameCardInput.value);
            if (isValidNameInput) {
                formFields.validCardName = true;
                makeInputValid(nameCardInput);
            } else {
                formFields.validCardName = false;
                makeInputInvalid(nameCardInput);
            }
        });

        // валидация CVV

        const cvvInput = document.querySelector(".bottom-row__cvv") as HTMLInputElement;

        const checkFormatCvv = (value: string) => value.replace(/[^\d]/g, '').substring(0, 3);
        const checkLengthCvv = (value: string) => value.length === 3;

        cvvInput?.addEventListener('input', (event: Event) => {
            cvvInput.value = checkFormatCvv(cvvInput.value);
            const isValidCvvInput = checkLengthCvv(cvvInput.value);
              if (isValidCvvInput) {
                  formFields.validCardCvv = true;
                  makeInputValid(cvvInput);
              } else {
                  formFields.validCardCvv = false;
                  makeInputInvalid(cvvInput);
              }
        });

        // валидация MM/YY
        const dateInput = document.querySelector(".bottom-row__date") as HTMLInputElement;
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
                    formFields.validCardDate = true;
                    makeInputValid(dateInput);
            } else {
                formFields.validCardDate = false;
                makeInputInvalid(dateInput);
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

        const checkFormValidity = (formFields: Validation): boolean => {
            return Object.values(formFields).every(value => value === true);
        }
          
        orderBtn?.addEventListener('click', (event: Event) => {
            
            if (checkFormValidity(formFields)) {
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

                if (!formFields.validName) makeInputInvalid(nameInput);
                if (!formFields.validAddress) makeInputInvalid(addressInput);
                if (!formFields.validEmail) makeInputInvalid(emailInput);
                if (!formFields.validTell) makeInputInvalid(numberInput);
                if (!formFields.validCardName) makeInputInvalid(nameCardInput);
                if (!formFields.validCardNumber) makeInputInvalid(cardNumberInput);
                if (!formFields.validCardDate) makeInputInvalid(dateInput);
                if (!formFields.validCardCvv) makeInputInvalid(cvvInput);
            }
        })

        // обработка кнопки тестовых платежных данных
        const paymentTest = document.querySelector<HTMLInputElement>(".payment-test");
        paymentTest?.addEventListener('click', (event: Event) => {
            if (nameInput) {
                nameInput.value = 'Rubi Rhod';
                formFields.validName = true;
                makeInputValid(nameInput);
            }

            if (addressInput) {
                addressInput.value = "United States, New-York, Times Square";
                formFields.validAddress = true;
                makeInputValid(addressInput);
            }

            if (emailInput) {
                emailInput.value = "Rubi_Rohod@icloud.com";
                formFields.validEmail = true;
                makeInputValid(emailInput);
            }

            if (numberInput) {
                numberInput.value = "+7123456789";
                formFields.validTell = true;
                makeInputValid(numberInput);
            }

            if (nameCardInput) {
                nameCardInput.value = "RUBI RHOD";
                formFields.validCardName = true;
                makeInputValid(nameCardInput);
            }

            if (cardNumberInput && cardsImg) {
                cardNumberInput.value = "5761 8744 9011 0008";
                formFields.validCardNumber = true;
                makeInputValid(cardNumberInput);
                cardsImg.classList.add("cards__img_mastercard");
            }

            if (dateInput) {
                dateInput.value = "04/24";
                formFields.validCardDate = true;
                makeInputValid(dateInput);
            }

            if (cvvInput) {
                cvvInput.value = "344";
                formFields.validCardCvv = true;
                makeInputValid(cvvInput);
            }
        })
    }
}
