import { renderPictures } from './pictures.js';

const FILTER_RANDOM_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

let photos = [];

function debounce(callback, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const getDefaultPhotos = () => photos;

const getRandomPhotos = () => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, FILTER_RANDOM_COUNT);
};

const getDiscussedPhotos = () =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const filterMap = {
  [FilterType.DEFAULT]: getDefaultPhotos,
  [FilterType.RANDOM]: getRandomPhotos,
  [FilterType.DISCUSSED]: getDiscussedPhotos,
};

const renderByFilter = debounce((filterType) => {
  const filteredPhotos = filterMap[filterType]();
  renderPictures(filteredPhotos);
}, DEBOUNCE_DELAY);

function onFilterClick(evt) {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  const filterType = evt.target.id.replace('filter-', '');
  renderByFilter(filterType);
}

function initFilters(loadedPhotos) {
  photos = loadedPhotos;

  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  filtersContainer.addEventListener('click', onFilterClick);

  renderPictures(photos);
}

export { initFilters };
