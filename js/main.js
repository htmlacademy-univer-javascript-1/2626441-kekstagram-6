import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { showErrorMessage } from './messages.js';
import { initFilters } from './filters.js';

function initApp() {
  getData()
    .then((photos) => {
      renderPictures(photos);
      initFilters(photos);
    })
    .catch(() => {
      showErrorMessage();
    });

  initForm();
  initEffects();
  initScale();
}

initApp();
