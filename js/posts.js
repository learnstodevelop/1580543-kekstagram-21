'use strict';

(function () {
  const MIN_COMMENTS = 2;
  const MAX_COMMENTS = 20;
  const FIRST_AVATAR = 1;
  const LAST_AVATAR = 6;
  const MAX_SENTENCES = 2;
  const TOTAL_PHOTOS = 25;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileControl = document.querySelector(`.img-upload__control`);

  const NAMES = [
    `Иван`,
    `Антон`,
    `Кристина`,
    `Мария`,
    `Ашот`,
    `Людмила`,
    `Владислав`,
    `Вадим`,
    `Аня`,
    `Михаил`,
    `КЕКС`,
    `Енот`
  ];
  const TEXT_COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
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
    return getRandomElement(TEXT_COMMENTS) + ` ` + getRandomElement(TEXT_COMMENTS);
  };

  const getComments = function () {
    const comments = [];
    for (let i = 0; i < getRandomNumber(MIN_COMMENTS, MAX_COMMENTS); i++) {
      comments.push({
        avatar: `img/avatar-` + getRandomNumber(FIRST_AVATAR, LAST_AVATAR) + `.svg`,
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
        url: `photos/` + (i + 1) + `.jpg`,
        description: `Описание фотографии`,
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComments().length
      });
    }
    return posts;
  };

  const renderPost = function (post) {
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

    const postElement = pictureTemplate.cloneNode(true);

    postElement.querySelector(`.picture__img`).setAttribute(`src`, post.url);
    postElement.querySelector(`.picture__likes`).textContent = post.likes;
    postElement.querySelector(`.picture__comments`).textContent = post.comments;

    return postElement;
  };

  const successHandler = function () {
    const picturesListElement = document.querySelector(`.pictures`);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < getPosts().length; i++) {
      fragment.appendChild(renderPost(getPosts()[i]));
    }
    picturesListElement.appendChild(fragment);
  };

  const errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '18px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  uploadFileInput.addEventListener(`change`, function () {
    window.popup.open();
  });

  uploadFileControl.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      uploadFileControl.click();
    }
  });
})();


