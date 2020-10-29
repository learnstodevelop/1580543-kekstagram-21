'use strict';

(function () {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const socialCapton = bigPicture.querySelector('.social__caption');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const body = document.querySelector(`body`);
  const picturesListElement = document.querySelector(`.pictures`);
  const closeBigPicture = document.querySelector('.big-picture__cancel');

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

  window.viewPost = {
    close: function () {
      bigPicture.classList.add('hidden');
      commentsLoader.classList.remove('hidden');
      body.classList.remove('modal-open');

      closeBigPicture.removeEventListener('click', window.viewPost.close);

      document.removeEventListener(`keydown`, window.viewPost.closeEsc);

    },
    closeEsc: function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
        commentsLoader.classList.remove('hidden');
        body.classList.remove('modal-open');

        closeBigPicture.removeEventListener('click', window.viewPost.close);

        document.removeEventListener(`keydown`, window.viewPost.closeEsc);
      }
    }
  };

  window.showBigPicture = function (data) {
    const icons = document.querySelectorAll('.picture__img');
    const links = document.querySelectorAll('.picture');
    const iconArr = Array.from(icons);
    const linkArr = Array.from(links);

    picturesListElement.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('img[class="picture__img"]')) {
        window.renderBigPicture(data, iconArr.indexOf(evt.target));

        closeBigPicture.addEventListener('click', window.viewPost.close);
        document.addEventListener(`keydown`, window.viewPost.closeEsc);
      }
    });

    picturesListElement.addEventListener(`keydown`, function (evt) {
      if (evt.target && evt.target.matches('a[class="picture"]')) {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          window.renderBigPicture(data, linkArr.indexOf(evt.target));

          closeBigPicture.addEventListener('click', window.viewPost.close);
          document.addEventListener(`keydown`, window.viewPost.closeEsc);
        }
      }
    });
  };

  window.renderBigPicture = function (pictures, index) {
    const fragment = document.createDocumentFragment();

    deleteComments();

    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.src = pictures[index].url;
    likesCount.textContent = pictures[index].likes;
    commentsCount.textContent = pictures[index].comments.length;
    socialCapton.textContent = pictures[index].description;

    for (let i = 0; i < pictures[index].comments.length; i++) {
      fragment.appendChild(renderComment(pictures[index].comments[i]));
    }
    socialComments.appendChild(fragment);
  };
})();
