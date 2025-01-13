// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(cardData, openImagePopUp) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = "фотография " + cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", function () {
    const imageData = {
      name: cardData.name,
      link: cardData.link
    }
    openImagePopUp(imageData);
  })

  likeButton.addEventListener("click", function () {
    toggleLikeButton(likeButton);
  });

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
