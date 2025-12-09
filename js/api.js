//'use strict';

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = () =>
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      return response.json();
    });

const sendData = (body) =>
  fetch(BASE_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки: ${response.status}`);
      }
      return response.json();
    });

export { getData, sendData };
