'use strict';

(function () {

  window.validateHashtags = function () {
    const hashtagsInput = document.querySelector(`.text__hashtags`);
    const MAX_HASHTAGS = 5;
    const MAX_HASHTAG_LENGTH = 20;
    const hashtagsArr = hashtagsInput.value.split(` `);
    const re = /^#[0-9A-Za-zА-Яа-яё]*$/;
    if (hashtagsArr[hashtagsArr.length - 1] === ``) {
      hashtagsArr.pop();
    }

    for (let i = 0; i < hashtagsArr.length; i++) {
      const hashtag = hashtagsArr[i];
      if (hashtag[0] !== `#` && hashtag.length !== 0) {
        hashtagsInput.setCustomValidity(`#ХешТег должен начинатся с #`);
        break;
      } else if (hashtag === `#`) {
        hashtagsInput.setCustomValidity(`ХешТег не должен состоять из одной "#"`);
        break;
      } else if (re.test(hashtag) === false && hashtag.length !== 0) {
        hashtagsInput.setCustomValidity(`#ХешТег должен состоять из букв и чисел и не может содержать пробелы и спецсимволы (@, $ и т. п.))`);
        break;
      } if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity(`Удалите лишние ` + (hashtag.length - MAX_HASHTAG_LENGTH) + ` симв.`);
        break;
      } else if (hashtagsArr.length > MAX_HASHTAGS) {
        hashtagsInput.setCustomValidity(`Максимум 5 #ХешТегов`);
        break;
      } else {
        hashtagsInput.setCustomValidity(``);
      }
    }
    hashtagsInput.reportValidity();
  };
})();

