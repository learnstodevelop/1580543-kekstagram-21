'use strict';

(function () {
  const start = function () {
    const succesHandler = function (data) {
      window.showListPosts(data);
      window.bigPicture.assignHandlers(data);
    };
    window.load(succesHandler, window.errorHandler);
  };

  start();
})();
