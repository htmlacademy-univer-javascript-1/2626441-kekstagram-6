//'use strict';

import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

let currentPopup = null;

function closePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closePopup();
  }
}

function showMessage(template) {
  currentPopup = template.cloneNode(true);
  document.body.append(currentPopup);

  const button = currentPopup.querySelector('button');

  button.addEventListener('click', closePopup);

  currentPopup.addEventListener('click', (evt) => {
    if (evt.target === currentPopup) {
      closePopup();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
}

function showSuccessMessage() {
  showMessage(successTemplate);
}

function showErrorMessage() {
  showMessage(errorTemplate);
}

export { showSuccessMessage, showErrorMessage };
