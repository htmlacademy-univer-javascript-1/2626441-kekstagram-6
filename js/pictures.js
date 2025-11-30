'use strict';

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureContainer = document.querySelector('.pictures');

function createPictureElement({url, description, likes, comments}) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
}

function renderPictures(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });

  pictureContainer.appendChild(fragment);
}

export {renderPictures};
