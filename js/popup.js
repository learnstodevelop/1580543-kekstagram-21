'use strict';

(function () {
  window.popup = {
    open: function () {
      const closePopupButton = document.querySelector(`.img-upload__cancel`);
      const modal = document.querySelector(`.img-upload__overlay`);
      const body = document.querySelector(`body`);
      const effectPin = document.querySelector(`.effect-level__pin`);
      const effectLine = document.querySelector(`.effect-level__line`);
      const effectDepth = document.querySelector(`.effect-level__depth`);
      const form = document.querySelector(`.img-upload__form`);
      const effects = document.querySelector(`.effects__list`);
      const scaleControl = document.querySelector(`.scale`);
      const effectInputValue = document.querySelector(`.effect-level__value`);
      const hashtagsInput = document.querySelector(`.text__hashtags`);
      const effectList = document.querySelector(`.effects__list`);
      const effectSlider = document.querySelector(`.img-upload__effect-level`);
      const commentInput = document.querySelector(`.text__description`);

      modal.classList.remove(`hidden`);
      body.classList.add(`modal-open`);
      effectSlider.classList.add(`hidden`);

      effectList.addEventListener(`change`, window.previewEditor.effectDefaultHandler);

      closePopupButton.addEventListener(`click`, function () {
        window.popup.close();
      });


      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          if ((document.activeElement !== hashtagsInput) &&
              (document.activeElement !== commentInput)) {
            window.popup.close();
          }
        }
      });

      effectPin.addEventListener(`mouseup`, function () {
        effectInputValue.setAttribute(`value`, window.previewEditor.getEffectValue(effectLine, effectDepth));
      });

      hashtagsInput.addEventListener(`input`, function () {
        window.validateHashtags();
      });

      effects.addEventListener(`change`, window.previewEditor.filterChangeHandler);

      form.addEventListener(`submit`, function (evt) {
        window.validateHashtags();
        window.upload(new FormData(form), function () {
          window.popup.close();
        });
        evt.preventDefault();
      });

      scaleControl.addEventListener(`click`, window.previewEditor.scaleChangeHandler);
    },
    close: function () {
      const closePopupButton = document.querySelector(`.img-upload__cancel`);
      const modal = document.querySelector(`.img-upload__overlay`);
      const body = document.querySelector(`body`);
      const effectPin = document.querySelector(`.effect-level__pin`);
      const effectLine = document.querySelector(`.effect-level__line`);
      const effectDepth = document.querySelector(`.effect-level__depth`);
      const form = document.querySelector(`.img-upload__form`);
      const effects = document.querySelector(`.effects__list`);
      const scaleControl = document.querySelector(`.scale`);
      const uploadFileInput = document.querySelector(`#upload-file`);
      const effectInputValue = document.querySelector(`.effect-level__value`);
      const hashtagsInput = document.querySelector(`.text__hashtags`);
      const effectList = document.querySelector(`.effects__list`);
      const commentInput = document.querySelector(`.text__description`);

      modal.classList.add(`hidden`);
      body.classList.remove(`modal-open`);
      uploadFileInput.value = ``;

      effectList.removeEventListener(`change`, window.previewEditor.effectDefaultHandler);

      closePopupButton.removeEventListener(`click`, function () {
        window.popup.close();
      });

      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          evt.preventDefault();
          if ((document.activeElement !== hashtagsInput) &&
              (document.activeElement !== commentInput)) {
            window.popup.close();
          }
        }
      });

      effectPin.removeEventListener(`mouseup`, function () {
        effectInputValue.value = window.previewEditor.getEffectValue(effectLine, effectDepth);
      });

      hashtagsInput.removeEventListener(`input`, function () {
        window.validateHashtags();
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
        window.popup.close();
      }
    }
  };
})();
