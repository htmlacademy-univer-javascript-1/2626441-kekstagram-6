//'use strict';

import { PHOTOS } from './data.js';
import { renderPictures } from './pictures.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';

function initApp() {
  renderPictures(PHOTOS);
  initForm();
  initEffects();
  initScale();
}

initApp();
