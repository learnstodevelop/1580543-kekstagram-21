'use strict';

(function () {
  const MAX_RANDOM_POSTS = 10;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileControl = document.querySelector(`.img-upload__control`);

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

  window.successHandler = function (data) {
    const picturesListElement = document.querySelector(`.pictures`);
    const fragment = document.createDocumentFragment();
    const filtresForm = document.querySelector('.img-filters__form');
    const filtresButtons = document.querySelectorAll('.img-filters__button');
    const filterDefault = document.querySelector('#filter-default');
    const filterRandom = document.querySelector('#filter-random');
    const filterDiscussed = document.querySelector('#filter-discussed');
    const imgFiltres = document.querySelector('.img-filters');

    const loadPosts = data.slice();

    const deletePosts = function () {
      const post = document.querySelectorAll(`.picture`);
      for (let i = 0; i < post.length; i++) {
        post[i].remove();
      }
    };

    const renderDefaultPosts = function () {
      deletePosts();

      for (let i = 0; i < loadPosts.length; i++) {
        fragment.appendChild(renderPost(loadPosts[i]));
      }
      picturesListElement.appendChild(fragment);
    };

    const renderRandomPosts = function () {
      deletePosts();

      const randomPosts = data.sort(function () {
        return 0.5 - Math.random();
      });

      for (let i = 0; i < MAX_RANDOM_POSTS; i++) {
        fragment.appendChild(renderPost(randomPosts[i]));
      }
      picturesListElement.appendChild(fragment);
    };

    const discussedChange = function () {
      deletePosts();

      data.sort((obj1, obj2) => obj2.comments.length - obj1.comments.length);

      for (let i = 0; i < data.length; i++) {
        fragment.appendChild(renderPost(data[i]));
      }
      picturesListElement.appendChild(fragment);
    };

    imgFiltres.classList.remove('img-filters--inactive');

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(renderPost(data[i]));
    }
    picturesListElement.appendChild(fragment);

    filtresForm.addEventListener('click', function (evt) {
      if (evt.target.matches(`button[type="button"]`)) {
        for (let i = 0; i < filtresButtons.length; i++) {
          filtresButtons[i].classList.remove('img-filters__button--active');
        }
        evt.target.classList.add('img-filters__button--active');
      }
      if (filterDefault.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          renderDefaultPosts();
        });
      } else if (filterRandom.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          renderRandomPosts();
        });
      } else if (filterDiscussed.classList.contains(`img-filters__button--active`)) {
        window.debounce(function () {
          discussedChange();
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


