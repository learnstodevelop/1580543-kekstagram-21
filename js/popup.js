'use strict';

(function () {
  const closePopupButton = document.querySelector(`.img-upload__cancel`);
  const modal = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectLine = document.querySelector(`.effect-level__line`);
  const effectDepth = document.querySelector(`.effect-level__depth`);
  const form = document.querySelector(`.img-upload__form`);
  const effects = document.querySelector(`.effects__list`);
  const scaleControl = document.querySelector(`.scale`);

  window.popup = {
    openEvent: function () {
      modal.classList.remove(`hidden`);
      body.classList.add(`modal-open`);
      window.variables.effectSlider.classList.add(`hidden`);

      window.variables.effectList.addEventListener(`change`, window.previewEditor.effectDefaultHandler);

      closePopupButton.addEventListener(`click`, function () {
        window.popup.closeEvent();
      });

      document.addEventListener(`keydown`, window.popup.onPopupEscPress);

      effectPin.addEventListener(`mouseup`, function () {
        window.variables.effectInputValue.setAttribute(`value`, window.previewEditor.getEffectValue(effectLine, effectDepth));
      });

      window.variables.hashtagsInput.addEventListener(`input`, function () {
        window.validateHashtags();
      });

      window.variables.hashtagsInput.addEventListener(`focus`, function () {
        document.removeEventListener(`keydown`, window.popup.onPopupEscPress);
      });

      window.variables.hashtagsInput.addEventListener(`blur`, function () {
        document.addEventListener(`keydown`, window.popup.onPopupEscPress);
      });

      effects.addEventListener(`change`, window.previewEditor.filterChangeHandler);

      form.addEventListener(`submit`, function (evt) {
        evt.preventDefault();
        window.validateHashtags();
        form.submit();
      });

      scaleControl.addEventListener(`click`, window.previewEditor.scaleChangeHandler);
    },
    closeEvent: function () {
      modal.classList.add(`hidden`);
      body.classList.remove(`modal-open`);
      window.variables.uploadFileInput.value = ``;

      window.variables.effectList.removeEventListener(`change`, window.previewEditor.effectDefaultHandler);

      closePopupButton.removeEventListener(`click`, function () {
        window.popup.closeEvent();
      });

      document.removeEventListener(`keydown`, window.popup.onPopupEscPress);

      effectPin.removeEventListener(`mouseup`, function () {
        window.variables.effectInputValue.value = window.previewEditor.getEffectValue(effectLine, effectDepth);
      });

      window.variables.hashtagsInput.removeEventListener(`input`, function () {
        window.validateHashtags();
      });

      window.variables.hashtagsInput.removeEventListener(`focus`, function () {
        document.removeEventListener(`keydown`, window.popup.onPopupEscPress);
      });

      window.variables.hashtagsInput.removeEventListener(`blur`, function () {
        document.addEventListener(`keydown`, window.popup.onPopupEscPress);
      });

      effects.removeEventListener(`change`, window.previewEditor.filterChangeHandler);

      form.removeEventListener(`submit`, function (evt) {
        evt.preventDefault();
        window.validateHashtags();
        form.submit();
      });

      scaleControl.removeEventListener(`click`, window.previewEditor.scaleChangeHandler);
    },
    onPopupEscPress: function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.popup.closeEvent();
      }
    }
  };
})();
