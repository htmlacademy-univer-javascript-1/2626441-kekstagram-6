import {
  imgUploadPreview,
  effectsList,
  effectLevelSlider,
  effectLevelValue,
  effectLevelContainer
} from './form-constants.js';

const EFFECTS = {
  none: {
    filter: '',
    unit: '',
    options: { range: { min: 0, max: 1 }, start: 1, step: 1 }
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 }
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 }
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: { range: { min: 0, max: 100 }, start: 100, step: 1 }
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: { range: { min: 0, max: 3 }, start: 3, step: 0.1 }
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
  }
};

let currentEffect = 'none';

if (typeof noUiSlider !== 'undefined') {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 1,
    connect: 'lower'
  });
}

effectLevelContainer.classList.add('hidden');

const applyEffect = (name) => {
  currentEffect = name;
  const effect = EFFECTS[name];

  if (name === 'none') {
    imgUploadPreview.style.filter = '';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  if (typeof noUiSlider !== 'undefined') {
    effectLevelSlider.noUiSlider.updateOptions(effect.options);
  }
};

if (typeof noUiSlider !== 'undefined') {
  effectLevelSlider.noUiSlider.on('update', () => {
    const effect = EFFECTS[currentEffect];
    const value = effectLevelSlider.noUiSlider.get();

    effectLevelValue.value = value;

    if (currentEffect === 'none') {
      imgUploadPreview.style.filter = '';
    } else {
      imgUploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
    }
  });
}

effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    applyEffect(evt.target.value);
  }
});

export const resetEffects = () => applyEffect('none');

export function initEffects() {
  resetEffects();
}
