import { initialCards } from './components/cards.js';
import { createCard } from './components/create-card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import "./index.css";

const popups = document.querySelectorAll('.popup');
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const cardElement = document.querySelector('.popup__form[name="new-place"]');

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const CardPlaceName = document.querySelector('.popup__input_type_card-name');
const CardDescription = document.querySelector('.popup__input_type_url');
const CardContainer = document.querySelector('.places__list');
const popupImageBig = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');

popups.forEach((popup) => {
  const popupButtonClose = popup.querySelector(".popup__close")
  popupButtonClose.addEventListener("click", () => {
    closePopup(popup);
  });
})

function openImagePopUp(imageData) {
  popupImage.src = imageData.link;
  popupImage.alt = imageData.name;
  popupTitle.textContent = imageData.name;
  openPopup(popupImageBig);
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  closePopup(popupProfileEdit);
  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: document.querySelector('.popup__input_type_card-name').value,
    link: document.querySelector('.popup__input_type_url').value
  }
  const newCard = createCard(cardData, openImagePopUp);
  CardContainer.prepend(newCard);
  closePopup(popupNewCard);
  cardElement.reset();
}

cardElement.addEventListener('submit', handleFormSubmitCard);

// @todo: Темплейт карточки
const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardData) {
  const cardElement = createCard(cardData, openImagePopUp);
  cardsContainer.append(cardElement);
});

buttonProfileEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
});

buttonProfileAdd.addEventListener("click", function () {
  openPopup(popupNewCard);
})

