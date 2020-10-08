'use strict';

(function () {
  const TOTAL_PHOTOS = 25;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const MIN_COMMENTS = 2;
  const MAX_COMMENTS = 20;
  const FIRST_AVATAR = 1;
  const LAST_AVATAR = 6;
  const MAX_SENTENCES = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const DEFAULT_EFFECT_DEPTH = 91;
  const DEFAULT_EFFECT_LEVEL = 453;
  const MAX_HASHTAGS = 5;

  const closePopupButton = document.querySelector('.img-upload__cancel');
  const modal = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const uploadFileInput = document.querySelector('#upload-file');
  const effectPin = document.querySelector('.effect-level__pin');
  const effectInputValue = document.querySelector('.effect-level__value');
  const effectLine = document.querySelector('.effect-level__line');
  const effectDepth = document.querySelector('.effect-level__depth');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const effectList = document.querySelector('.effects__list');
  const form = document.querySelector('.img-upload__form');

  const NAMES = [
    'Иван',
    'Антон',
    'Кристина',
    'Мария',
    'Ашот',
    'Людмила',
    'Владислав',
    'Вадим',
    'Аня',
    'Михаил',
    'КЕКС',
    'Енот'
  ];
  const TEXT_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomElement = function (arr) {
    const randomElement = arr[getRandomNumber(0, arr.length - 1)];
    return randomElement;
  };

  const getComment = function (number) {
    if (getRandomNumber(0, number)) {
      return getRandomElement(TEXT_COMMENTS);
    }
    return getRandomElement(TEXT_COMMENTS) + ' ' + getRandomElement(TEXT_COMMENTS);
  };

  const getComments = function () {
    const comments = [];
    for (let i = 0; i < getRandomNumber(MIN_COMMENTS, MAX_COMMENTS); i++) {
      comments.push({
        avatar: 'img/avatar-' + getRandomNumber(FIRST_AVATAR, LAST_AVATAR) + '.svg',
        message: getComment(MAX_SENTENCES),
        name: getRandomElement(NAMES)
      });
    }
    return comments;
  };

  const getPosts = function () {
    const posts = [];
    for (let i = 0; i < TOTAL_PHOTOS; i++) {
      posts.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'Описание фотографии',
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComments().length
      });
    }
    return posts;
  };

  const renderPost = function (post) {
    const pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    const postElement = pictureTemplate.cloneNode(true);

    postElement.querySelector('.picture__img').setAttribute('src', post.url);
    postElement.querySelector('.picture__likes').textContent = post.likes;
    postElement.querySelector('.picture__comments').textContent = post.comments;

    return postElement;
  };

  const renderPosts = function () {
    const picturesListElement = document.querySelector('.pictures');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < getPosts().length; i++) {
      fragment.appendChild(renderPost(getPosts()[i]));
    }
    picturesListElement.appendChild(fragment);
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = function () {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');

    effectList.addEventListener('change', effectDefaultHandler);

    closePopupButton.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', onPopupEscPress);

    effectPin.addEventListener('mouseup', function () {
      effectInputValue.setAttribute('value', getEffectValue(effectLine, effectDepth));
    });

    hashtagsInput.addEventListener('input', function () {
      validateHashtags();
    });

    hashtagsInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });

    hashtagsInput.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      validateHashtags();
      form.submit();
    });
  };

  const closePopup = function () {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFileInput.value = '';

    effectList.removeEventListener('change', effectDefaultHandler);

    closePopupButton.removeEventListener('click', function () {
      closePopup();
    });

    document.removeEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup();
      }
    });

    effectPin.removeEventListener('mouseup', function () {
      effectInputValue.value = getEffectValue(effectLine, effectDepth);
    });

    hashtagsInput.removeEventListener('input', function () {
      validateHashtags();
    });
  };

  const getEffectValue = function (line, effectLevel) {
    return Math.floor(effectLevel.offsetWidth * 100 / line.offsetWidth);
  };

  const validateHashtags = function () {
    const hashtagsArr = hashtagsInput.value.split(' ');
    const re = /^#[0-9A-Za-zА-Яа-яё]*$/;

    for (let i = 0; i < hashtagsArr.length; i++) {
      const hashtag = hashtagsArr[i];
      const hashtagEl = hashtag.split('');
      const hashtagLength = hashtagEl.length;


      if (hashtagEl[0] !== '#' && hashtag.length !== 0) {
        hashtagsInput.setCustomValidity('#ХешТег должен начинатся с #');
      } else if (re.test(hashtag) === false && hashtag.length !== 0) {
        hashtagsInput.setCustomValidity('#ХешТег должен состоять из букв и чисел и не может содержать пробелы и спецсимволы (@, $ и т. п.))');
      } else if (hashtagLength > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Удалите лишние ' + (hashtagLength - MAX_HASHTAG_LENGTH) + ' симв.');
      } else if (hashtagsArr.length > MAX_HASHTAGS) {
        hashtagsInput.setCustomValidity('Максимум 5 #ХешТегов');
      } else {
        hashtagsInput.setCustomValidity('');
      }
      hashtagsInput.reportValidity();
    }
  };

  const getDefaultState = function (defaultDepth, defaultLine) {
    return Math.floor(defaultDepth * 100 / defaultLine);
  };

  const effectDefaultHandler = function (evt) {
    if (evt.target && evt.target.matches('input[name="effect"]')) {
      effectInputValue.setAttribute('value', getDefaultState(DEFAULT_EFFECT_DEPTH, DEFAULT_EFFECT_LEVEL));
    }
  };


  renderPosts();

  uploadFileInput.addEventListener('change', function () {
    openPopup();
  });
})();


