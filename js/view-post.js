'use strict';

(function () {

  const renderInnerPost = function (data) {
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

    deleteComments();

    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    bigPictureImg.src = data[0].url;
    likesCount.textContent = data[0].likes;
    commentsCount.textContent = data[0].comments.length;
    socialCapton.textContent = data[0].description;

    for (let i = 0; i < data[0].comments.length; i++) {
      const socialComment = document.createElement('li');
      const socialCommentAvatar = document.createElement('img');
      const socialCommentText = document.createElement('p');

      socialComment.className = 'social__comment';

      socialCommentAvatar.className = 'social__picture';
      socialCommentAvatar.src = data[0].comments[i].avatar;
      socialCommentAvatar.alt = data[0].comments[i].name;
      socialCommentAvatar.width = '35';
      socialCommentAvatar.height = '35';

      socialCommentText.textContent = data[0].comments[i].message;

      socialComment.append(socialCommentAvatar);
      socialComment.append(socialCommentText);
      socialComments.append(socialComment);
    }
  };
  window.load(renderInnerPost, window.onError);
})();
