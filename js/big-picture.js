//'use strict';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const bigImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const descriptionEl = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeBtn = bigPicture.querySelector('#picture-cancel');

//let currentPhoto = null;

function createComment({ avatar, name, message }) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  li.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35"
      height="35"
    >
    <p class="social__text">${message}</p>
  `;

  return li;
}

function openBigPicture(photoData) {
  //currentPhoto = photoData;

  bigImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  descriptionEl.textContent = photoData.description;

  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  photoData.comments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });
  commentsList.appendChild(fragment);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKey);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKey);
}

function onEscKey(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

closeBtn.addEventListener('click', closeBigPicture);


export {openBigPicture};
