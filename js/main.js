'use strict';

(function () {
  window.variables.uploadFileInput.addEventListener(`change`, function () {
    window.popup.openEvent();
  });

  window.variables.uploadFileControl.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.variables.uploadFileControl.click();
    }
  });
})();


