import { getCarsApi, startEngineApi, driveEngineApi, stopEngineApi, getCarApi, createWinnerApi, getAllWinnersApi, updateWinnerApi, countAllCars } from './api';
import { createCarUi } from './ui';
// import { createWinnerAPI, getAllWinnersAPI, updateWinnerAPI } from '../winners/api_winners';
// import { updateWinnersUI } from '../winners/buttons_winners';
// import { numberPage } from './buttons_garage';
import { infoCar } from './random_cars';
import { numberPage } from './garage_buttons'

import { addWinner } from './winners'







const btnResetRace = <HTMLButtonElement>document.querySelector('.btn-reset');
const btnRace = <HTMLButtonElement>document.querySelector('.btn-race');
const infoAnimation: { [id: number] : infoCar; } = {};
const noticeWinner = <HTMLElement>document.querySelector('.winner-notice');
const containerRace = <HTMLElement>document.querySelector('.field-control');
const btnStartRave = <HTMLButtonElement>document.querySelector('.btn-race');
const btnStopRace = <HTMLButtonElement>document.querySelector('.btn-reset');
let time: number; 
let resultRace: HTMLElement[] = [];






// export let numberPage = 1;
const containerCar = <HTMLElement>document.querySelector('.container-car');
const countGarage = <HTMLElement>document.querySelector('.count-garage');



//ОБНОВЛЕНИЕ МАШИНОК
export const updateCarsUi = () => {
    getCarsApi(numberPage).then((arr: infoCar[]) => {
      containerCar.innerHTML = '';
      arr.forEach((car) => {
        const oneCar = `${createCarUi(car.id, car.name, car.color)}`;
        containerCar.innerHTML += oneCar;
      });
      countGarage.textContent = `(${countAllCars})`;
    });
  };
  updateCarsUi();


//АНИМАЦИЯ
function animationCar(car: HTMLElement, distance: number, duration: number) {
  let startTime = 0;
  const idAnime = <infoCar>{};
  
  function step(timestamp: number) {
    if (!startTime) {
      startTime = timestamp;
    }
    console.log
    const progress = (timestamp - startTime) / duration;
    const translate: number = progress * distance; 
    car.style.transform = `translateX(${translate}px)`;
    
    if (progress < 1) {
        idAnime.id = window.requestAnimationFrame(step);
    }
    if (progress >= 1 && !btnResetRace.hasAttribute('disabled')) {
      if (resultRace.length === 0) addWinner(car, duration);
      resultRace.push(car);
    }
  }
  idAnime.id = window.requestAnimationFrame(step);
  return idAnime;
}

  const startCar = async (idCar: number) => {
    startEngineApi(idCar).then((obj) => {
      const velocity = Number(obj.velocity);
      const distance = Number(obj.distance);
      time = distance / velocity;
      const car = <HTMLElement>document.getElementById(`car-${idCar}`);
      const screenWidth = document.body.clientWidth;
      const positionCar = screenWidth / 100 * 15;
      const distanceAnimation = screenWidth - positionCar;
      // console.log(time)
      infoAnimation[idCar] = animationCar(car, distanceAnimation, time);
      driveEngineApi(idCar).then((drive) => {
        if (!drive.success) {
          window.cancelAnimationFrame(infoAnimation[idCar].id);
        }
      });
    });
  };
  
  export const stopCar = async (idStop: number) => {
    stopEngineApi(idStop).then(() => {
      window.cancelAnimationFrame(infoAnimation[idStop].id);
      const car = <HTMLElement>document.getElementById(`car-${idStop}`);
      car.style.transform = 'translateX(0px)';
    });
  };


  export const startRaceCars = async (page: number) => {
    getCarsApi(page, 7).then((arrCars: infoCar[]) => 
    arrCars.forEach((elem) => startCar(elem.id)));
  };


  export const stopRaceCars = async (page: number) => {
    getCarsApi(page, 7).then((arrCars: infoCar[]) => {
     arrCars.forEach((elem) => stopCar(elem.id));
    });
    resultRace = [];
    noticeWinner.innerHTML = '';
  };


  document.addEventListener('click', async (e) => {
    const btn = e.target as HTMLElement;
  
    if (btn.classList.contains('car-control-start')) {
      const idCar = Number(btn.dataset.start);
      startCar(idCar);
      const btnStart = <HTMLButtonElement>document.getElementById(`start-${idCar}`);
      const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idCar}`);
      btnStart.setAttribute('disabled', 'disabled');
      btnStop.removeAttribute('disabled');
    }
  
    if (btn.classList.contains('car-control-stop')) {
      const idCar = Number(btn.dataset.stop);
      stopCar(idCar);
      const btnStart = <HTMLButtonElement>document.getElementById(`start-${idCar}`);
      const btnStop = <HTMLButtonElement>document.getElementById(`stop-${idCar}`);
      btnStop.setAttribute('disabled', 'disabled');
      btnStart.removeAttribute('disabled');
    }

    if (btn.classList.contains('btn-race')) {
      startRaceCars(numberPage);
      btnStartRave.setAttribute('disabled', 'disabled');
      btnStopRace.removeAttribute('disabled');
    }

    if (btn.classList.contains('btn-reset')) {
      stopRaceCars(numberPage);
      btnStopRace.setAttribute('disabled', 'disabled');
      btnStartRave.removeAttribute('disabled');
    }

  });


