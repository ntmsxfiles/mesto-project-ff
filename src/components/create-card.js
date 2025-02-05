import { likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, openImagePopUp, handleDeleteClick, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Заполнение данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Обработчик лайка
  const updateLikeState = (isLiked) => {
    likeButton.classList.toggle('card__like-button_is-active', isLiked);
  };

  const handleLikeClick = () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? unlikeCard : likeCard;
    
    likeMethod(cardData._id)
      .then((updatedCard) => {
        likeCounter.textContent = updatedCard.likes.length;
        updateLikeState(!isLiked);
      })
      .catch((err) => {
        console.error('Ошибка при обновлении лайка:', err);
      });
  };

  // Инициализация состояния лайка
  const isLikedByUser = cardData.likes.some(user => user._id === userId);
  updateLikeState(isLikedByUser);

  // Навешивание обработчиков
  likeButton.addEventListener('click', handleLikeClick);
  cardImage.addEventListener('click', () => openImagePopUp(cardData));
  
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => handleDeleteClick(cardData._id, cardElement));
  } else {
    deleteButton.remove();
  }

  return cardElement;
}