//'use strict';

import { openBigPicture } from './big-picture.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureContainer = document.querySelector('.pictures');

function createPictureElement(photo) {
  const { url, description, likes, comments } = photo;

  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = url;
  img.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', () => {
    openBigPicture(photo);
  });

  return pictureElement;
}

function renderPictures(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(fragment);
}

export { renderPictures };
