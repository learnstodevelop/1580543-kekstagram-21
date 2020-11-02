'use strict';

(function () {
  const deleteComments = function () {
    const comments = document.querySelectorAll(`.social__comment`);
    for (let i = 0; i < comments.length; i++) {
      comments[i].remove();
    }
  };

  const renderComment = function (comment) {
    const commentTemplate = document.querySelector(`#comment`)
      .content
      .querySelector(`.social__comment`);

    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('img').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  window.bigPicture = {
    close: function () {
      const bigPicture = document.querySelector('.big-picture');
      const commentsLoader = document.querySelector('.comments-loader');
      const body = document.querySelector(`body`);
      const closeBigPicture = document.querySelector('.big-picture__cancel');
      const inputComment = document.querySelector('.social__footer-text');

      bigPicture.classList.add('hidden');
      commentsLoader.classList.remove('hidden');
      body.classList.remove('modal-open');
      inputComment.value = '';

      closeBigPicture.removeEventListener('click', window.bigPicture.close);

      document.removeEventListener(`keydown`, window.bigPicture.onKeyDown);
    },

    onKeyDown: function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        window.bigPicture.close();
      }
    },

    assignHandlers: function (data) {
      const picturesListElement = document.querySelector(`.pictures`);
      const closeBigPicture = document.querySelector('.big-picture__cancel');

      picturesListElement.addEventListener('click', function (evt) {
        if (evt.target && evt.target.matches('img[class="picture__img"]')) {
          let dataAttribute = evt.target.getAttribute('data-index');
          window.bigPicture.renderBigPicture(data[dataAttribute]);

          closeBigPicture.addEventListener('click', window.bigPicture.close);
          document.addEventListener(`keydown`, window.bigPicture.onKeyDown);
        }
      });

      picturesListElement.addEventListener(`keydown`, function (evt) {
        if (evt.target && evt.target.matches('a[class="picture"]')) {
          if (evt.key === `Enter`) {
            evt.preventDefault();
            let dataAttribute = evt.target.querySelector('.picture__img').getAttribute('data-index');
            window.bigPicture.renderBigPicture(data[dataAttribute]);

            closeBigPicture.addEventListener('click', window.bigPicture.close);
            document.addEventListener(`keydown`, window.bigPicture.onKeyDown);
          }
        }
      });
    },

    renderBigPicture: function (element) {
      const bigPicture = document.querySelector('.big-picture');
      const bigPictureImg = bigPicture.querySelector('img');
      const likesCount = document.querySelector('.likes-count');
      const commentsCount = document.querySelector('.comments-count');
      const socialComments = document.querySelector('.social__comments');
      const socialCommentCount = document.querySelector('.social__comment-count');
      const socialCapton = document.querySelector('.social__caption');
      const body = document.querySelector(`body`);

      const fragment = document.createDocumentFragment();

      deleteComments();

      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      body.classList.add('modal-open');

      bigPictureImg.src = element.url;
      likesCount.textContent = element.likes;
      commentsCount.textContent = element.comments.length;
      socialCapton.textContent = element.description;

      for (let i = 0; i < element.comments.length; i++) {
        fragment.appendChild(renderComment(element.comments[i]));
      }
      socialComments.appendChild(fragment);

      const comments = socialComments.querySelectorAll('.social__comment');
      for (let i = 5; i < comments.length; i++) {
        comments[i].classList.add('hidden');
      }
    },

    openHiddenComments: function () {
      const commentsLoader = document.querySelector('.comments-loader');
      const socialComments = document.querySelector('.social__comments');
      const STEP = 5;

      commentsLoader.addEventListener('click', function () {
        const commentsHidden = socialComments.querySelectorAll('.hidden');
        for (let i = 0; i < STEP; i++) {
          if (commentsHidden[i] === undefined) {
            commentsLoader.classList.add('hidden');
            break;
          } else {
            commentsHidden[i].classList.remove('hidden');
          }
        }
      });
    }
  };
})();
