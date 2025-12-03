import * as PristineModule from '../vendor/pristine/pristine.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

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

  const hasDuplicates = new Set(tags).size !== tags.length;
  return !hasDuplicates;
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

  form.reset();
  uploadInput.value = '';

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

  pristine = new PristineModule.default(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error',
  });

  pristine.addValidator(hashtagsField, validateHashtags, getHashtagError);
  pristine.addValidator(commentField, validateComment, 'Не более 140 символов');

  document.addEventListener('keydown', onEscKey);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  form.submit();
}

export function initForm() {
  uploadInput.addEventListener('change', openForm);
  uploadCancel.addEventListener('click', closeForm);
  form.addEventListener('submit', onFormSubmit);
}
