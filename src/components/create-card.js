// Шаблон карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(cardData, openImagePopUp, handleDeleteClick, handleLikeClick, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = "фотография " + cardData.name;
  cardTitle.textContent = cardData.name;

  // Отображаем количество лайков
  likeCounter.textContent = cardData.likes.length;

  // Проверяем, лайкнул ли текущий пользователь карточку
  const isLiked = cardData.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик клика по изображению
  cardImage.addEventListener("click", () => {
    const imageData = {
      name: cardData.name,
      link: cardData.link,
    };
    openImagePopUp(imageData);
  });

  // Обработчик лайка
  likeButton.addEventListener("click", () => {
    handleLikeClick(cardData._id, likeButton, likeCounter);
  });

  // Обработчик удаления
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      handleDeleteClick(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove(); // Скрываем кнопку удаления для чужих карточек
  }

  return cardElement;
}