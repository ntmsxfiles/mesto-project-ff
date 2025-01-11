import { openPopup } from "./modal.js";
// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const popupImageBig = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupTitle = document.querySelector('.popup__caption');

  cardImage.src = cardData.link;
  cardImage.alt = "фотография " + cardData.name;
  cardTitle.textContent = cardData.name;

  function deleteCard(cardElement) {
    cardElement.remove();
  }

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", function () {
    openPopup(popupImageBig);
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupTitle.textContent = cardTitle.textContent;
  })

  return cardElement;
}

