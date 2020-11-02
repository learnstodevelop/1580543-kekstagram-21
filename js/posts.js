'use strict';

(function () {
  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileControl = document.querySelector(`.img-upload__control`);

  const deletePosts = function () {
    const post = document.querySelectorAll(`.picture`);
    for (let i = 0; i < post.length; i++) {
      post[i].remove();
    }
  };

  const renderPost = function (post) {
    const pictureTemplate = document.querySelector(`#picture`)
      .content
      .querySelector(`.picture`);

    const postElement = pictureTemplate.cloneNode(true);

    postElement.querySelector(`.picture__img`).setAttribute(`src`, post.url);
    postElement.querySelector(`.picture__likes`).textContent = post.likes;
    postElement.querySelector(`.picture__comments`).textContent = post.comments.length;

    return postElement;
  };

  const setDataAttribute = function () {
    const postElement = document.querySelectorAll('.picture__img');
    for (let i = 0; i < postElement.length; i++) {
      postElement[i].setAttribute('data-index', i);
    }
  };

  const addToFragment = function (arr) {
    const picturesListElement = document.querySelector(`.pictures`);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPost(arr[i]));
    }
    picturesListElement.appendChild(fragment);
    return picturesListElement;
  };

  const renderDefaultPosts = function (defaultArr) {
    deletePosts();
    addToFragment(defaultArr);
    setDataAttribute();
  };

  const renderRandomPosts = function (arr) {
    const MAX_RANDOM_POSTS = 10;
    deletePosts();
    const randomPosts = arr.sort(function () {
      return 0.5 - Math.random();
    });
    addToFragment(randomPosts);
    const post = document.querySelectorAll(`.picture`);
    for (let i = MAX_RANDOM_POSTS; i < post.length; i++) {
      post[i].classList.add('hidden');
    }
    setDataAttribute();
  };

  const discussedChange = function (arr) {
    deletePosts();
    arr.sort((obj1, obj2) => obj2.comments.length - obj1.comments.length);
    addToFragment(arr);
    setDataAttribute();
  };

  window.showListPosts = function (arr) {
    const filtresForm = document.querySelector('.img-filters__form');
    const filtresButtons = document.querySelectorAll('.img-filters__button');
    const filterDefault = document.querySelector('#filter-default');
    const filterRandom = document.querySelector('#filter-random');
    const filterDiscussed = document.querySelector('#filter-discussed');
    const imgFiltres = document.querySelector('.img-filters');

    imgFiltres.classList.remove('img-filters--inactive');

    const loadedPosts = [];
    for (let i = 0; i < arr.length; i++) {
      loadedPosts.push(arr[i]);
    }

    addToFragment(loadedPosts);
    setDataAttribute();
    window.bigPicture.openHiddenComments();

    filtresForm.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches(`button[type="button"]`)) {
        for (let i = 0; i < filtresButtons.length; i++) {
          filtresButtons[i].classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
      }
      if (filterDefault.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          renderDefaultPosts(arr);
          window.bigPicture.assignHandlers(arr);

        });
      } else if (filterRandom.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          renderRandomPosts(loadedPosts);
          window.bigPicture.assignHandlers(loadedPosts);

        });
      } else if (filterDiscussed.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          discussedChange(loadedPosts);
          window.bigPicture.assignHandlers(loadedPosts);

        });
      }
    });
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '18px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  uploadFileInput.addEventListener(`change`, function () {
    window.popup.open();
  });

  uploadFileControl.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      uploadFileControl.click();
    }
  });
})();


