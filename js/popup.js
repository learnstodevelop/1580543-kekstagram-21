'use strict';

(function () {
  window.popup = {
    openEvent: function () {
      window.variables.modal.classList.remove(`hidden`);
      window.variables.body.classList.add(`modal-open`);
      window.variables.effectSlider.classList.add(`hidden`);

      window.variables.effectList.addEventListener(`change`, window.previewEditor.effectDefaultHandler);

      window.variables.closePopupButton.addEventListener(`click`, function () {
        window.popup.closeEvent();
      });

      document.addEventListener(`keydown`, window.popup.onPopupEscPress);

      window.variables.effectPin.addEventListener(`mouseup`, function () {
        window.variables.effectInputValue.setAttribute(`value`, window.previewEditor.getEffectValue(window.variables.effectLine, window.variables.effectDepth));
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

      window.variables.effects.addEventListener(`change`, window.previewEditor.filterChangeHandler);

      window.variables.form.addEventListener(`submit`, function (evt) {
        evt.preventDefault();
        window.validateHashtags();
        window.variables.form.submit();
      });

      window.variables.scaleControl.addEventListener(`click`, window.previewEditor.scaleChangeHandler);
    },
    closeEvent: function () {
      window.variables.modal.classList.add(`hidden`);
      window.variables.body.classList.remove(`modal-open`);
      window.variables.uploadFileInput.value = ``;

      window.variables.effectList.removeEventListener(`change`, window.previewEditor.effectDefaultHandler);

      window.variables.closePopupButton.removeEventListener(`click`, function () {
        window.popup.closeEvent();
      });

      document.removeEventListener(`keydown`, window.popup.onPopupEscPress);

      window.variables.effectPin.removeEventListener(`mouseup`, function () {
        window.variables.effectInputValue.value = window.previewEditor.getEffectValue(window.variables.effectLine, window.variables.effectDepth);
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

      window.variables.effects.removeEventListener(`change`, window.previewEditor.filterChangeHandler);

      window.variables.form.removeEventListener(`submit`, function (evt) {
        evt.preventDefault();
        window.validateHashtags();
        window.variables.form.submit();
      });

      window.variables.scaleControl.removeEventListener(`click`, window.previewEditor.scaleChangeHandler);
    },
    onPopupEscPress: function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.popup.closeEvent();
      }
    }
  };
})();
