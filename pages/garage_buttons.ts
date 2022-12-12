import { getCarsApi, createCarApi, updateCarApi, startEngineApi, driveEngineApi, stopEngineApi, getCarApi, createWinnerApi, getAllWinnersApi, updateWinnerApi, deleteWinnerApi, deleteCarApi, countAllCars } from './api';
import { createCarUi } from './ui';
import { getRandomName, getRandomColor, infoCar } from './random_cars';
import { updateCarsUi } from './drive'

import { updateWinnersUi } from './winners'


const btnGenerateCars = <HTMLElement>document.querySelector('.btn-generate-cars');
const btnPrevCars = <HTMLButtonElement>document.querySelector('.btn-prev');
const btnNextCars = <HTMLButtonElement>document.querySelector('.btn-next');
const numPage = <HTMLSpanElement>document.querySelector('.count-page');
const countPagePaginstion = <HTMLSpanElement>document.querySelector('.count-page-paginstion');
const generateNewCarBtn = <HTMLElement>document.querySelector('.generate-cars');
const btnGenerateCards = <HTMLElement>document.querySelector('.btn-generate_cars');
const containerCar = <HTMLElement>document.querySelector('.container-car');
const countGarage = <HTMLElement>document.querySelector('.count-garage');
const inputTextCreate = <HTMLInputElement>document.querySelector('.text-create');
const inputColorCreate = <HTMLInputElement>document.querySelector('.color-create');
const inputTextUpdate = <HTMLInputElement>document.querySelector('.text-update');
const inputColorUpdate = <HTMLInputElement>document.querySelector('.color-update');
const btnUpdate = <HTMLInputElement>document.querySelector('.btn-update');
const btnResetRace = <HTMLButtonElement>document.querySelector('.btn-reset');
const btnRace = <HTMLButtonElement>document.querySelector('.btn-race');
let resultRace: HTMLElement[] = [];
const noticeWinner = <HTMLElement>document.querySelector('.winner-notice');



let idUpdateCar: number;
export let numberPage = 1;


document.addEventListener('DOMContentLoaded', () => {
  if (numberPage === 1) {
    btnPrevCars.setAttribute('disabled', 'disabled');
    btnNextCars.setAttribute('disabled', 'disabled');
  }
})

//генерация 100 машинок
btnGenerateCars.addEventListener('click', () => {
    for (let i = 0; i < 100; i++){
      const name = getRandomName();
      const color = getRandomColor();
      createCarApi({ 'name': `${name}`, 'color': `${color}` });
    }
    updateCarsUi();
    btnNextCars.removeAttribute('disabled');
  });


  // Prev пагинации
  btnPrevCars.addEventListener('click', () => {
    numberPage -= 1;
    numPage.textContent = `${numberPage}`;
    countPagePaginstion.textContent = `${numberPage}`;
    if (numberPage === 1) {
      btnPrevCars.setAttribute('disabled', 'disabled');
      btnNextCars.removeAttribute('disabled');
    }
    else {
      btnNextCars.removeAttribute('disabled');
    }
    updateCarsUi();
    resetRace();
 
  });

  // Next пагинации
  btnNextCars.addEventListener('click', () => {
    numberPage += 1;
    numPage.textContent = `${numberPage}`;
    countPagePaginstion.textContent = `${numberPage}`;
    btnPrevCars.removeAttribute('disabled');
    if (numberPage * 7 >= countAllCars) {
      btnNextCars.setAttribute('disabled', 'disabled');
    }
     else {
      btnPrevCars.removeAttribute('disabled');
    }
    updateCarsUi();
    resetRace();
  });


  //удаление и инициализация изменения существующей машинки
  document.addEventListener('click', async (e) => {
  const btn = e.target as HTMLElement;

  if (btn.classList.contains('car-options-select')) {
    idUpdateCar = Number(btn.dataset.select);
    inputTextUpdate.disabled = false;
    inputColorUpdate.disabled = false;
    btnUpdate.disabled = false;

    getCarApi(idUpdateCar).then((item) => {
      inputTextUpdate.value = item.name;
      inputColorUpdate.value = item.color;
    });
  }

  if (btn.classList.contains('car-options-remove')) {
    const idButton = Number(btn.dataset.remove);
    deleteCarApi(idButton).then(() => updateCarsUi());
    console.log(btn.dataset.remove)

    getAllWinnersApi().then((arrAllWin) => {
      arrAllWin.forEach((item: infoCar) => {
        if (Number(item.id) === idButton) deleteWinnerApi(idButton);
      });
    }).then(() => updateWinnersUi());
    
    if (countAllCars+1 != 1 && countAllCars % 7 === 0 ) {
      btnNextCars.removeAttribute('disabled');
    }

  }

  // удаление 7 машин (страницы)
  if (btn.classList.contains('btn-delete-cars')) {
    console.log(countAllCars)

      getCarsApi(numberPage).then((arr: infoCar[]) => {
        containerCar.innerHTML = '';
        arr.forEach((car) => {
          deleteCarApi(car.id).then(() => updateCarsUi());
        });
        countGarage.textContent = `(${countAllCars})`;
      });
      if (numberPage === 1) {
        btnPrevCars.setAttribute('disabled', 'disabled');
      }
      if (numberPage * 7 >= countAllCars) {
        btnNextCars.setAttribute('disabled', 'disabled');
      }
    }
});


//создание новой и обновление существующей машины
generateNewCarBtn.addEventListener('click', (e) => {
  const elem = e.target as HTMLElement;

  if (elem.classList.contains('btn-create')) {
    const nameNewCar =  inputTextCreate.value;
    const colorNewCar =  inputColorCreate.value;
    if (nameNewCar === '') {
      alert('Please, enter name car!');
    } else {
      (createCarApi({ 'name': nameNewCar, 'color': colorNewCar })).then(() => updateCarsUi());
    }
    console.log(countAllCars)
    if (countAllCars+1 != 1 && countAllCars % 7 === 0 ) {
      btnNextCars.removeAttribute('disabled');
    }
    inputTextCreate.value = '';
  }

  if (elem.classList.contains('btn-update')) {
    const nameUpdateCar =  inputTextUpdate.value;
    const colorUpdateCar =  inputColorUpdate.value;
    (updateCarApi( { 'name': nameUpdateCar, 'color': colorUpdateCar }, idUpdateCar)).then(() => updateCarsUi() );
    inputTextUpdate.value = '';
    inputTextUpdate.disabled = true;
    inputColorUpdate.disabled = true;
    btnUpdate.disabled = true;
  }
});

  export function resetRace() {
    if (!btnResetRace.hasAttribute('disabled')) {
      btnResetRace.setAttribute('disabled', 'disabled');
      btnRace.removeAttribute('disabled');
      resultRace = [];
      noticeWinner.innerHTML = '';
    }
  }