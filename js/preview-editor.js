'use strict';

(function () {
  const DEFAULT_LEVEL = 100;
  const SCALE_VALUE_STEP = 25;
  const SCALE_VALUE_MAX = 100;
  const SCALE_VALUE_MIN = 0;
  const scaleValue = document.querySelector(`.scale__control--value`);
  const scaleValueNumber = scaleValue.value.split(`%`);

  window.previewEditor = {
    filterChangeHandler: function (evt) {
      if (evt.target && evt.target.matches(`input[id="effect-none"]`)) {
        window.variables.imgPreview.className = ``;
        window.variables.effectSlider.classList.add(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-none"]`)) {
        window.variables.imgPreview.className = ``;
        window.variables.effectSlider.classList.add(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-chrome"]`)) {
        window.variables.imgPreview.className = `effects__preview--chrome`;
        window.variables.effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-sepia"]`)) {
        window.variables.imgPreview.className = `effects__preview--sepia`;
        window.variables.effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-marvin"]`)) {
        window.variables.imgPreview.className = `effects__preview--marvin`;
        window.variables.effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-phobos"]`)) {
        window.variables.imgPreview.className = `effects__preview--phobos`;
        window.variables.effectSlider.classList.remove(`hidden`);
      } else if (evt.target && evt.target.matches(`input[id="effect-heat"]`)) {
        window.variables.imgPreview.className = `effects__preview--heat`;
        window.variables.effectSlider.classList.remove(`hidden`);
      }
    },
    effectDefaultHandler: function (evt) {
      if (evt.target && evt.target.matches(`input[name="effect"]`)) {
        window.variables.effectInputValue.setAttribute(`value`, DEFAULT_LEVEL);

        if (window.variables.effectList.querySelector(`input[id="effect-none"]`).checked) {
          window.variables.imgPreview.style.filter = `none`;
        } else if (window.variables.effectList.querySelector(`input[id="effect-chrome"]`).checked) {
          window.variables.imgPreview.style.filter = `grayscale(` + (window.variables.effectInputValue.value / 100) + `)`;
        } else if (window.variables.effectList.querySelector(`input[id="effect-sepia"]`).checked) {
          window.variables.imgPreview.style.filter = `sepia(` + (window.variables.effectInputValue.value / 100) + `)`;
        } else if (window.variables.effectList.querySelector(`input[id="effect-marvin"]`).checked) {
          window.variables.imgPreview.style.filter = `invert(` + (window.variables.effectInputValue.value) + `%)`;
        } else if (window.variables.effectList.querySelector(`input[id="effect-phobos"]`).checked) {
          window.variables.imgPreview.style.filter = `blur(` + (window.variables.effectInputValue.value * 3 / 100) + `px)`;
        } else if (window.variables.effectList.querySelector(`input[id="effect-heat"]`).checked) {
          window.variables.imgPreview.style.filter = `brightness(` + (1 + (window.variables.effectInputValue.value * 2 / 100)) + `)`;
        }
      }
    },
    scaleChangeHandler: function (evt) {
      if (evt.target && evt.target.matches(`.scale__control--smaller`)) {
        scaleValueNumber[0] = scaleValueNumber[0] - SCALE_VALUE_STEP;
        scaleValue.value = scaleValueNumber[0] + `%`;
        window.variables.imgPreview.style.transform = `scale(0.` + scaleValueNumber[0] + `)`;
        if (scaleValueNumber[0] <= SCALE_VALUE_MIN) {
          scaleValueNumber[0] = SCALE_VALUE_MIN;
          scaleValue.value = scaleValueNumber[0] + `%`;
        }
      }
      if (evt.target && evt.target.matches(`.scale__control--bigger`)) {
        scaleValueNumber[0] = Number(scaleValueNumber[0]) + Number(SCALE_VALUE_STEP);
        scaleValue.value = scaleValueNumber[0] + `%`;
        window.variables.imgPreview.style.transform = `scale(0.` + scaleValueNumber[0] + `)`;
        if (scaleValueNumber[0] >= SCALE_VALUE_MAX) {
          scaleValueNumber[0] = SCALE_VALUE_MAX;
          scaleValue.value = scaleValueNumber[0] + `%`;
          window.variables.imgPreview.style.transform = `scale(1)`;
        }
      }
    },
    getEffectValue: function (line, effectLevel) {
      return Math.floor(effectLevel.offsetWidth * 100 / line.offsetWidth);
    }
  };
})();
