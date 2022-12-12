import {imageCarUi} from './image_car'

export const createCarUi = (id: number, name: string, color: string) =>
  `<div class="car">
    <div class="car-options">
      <button class="buttons car-options-select" data-select=${id}>Select</button>
      <button class="buttons car-options-remove" data-remove=${id}>Remove</button>
      <h4 class="car-options-title">${name}</h4>
    </div>
    <div class="car-control">
      <button class="car-control-start" id="start-${id}" data-start=${id} >Start</button>
      <button class="car-control-stop" id="stop-${id}" data-stop=${id} disabled="true">Stop</button>
      <div class="car-img" id="car-${id}" data-car=${id}>${imageCarUi(color)}</div>
      <div class="flag"></div>
    </div>
  </div>
`;

export const createWinnerUi = (num: number, color: string, name: string, wins: number, bestTime: number) =>
  `<tr">
    <td>${num}</td>
    <td>${imageCarUi(color)}</td>
    <td>${name}</td>
    <td>${wins}</td>
    <td>${bestTime}</td>
  </tr>
`;

const header: string = `
  <header class="header">
    <div class="nav">
      <button class="buttons btn-garage active">To garage</button>
      <button class="buttons btn-winners">To winners</button>
    </div>
  </header>
  `
const winnersPage: string = `
<div class="page winners-page hide">
  <h1 class="title title-winners">Winners <span class="count-winners"></span></h1>
  <h3 class="title title-winners">Page #<span class="count-page_winners">1</span></h3>
    <div class="container-winners">
      <table class="table-winners">
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (seconds)</th>
          </tr>
        </thead>
        <tbody class="container-win">
        </tbody>
      </table>
    </div>
  <div class="pagination pagination-win">
    <button class="buttons btn-prev-win">Prev</button>
    <button class="buttons btn-paginstion-win">
    <span class="count-page-paginstion">1</span>
    </button>
    <button class="buttons btn-next-win">Next</button>
   </div>
</div>
`
const main: string = `
  <main class="main">
    <div class="page garage-page">
      <div class="generate-cars">
        <div class="field-create">
          <input class="generate-input-text text-create" type="text" autocomplete placeholder="Enter name сar...">
          <input class="generate-input-color color-create" type="color">
          <button class="buttons btn-create">create</button>
        </div>
        <div class="field-update">
          <input class="generate-input-text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
          <input class="generate-input-color color-update" type="color" disabled="true">
          <button class="buttons btn-update" disabled="true">update</button>
        </div>
        <div class="field-control">
          <button class="buttons btn-race">race</button>
          <button class="buttons btn-reset" disabled>reset</button>
          <button class="buttons btn-generate-cars">generate 100 cars</button>
          <button class="buttons btn-delete-cars">delete this car page</button>
        </div>
      </div>
      <div class="container-garage">
        <h1 class="title">Garage <span class="count-garage"></span></h1>
        <h3 class="title">Page #<span class="count-page">1</span></h3>
        <div class="container-car"></div>
      </div>
      <div class="pagination">
        <button class="buttons btn-prev">Prev</button>
        <button class="buttons btn-paginstion">
        <span class="count-page-paginstion">1</span>
        </button>
        <button class="buttons btn-next">Next</button>
      </div>
      <div class="winner-notice"></div>
    </div>
    ${winnersPage}
  </main>
`
const footer: string = `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-github">
        <a class="github-link" href="https://github.com/AlexeiKozlovskiy" target="_blank">
        <div class="github">
          <div class="github-link-img"></div>
          <div class="github-link-text">My GitHub</div>
        </div>
        </a>
      </div>
      <div class="footer-copyright">© 2022 by Aleksei Kozlovsky</div>
      <div class="footer-rsschool">
        <a class="rsschool-link" href="https://rs.school/js/" target="_blank">
          <div class="rsschool-logo"</div>
        </a>
      </div>
    </div>
  </footer>
`

const createBodyUi = () => {
  const container = document.createElement('div');
  container.className = ('container')
  container.innerHTML = header + main + footer;
  document.body.appendChild(container);
};

createBodyUi();

const btnGarage = <HTMLElement>document.querySelector('.btn-garage');
const btnWinners = <HTMLElement>document.querySelector('.btn-winners');
const pageGarage = <HTMLElement>document.querySelector('.garage-page');
const pageWinners = <HTMLElement>document.querySelector('.winners-page');

btnGarage.addEventListener('click', () => {
  pageWinners.classList.add('hide');
  pageGarage.classList.remove('hide');
  btnWinners.classList.remove('active');
  btnGarage.classList.add('active');
});

btnWinners.addEventListener('click', () => {
  pageGarage.classList.add('hide');
  pageWinners.classList.remove('hide');
  btnWinners.classList.add('active');
  btnGarage.classList.remove('active');
});


