//'use strict';

import {PHOTOS} from './data.js';
import {renderPictures} from './pictures.js';
import { initForm } from './form.js';

function initApp() {
  renderPictures(PHOTOS);
  initForm();
}

initApp();
