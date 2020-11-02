'use strict';

(function () {
  const SCALE_VALUE_STEP = 25;
  const SCALE_VALUE_MAX = 100;
  const SCALE_VALUE_MIN = 0;
  const DEFAULT_LEVEL = 100;

  const imgPreview = document.querySelector(`.img-upload__img`);
  const effectSlider = document.querySelector(`.img-upload__effect-level`);
  const effectInputValue = document.querySelector(`.effect-level__value`);
  const effectList = document.querySelector(`.effects__list`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const scaleValueNumber = scaleValue.value.split(`%`);

  window.previewEditor = {
    filterChangeHandler: function (evt) {
      if (evt.target && evt.target.matches(`input[id="effect-none"]`)) {
        imgPreview.className = ``;
        effectSlider.classList.add(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-chrome"]`)) {
        imgPreview.className = `effects__preview--chrome`;
        effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-sepia"]`)) {
        imgPreview.className = `effects__preview--sepia`;
        effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-marvin"]`)) {
        imgPreview.className = `effects__preview--marvin`;
        effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-phobos"]`)) {
        imgPreview.className = `effects__preview--phobos`;
        effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-heat"]`)) {
        imgPreview.className = `effects__preview--heat`;
        effectSlider.classList.remove(`hidden`);
      }
    },
    effectDefaultHandler: function (evt) {
      if (evt.target && evt.target.matches(`input[name="effect"]`)) {
        effectInputValue.setAttribute(`value`, DEFAULT_LEVEL);
        if (effectList.querySelector(`input[id="effect-none"]`).checked) {
          imgPreview.style.filter = `none`;
        } else if (effectList.querySelector(`input[id="effect-chrome"]`).checked) {
          imgPreview.style.filter = `grayscale(` + (effectInputValue.value / 100) + `)`;
        } else if (effectList.querySelector(`input[id="effect-sepia"]`).checked) {
          imgPreview.style.filter = `sepia(` + (effectInputValue.value / 100) + `)`;
        } else if (effectList.querySelector(`input[id="effect-marvin"]`).checked) {
          imgPreview.style.filter = `invert(` + (effectInputValue.value) + `%)`;
        } else if (effectList.querySelector(`input[id="effect-phobos"]`).checked) {
          imgPreview.style.filter = `blur(` + (effectInputValue.value * 3 / 100) + `px)`;
        } else if (effectList.querySelector(`input[id="effect-heat"]`).checked) {
          imgPreview.style.filter = `brightness(` + (1 + (effectInputValue.value * 2 / 100)) + `)`;
        }
      }
    },
    scaleChangeHandler: function (evt) {
      if (evt.target && evt.target.matches(`.scale__control--smaller`)) {
        scaleValueNumber[0] = scaleValueNumber[0] - SCALE_VALUE_STEP;
        scaleValue.value = scaleValueNumber[0] + `%`;
        imgPreview.style.transform = `scale(0.` + scaleValueNumber[0] + `)`;
        if (scaleValueNumber[0] <= SCALE_VALUE_MIN) {
          scaleValueNumber[0] = SCALE_VALUE_MIN;
          scaleValue.value = scaleValueNumber[0] + `%`;
        }
      }
      if (evt.target && evt.target.matches(`.scale__control--bigger`)) {
        scaleValueNumber[0] = Number(scaleValueNumber[0]) + Number(SCALE_VALUE_STEP);
        scaleValue.value = scaleValueNumber[0] + `%`;
        imgPreview.style.transform = `scale(0.` + scaleValueNumber[0] + `)`;
        if (scaleValueNumber[0] >= SCALE_VALUE_MAX) {
          scaleValueNumber[0] = SCALE_VALUE_MAX;
          scaleValue.value = scaleValueNumber[0] + `%`;
          imgPreview.style.transform = `scale(1)`;
        }
      }
    },
    getEffectValue: function (line, effectLevel) {
      return Math.floor(effectLevel.offsetWidth * 100 / line.offsetWidth);
    }
  };
})();
