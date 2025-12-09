//'use strict';

import {
  imgUploadPreview,
  scaleControlSmaller,
  scaleControlBigger,
  scaleControlValue
} from './form-constants.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

let currentScale = 100;

function applyScale(value) {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
}

function decreaseScale() {
  currentScale = Math.max(MIN_SCALE, currentScale - STEP);
  applyScale(currentScale);
}

function increaseScale() {
  currentScale = Math.min(MAX_SCALE, currentScale + STEP);
  applyScale(currentScale);
}

export function resetScale() {
  currentScale = 100;
  applyScale(currentScale);
}

export function initScale() {
  applyScale(currentScale);
  scaleControlSmaller.addEventListener('click', decreaseScale);
  scaleControlBigger.addEventListener('click', increaseScale);
}
