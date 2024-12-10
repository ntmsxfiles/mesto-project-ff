// @todo: Темплейт карточки
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(item) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = "фотография " + item.name;
  cardTitle.textContent = item.name;
  
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  cardList.append(cardElement);
});
