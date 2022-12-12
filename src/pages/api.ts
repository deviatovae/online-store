const requestsAddress = 'http://127.0.0.1:3000';
const garage = `${requestsAddress}/garage`;
const engine = `${requestsAddress}/engine`;
const winners = `${requestsAddress}/winners`;

  //Car

export let countAllCars = 0;

export const getCarsApi = async (page: number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  
  countAllCars = Number(response.headers.get('X-Total-count'));
  return response.json();
};

export const getCarApi = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'GET' })).json();

export const createCarApi = async (body: object) => (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
})).json();

export const deleteCarApi = async (id: number) => (await fetch(`${garage}/${id}`, {method: 'DELETE'})).json();

export const updateCarApi = async (body: object, id: number) => (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
})).json();


  //Engine

export const startEngineApi = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngineApi = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const driveEngineApi = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

// Winners

export let countAllWinners = 0;

export const getAllWinnersApi = async () => {
  const response = await fetch(`${winners}`, { method: 'GET' });
  return response.json();
};

export const getWinnersApi = async (page: number, limit = 10) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}`, { method: 'GET' });
  countAllWinners = Number(response.headers.get('X-Total-count'));
  return response.json();
};

export const getWinnerApi = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'GET' })).json();

export const deleteWinnerApi = async (id: number) => (await fetch(`${winners}/${id}`, {method: 'DELETE'})).json();

export const createWinnerApi = async (body: object) => (await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
    'Content-Type': 'application/json'
    },
})).json();

export const updateWinnerApi = async (body: object, id: number) => (await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
})).json();

// console.log()