//'use strict';

import * as PristineModule from '../vendor/pristine/pristine.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

let pristine = null;

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value
    .toLowerCase()
    .trim()
    .split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const regex = /^#[a-zа-яё0-9]{1,19}$/i;

  const allValid = hashtags.every((tag) => regex.test(tag));
  if (!allValid) {
    return false;
  }

  const hasDuplicates = hashtags.length !== new Set(hashtags).size;

  return !hasDuplicates;
};

const getHashtagError = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.trim().split(/\s+/);
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > MAX_HASHTAGS) {
    return `Не более ${MAX_HASHTAGS} хэштегов`;
  }

  for (const tag of hashtags) {
    if (!regex.test(tag)) {
      return 'Неверный формат хэштега';
    }
  }

  const hasDuplicates = hashtags.length !== new Set(hashtags).size;

  if (hasDuplicates) {
    return 'Хэштеги не должны повторяться';
  }

  return '';
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  uploadInput.value = '';

  document.removeEventListener('keydown', onEscKey);
};

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

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  pristine = new PristineModule.default(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error',
  });

  pristine.addValidator(hashtagsField, validateHashtags, getHashtagError);
  pristine.addValidator(commentField, validateComment, 'Не более 140 символов');

  document.addEventListener('keydown', onEscKey);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const valid = pristine.validate();

  if (!valid) {
    return;
  }

  form.submit();
};

export function initForm() {
  uploadInput.addEventListener('change', openForm);
  uploadCancel.addEventListener('click', closeForm);
  form.addEventListener('submit', onFormSubmit);
}
