import {View} from "../../view";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartData} from "../../../types/cartData";
// import {CartDataType} from "../../../types/cartDataType";
import {Validation} from "../../../types/validation";
import {Card} from "../../../types/card";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import {UrlParam} from "../../../types/urlParam";
import {lightInvalid} from "./utils"
import {makeInputInvalid, makeInputValid} from "./utils"
import {checkFormatName, checkNameLength, checkFormatAddress, checkAddressLength,
        checkFormatEmail, checkFormatNumber, checkNumberLength, checkFormatNameCard,
        checkFormatLength, checkFormatCvv, checkLengthCvv, formatCardNumber, isYearValid,
        isMonthValid, isDateFormatValid, formatDate} from "./validation"



export class PaymentPageView extends View<CartData> {
    protected views = {
        paymentList: new PaymentListView(),
        header: new HeaderView(),
        footer: new FooterView(),
    };

    render(cart: CartData): string {
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
            if (Router.getUrlParams().has(UrlParam.BUY_NOW)) {
                Router.removeUrlParamKey(UrlParam.BUY_NOW);
            }
        }
    }

    public afterRender(controller: Controller): void {
        super.afterRender(controller);
        
        const nameInput = document.querySelector(".payment-details__name") as HTMLInputElement;
        const addressInput = document.querySelector(".payment-details__shipping-address") as HTMLInputElement;
        const emailInput = document.querySelector(".payment-details__email") as HTMLInputElement;
        const numberInput = document.querySelector(".payment-details__phone-number") as HTMLInputElement;
        const cardNumberInput = document.querySelector(".card-details__card-number") as HTMLInputElement;
        const nameCardInput = document.querySelector(".card-details__name") as HTMLInputElement;
        const cvvInput = document.querySelector(".bottom-row__cvv") as HTMLInputElement;
        const dateInput = document.querySelector(".bottom-row__date") as HTMLInputElement;
        const cardsImg = document.querySelector(".cards__img") as HTMLElement | null;
        const loadingSpinner = document.querySelector(".loading-spinner") as HTMLInputElement;
        const orderBtn = document.querySelector(".summary-content__order-btn") as HTMLInputElement;
        const paymentPage = document.querySelector('.payment-page') as HTMLElement;
        const closeButton = document.querySelector('.payment-details__close-btn') as HTMLElement;

        const inputElements: {[key: string] : HTMLInputElement} = {
            validName: nameInput,
            validAddress: addressInput,
            validEmail: emailInput,
            validTell: numberInput,
            validCardName: nameCardInput,
            validCardNumber: cardNumberInput,
            validCardDate: dateInput,
            validCardCvv: cvvInput
        };

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

        // name
        nameInput?.addEventListener('input', (event: Event) => {
            nameInput.value = checkFormatName(nameInput.value);
            const isValidNameInput = checkNameLength(nameInput.value);
            if (isValidNameInput) {
                formFields.validName = true;
                makeInputValid(nameInput);
            } else {
                makeInputInvalid(nameInput);
            }
        })

        // address
        addressInput?.addEventListener('input', (event: Event) => {
            addressInput.value = checkFormatAddress(addressInput.value);
            const isValidAddressInput = checkAddressLength(addressInput.value);
            if (isValidAddressInput) {
                formFields.validAddress = true;
                makeInputValid(addressInput);
            } else {
                makeInputInvalid(addressInput);
            }
        })

        // email
        emailInput?.addEventListener('input', (event: Event) => {
            const isValidEmailInput = checkFormatEmail(emailInput.value);
            if (isValidEmailInput) {
                formFields.validEmail = true;
                makeInputValid(emailInput);

            } else {
                makeInputInvalid(emailInput);
            }
        })

        // phone-number
        numberInput?.addEventListener('input', (event: Event) => {
            numberInput.value = checkFormatNumber(numberInput.value);
            const isValidNumberInput = checkNumberLength(numberInput.value);
            if (isValidNumberInput) {
                formFields.validTell = true;
                makeInputValid(numberInput);
            } else {
                makeInputInvalid(numberInput);
            }
        })

        // card number
        cardNumberInput?.addEventListener('input', (event: Event) => {
            cardNumberInput.value = formatCardNumber(cardNumberInput.value);
            if (!cardsImg) return;

            switch (cardNumberInput.value[0]) {
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
            if (cardNumberInput.value.length >= 16) {
                formFields.validCardNumber = true;
                makeInputValid(cardNumberInput);
            } else {
                makeInputInvalid(cardNumberInput);
            }
        })

        // name on card
        nameCardInput?.addEventListener('input', (event: Event) => {
            nameCardInput.value = checkFormatNameCard(nameCardInput.value);
            const isValidNameInput = checkFormatLength(nameCardInput.value);
            if (isValidNameInput) {
                formFields.validCardName = true;
                makeInputValid(nameCardInput);
            } else {
                makeInputInvalid(nameCardInput);
            }
        });

        //  CVV
        cvvInput?.addEventListener('input', (event: Event) => {
            cvvInput.value = checkFormatCvv(cvvInput.value);
            const isValidCvvInput = checkLengthCvv(cvvInput.value);
              if (isValidCvvInput) {
                  formFields.validCardCvv = true;
                  makeInputValid(cvvInput);
              } else {
                  makeInputInvalid(cvvInput);
              }
        });

        // MM/YY
        dateInput?.addEventListener('input', (event: Event) => {
            formatDate(dateInput)
            if (isYearValid(dateInput) &&
                isMonthValid(dateInput) &&
                isDateFormatValid(dateInput)) {
                formFields.validCardDate = true;
                makeInputValid(dateInput);
            } else {
                makeInputInvalid(dateInput);
            }
        })

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
                lightInvalid(formFields, inputElements);
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

        closeButton?.addEventListener('click', () => {
            this.hide();
        })

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                this.hide();
            }
        })

        paymentPage?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hide();
            } else {
                return;
            }
        })

    }
}
