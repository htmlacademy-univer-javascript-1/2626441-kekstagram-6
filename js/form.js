//'use strict';

import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

import {
  uploadForm,
  uploadInput,
  uploadOverlay,
  uploadCancel,
} from './form-constants.js';

import * as PristineModule from '../vendor/pristine/pristine.js';
import { resetEffects } from './effects.js';

const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('#upload-submit');

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

let pristine = null;

function parseHashtags(value) {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);
}

function validateHashtags(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = parseHashtags(value);

  if (tags.length > MAX_HASHTAGS) {
    return false;
  }

  if (!tags.every((tag) => HASHTAG_REGEX.test(tag))) {
    return false;
  }

  return new Set(tags).size === tags.length;
}

function getHashtagError(value) {
  if (!value.trim()) {
    return '';
  }

  const tags = parseHashtags(value);

  if (tags.length > MAX_HASHTAGS) {
    return `Не более ${MAX_HASHTAGS} хэштегов`;
  }

  for (const tag of tags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return 'Неверный формат хэштега';
    }
  }

  if (new Set(tags).size !== tags.length) {
    return 'Хэштеги не должны повторяться';
  }

  return '';
}

function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

function closeForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
  uploadInput.value = '';

  resetEffects();

  document.removeEventListener('keydown', onEscKey);
}

function onEscKey(evt) {
  if (evt.key === 'Escape') {
    const active = document.activeElement;
    if (active === hashtagsField || active === commentField) {
      evt.stopPropagation();
      return;
    }
    closeForm();
  }
}

function openForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  pristine = new PristineModule.default(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error',
  });

  pristine.addValidator(hashtagsField, validateHashtags, getHashtagError);
  pristine.addValidator(commentField, validateComment, 'Не более 140 символов');

  resetEffects();

  document.addEventListener('keydown', onEscKey);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  submitButton.disabled = true;

  const formData = new FormData(uploadForm);

  sendData(formData)
    .then(() => {
      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButton.disabled = false;
    });
}


export function initForm() {
  uploadInput.addEventListener('change', openForm);
  uploadCancel.addEventListener('click', closeForm);
  uploadForm.addEventListener('submit', onFormSubmit);
}
