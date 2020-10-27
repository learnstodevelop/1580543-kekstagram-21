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

  window.showBigPicture = function (pictures) {
    const fragment = document.createDocumentFragment();

    deleteComments();

    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.src = pictures[0].url;
    likesCount.textContent = pictures[0].likes;
    commentsCount.textContent = pictures[0].comments.length;
    socialCapton.textContent = pictures[0].description;

    for (let i = 0; i < pictures[0].comments.length; i++) {
      fragment.appendChild(renderComment(pictures[0].comments[i]));
    }
    socialComments.appendChild(fragment);
  };
})();
