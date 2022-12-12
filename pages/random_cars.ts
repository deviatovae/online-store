import { brands, models } from './models_cars';

export const getRandomColor =  () => {
  const arrColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let randomColor = '';
  for (let i = 1; i < 7; i++ ) {
    const randomNum = Math.floor(Math.random() * arrColors.length);
    randomColor += arrColors[randomNum];
  }
  return `#${randomColor}`;
};

export const getRandomName =  () => {
    const randomBrand = Math.floor(Math.random() * brands.length);
    const randomModel = Math.floor(Math.random() * models.length);
    return brands[randomBrand] + ' ' + models[randomModel];
};

export type infoCar = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};

