'use strict';

(function () {
  const start = function () {
    const init = function (data) {
      window.showBigPicture(data);
      window.successHandler(data);
    };
    window.load(init, window.errorHandler);
  }
  start();
})();
