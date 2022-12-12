import { getWinnersApi,  getCarApi, countAllWinners, createWinnerApi, getAllWinnersApi, updateWinnerApi, deleteWinnerApi, deleteCarApi, countAllCars } from './api';
import { createWinnerUi } from './ui';
import { infoCar } from './random_cars';

export let numberPageWinners = 1;


const containerWinners = <HTMLElement>document.querySelector('.container-win');
const countWinners = <HTMLElement>document.querySelector('.count-winners');
const btnPrevWinners = <HTMLButtonElement>document.querySelector('.btn-prev-win');
const btnNextWinners = <HTMLButtonElement>document.querySelector('.btn-next-win');
const numPageWinners = <HTMLElement>document.querySelector('.count-page_winners');
const noticeWinner = <HTMLElement>document.querySelector('.winner-notice');


export function addWinner(carWinner: HTMLElement, timeWinner: number) {``
    const idWinner = Number(carWinner.dataset.car);``
    let timeWin = (timeWinner / 1000).toFixed(2);
    let wins = 1;
    let nameWinner;
    getCarApi(idWinner).then((arr) => {
      nameWinner = arr.name;
      noticeWinner.style.display = 'block'
      noticeWinner.innerHTML = `${nameWinner} went first (${timeWin}s) !`;
    });
  
    getAllWinnersApi().then((arrAllWin: infoCar[]) => {
      arrAllWin.forEach((item) => {
        if (Number(item.id) === idWinner) {
          wins = item.wins + 1;
          timeWin = (Number(item.time) < Number(timeWin) ? item.time : timeWin).toString();
        }
      });
      }).then(() => {
        if (wins > 1) {
          updateWinnerApi({ 'wins': wins, 'time': timeWin }, idWinner);
        } else {
          createWinnerApi({ 'id': idWinner, 'wins': wins, 'time': timeWin });
        }
      }).then(() => updateWinnersUi());
  }


//ОБНОВИТЬ ПОБЕДИТЕЛЕЙ
export const updateWinnersUi = () => {
  let num = numberPageWinners * 10 - 10;

  getWinnersApi(numberPageWinners).then((arr: infoCar[]) => {
    containerWinners.innerHTML = '';

    arr.forEach((car, index) => {
      let name = '';
      let color = '';
      getCarApi(car.id).then((oneCar) => {
        name = oneCar.name;
        color = oneCar.color;
        num += 1;

        const oneWinner = `${createWinnerUi(num, color, name, car.wins, car.time)}`;
        containerWinners.innerHTML += oneWinner;
      });
    });
    countWinners.textContent = `(${countAllWinners})`;
  });
};
updateWinnersUi();


//ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ С ПОБЕДИТЕЛЯМИ
btnPrevWinners.addEventListener('click', () => {
  if (numberPageWinners === 1) {
    btnPrevWinners.setAttribute('disabled', 'disabled');
  } else {
    btnNextWinners.removeAttribute('disabled');
    numberPageWinners -= 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUi();
});

btnNextWinners.addEventListener('click', () => {
  if (numberPageWinners * 10 >= countAllWinners) {
    btnNextWinners.setAttribute('disabled', 'disabled');
  } else {
    btnPrevWinners.removeAttribute('disabled');
    numberPageWinners += 1;
    numPageWinners.textContent = `${numberPageWinners}`;
  }
  updateWinnersUi ();
});
