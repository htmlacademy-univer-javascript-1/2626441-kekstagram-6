//'use strict';

const COMMENTS_PER_STEP = 5;

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

let allComments = [];
let renderedComments = 0;

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

function updateCommentsCounter() {
  commentCountBlock.textContent = `${renderedComments} из ${allComments.length} комментариев`;
}

function renderCommentsChunk() {
  const next = allComments.slice(renderedComments, renderedComments + COMMENTS_PER_STEP);

  next.forEach((comment) => {
    commentsList.appendChild(createComment(comment));
  });

  renderedComments += next.length;
  updateCommentsCounter();

  if (renderedComments >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function openBigPicture(photo) {
  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  descriptionEl.textContent = photo.description;

  allComments = photo.comments;
  renderedComments = 0;

  commentsList.innerHTML = '';
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderCommentsChunk();

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
commentsLoader.addEventListener('click', renderCommentsChunk);

export { openBigPicture };
