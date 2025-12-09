//'use strict';

import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { showErrorMessage } from './messages.js';

function initApp() {
  getData()
    .then((photos) => {
      renderPictures(photos);
      document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showErrorMessage();
    });

  initForm();
  initEffects();
  initScale();
}

initApp();
