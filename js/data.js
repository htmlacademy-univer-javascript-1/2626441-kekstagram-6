'use strict';

import {getRandomArrayElement, getRandomInteger} from './util.js';
import {NAMES, MESSAGES, DESCRIPTIONS} from './constants.js';

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES)
});

const createPost = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, (_, i) => createComment(i + id * 1000))
});

const PHOTOS = Array.from({length: 25}, (_, i) => createPost(i + 1));

export {PHOTOS};
