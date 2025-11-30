'use strict';

import {PHOTOS} from './data.js';
import {renderPictures} from './pictures.js';

function initApp() {
  renderPictures(PHOTOS);
}

initApp();
