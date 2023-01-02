import {View} from "../../view";
import './paymentPage.scss'
import {PaymentListView} from "./paymentListView";
import {CartDataType} from "../../../types/cartDataType";
import {HeaderView} from "../../header/headerView";
import {FooterView} from "../../footer/footerView";
import {Controller} from "../../../controller/controller";
import {Router} from "../../../router/router";
import products from '../../../../assets/data/products.json'
import {current} from "@reduxjs/toolkit";

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
        }
    }

    public afterRender(controller: Controller): void {
    super.afterRender(controller);

    let validName:boolean = false;
    let validAdress:boolean = false;
    let validEmail:boolean = false;
    let validTell:boolean = false;
    let validCardName:boolean = false;
    let validCardNumber:boolean = false;
    let validCardDate:boolean = false;
    let validCardCvv:boolean = false;

    // обработка кнопки тестовых платежных данных
    const paymentTest = document.querySelector(".payment-test") as HTMLInputElement;
    paymentTest.addEventListener('click', (event: Event) => {

      nameInput.value = 'Rubi Rhod';
      validName = true;
      nameInput.classList.add('valid');
      nameInput.classList.remove('invalid');

      addressInput.value = "United States, New-York, Times Square";
      validAdress = true;
      addressInput.classList.add('valid');
      addressInput.classList.remove('invalid');

      emailInput.value = "Rubi_Rohod@icloud.com";
      validEmail = true;

      numberInput.value = "+7123456789";
      validTell = true;
      numberInput.classList.add('valid');
      numberInput.classList.remove('invalid');

      nameCardInput.value = "RUBI RHOD";
      validCardName = true;
      nameCardInput.classList.add('valid');
      nameCardInput.classList.remove('invalid');

      cardNumberInput.value = "5761 8744 9011 0008";
      validCardNumber = true;
      cardNumberInput.classList.add('valid');
      cardNumberInput.classList.remove('invalid');
      cardsImg.classList.add("cards__img_mastercard");

      dateInput.value = "04/24";
      validCardDate = true;
      dateInput.classList.add('valid');
      dateInput.classList.remove('invalid');

      cvvInput.value = "344";
      validCardCvv = true;
      cvvInput.classList.add('valid');
      cvvInput.classList.remove('invalid');
    })


    // валидация name
    const nameInput  = document.querySelector(".payment-details__name") as HTMLInputElement;
    nameInput.addEventListener('input', (event: Event) => {

      nameInput.value = nameInput.value.replace(/[^A-Za-z, А-Яа-я]/g, "");
      let arrName = Array.from(nameInput.value.split(' '))
      if (arrName.length >= 2 && arrName.every((el) => el.length >= 3 )){
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
        validName = true;
      } else {
        nameInput.classList.remove('valid');
        nameInput.classList.add('invalid');
        validName = false;
      }
    })

    // валидация adress
    const addressInput = document.querySelector(".payment-details__shipping-address") as HTMLInputElement;
    addressInput.addEventListener('input', (event: Event) => {

      addressInput.value = addressInput.value.replace(/[^\-\A-Za-z, А-Яа-я]/g, "");
      let arrAddress = Array.from(addressInput.value.split(' '))
      if (arrAddress.length >= 3 && arrAddress.every((el) => el.length >= 5)){
        addressInput.classList.add('valid');
        addressInput.classList.remove('invalid');
        validAdress = true;
      } else {
        addressInput.classList.remove('valid');
        addressInput.classList.add('invalid');
        validAdress = false;
      }
    })

    // валидация email
    const emailInput  = document.querySelector(".payment-details__email") as HTMLInputElement;
    emailInput.addEventListener('input', (event: Event) => {
      emailInput.classList.add('invalid');
      validEmail = true;
    })

    // валидация phone-number
    const numberInput  = document.querySelector(".payment-details__phone-number") as HTMLInputElement;
    numberInput.addEventListener('input', (event: Event) => {

      numberInput.value = numberInput.value.replace(/[^\0-9]/g, "").substring(0,16);
      if (numberInput.value.match(/^\+\d{9}/g)){
        numberInput.classList.add('valid');
        numberInput.classList.remove('invalid');
        validTell = true;
      } else {
        numberInput.classList.remove('valid');
        numberInput.classList.add('invalid');
        validTell = false;
      }
    })

    // валидация card number
    const cardNumberInput  = document.querySelector(".card-details__card-number") as HTMLInputElement;
    const cardsImg  = document.querySelector(".cards__img") as HTMLElement;

    cardNumberInput.addEventListener('input', (event: Event) => {
      let arrCardNumber = Array.from(cardNumberInput.value)

      let value = cardNumberInput.value.replace(/[^\d]/g, '').substring(0,16);
      if (value != '') {
        value = value.match(/.{1,4}/g)?.join(' ') || '';
      } else value = '';
      cardNumberInput.value = value;

      switch (arrCardNumber[0]) {
        case '4':
          cardsImg.classList.add("cards__img_visa");
          break;

        case '5':
          cardsImg.classList.add("cards__img_mastercard");
          break;

        case '6':
          cardsImg.classList.add("cards__img_amex");
          break;

        default:
          cardsImg.classList.remove("cards__img_visa");
          cardsImg.classList.remove("cards__img_mastercard");
          cardsImg.classList.remove("cards__img_amex");
          break;
      }

      if (arrCardNumber.length >= 19){
        cardNumberInput.classList.add('valid');
        cardNumberInput.classList.remove('invalid');
        validCardNumber = true;
      } else {
        cardNumberInput.classList.remove('valid');
        cardNumberInput.classList.add('invalid');
        validCardNumber = false;
      }
    })

    // валидация name on card
    const nameCardInput  = document.querySelector(".card-details__name") as HTMLInputElement;
    nameCardInput.addEventListener('input', (event: Event) => {

      nameCardInput.value = nameCardInput.value.replace(/[^\A-Za-z /]/g, "");
      let arrName = Array.from(nameCardInput.value.split(' '));

        if (arrName.length >= 2 && arrName.every((el) => el.length >= 3)) {
            nameCardInput.classList.add('valid');
            nameCardInput.classList.remove('invalid');
            validCardName = true;
        } else {
            nameCardInput.classList.remove('valid');
            nameCardInput.classList.add('invalid');
            validCardName = false;
        }
    })

    // валидация CVV
    const cvvInput  = document.querySelector(".bottom-row__cvv") as HTMLInputElement;
    cvvInput.addEventListener('input', (event: Event) => {

      cvvInput.value = cvvInput.value.replace(/[^\0-9]/g, "").substring(0,3);

      if (cvvInput.value.match(/^\d{3}/g)){
        cvvInput.classList.add('valid');
        cvvInput.classList.remove('invalid');
        validCardCvv = true;
      }
      else {
        cvvInput.classList.remove('valid');
        cvvInput.classList.add('invalid');
        validCardCvv = false;
      };
    })

    // валидация MM/YY
    const dateInput  = document.querySelector(".bottom-row__date") as HTMLInputElement;
    dateInput.addEventListener('input', (event: Event) => {

      let value = dateInput.value.replace(/[^\d]/g, '').substring(0,4);
      if (value != '' ) {
        value = value.match(/.{1,2}/g)?.join('/') || '';
      } else value = '';
      dateInput.value = value;

      if (Number(dateInput.value.substring(0,2)) >= 12) {

        dateInput.classList.add('invalid');
      } else dateInput.classList.remove('invalid');

      if (dateInput.value.match(/.{5}/g) && Number(dateInput.value.substring(0,2)) <= 12){
        dateInput.classList.add('valid');
        dateInput.classList.remove('invalid');
        validCardDate = true;
      }
      else {
        dateInput.classList.remove('valid');
        dateInput.classList.add('invalid');
        validCardDate = false;
      }
    })

    const closeButton = document.querySelector<HTMLElement>('.payment-details__close-btn')
    closeButton?.addEventListener('click', () => {
        this.hide()
    })

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.hide()
        }
    })

    const paymentPage =  document.querySelector<HTMLElement>('.payment-page')
        paymentPage?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hide()
            } else {
                return
            }
        })

    const orderBtn  = document.querySelector(".summary-content__order-btn") as HTMLInputElement;
    if (!orderBtn) {
        return;
    }

    orderBtn.addEventListener('click', (event: Event) => {

      if (validName && validAdress && validEmail &&
          validTell && validCardName && validCardNumber &&
          validCardDate && validCardCvv) {
        orderBtn.textContent = "Your order has been placed!";
        orderBtn.style.color = "green";
        setTimeout(() => {
          for (let i = 1 ; i <= products.length; i++) {
            controller.removeProductFromCartAll(i);
          }
          Router.redirectTo('/');
        }, 3000);
      }
      else {
        orderBtn.textContent = "Check your data";
        orderBtn.style.color = "red";
        setTimeout(() => {
          orderBtn.textContent = "Place order now",
          orderBtn.style.color = "#eee";
        }, 2000);

        // Подсвететка не валидных блоков
        if (!validName) nameInput.classList.add('invalid');
        else nameInput.classList.remove('invalid');

        if (!validAdress) addressInput.classList.add('invalid');
        else addressInput.classList.remove('invalid');

        if (!validEmail) emailInput.classList.add('invalid');
        else emailInput.classList.remove('invalid');

        if (!validTell) numberInput.classList.add('invalid');
        else numberInput.classList.remove('invalid');

        if (!validCardName) nameCardInput.classList.add('invalid');
        else nameCardInput.classList.remove('invalid');

        if (!validCardNumber) cardNumberInput.classList.add('invalid');
        else cardNumberInput.classList.remove('invalid');

        if (!validCardDate) dateInput.classList.add('invalid');
        else dateInput.classList.remove('invalid');

        if (!validCardCvv) cvvInput.classList.add('invalid');
        else cvvInput.classList.remove('invalid');
      }
    })
  }
}
