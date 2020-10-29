'use strict';

(function () {
  const start = function () {
    const init = function (data) {
      window.successHandler(data);
      window.showBigPicture(data);
    };
    window.load(init, window.errorHandler);
  };

  start();
})();
