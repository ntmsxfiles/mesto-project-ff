import {
  initialCards
} from './components/cards.js';
import {
  createCard
} from './components/create-card.js';
import {
  openPopup,
  closePopup
} from './components/modal.js';
import {
  enableValidation,
  clearValidation
} from './components/validation.js';
import {
  fetchUserProfile,
  fetchInitialCards,
  updateUserProfile,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateUserAvatar,
} from './components/api.js';
import "./index.css";

// Получаем элементы DOM
const popups = document.querySelectorAll('.popup');
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const cardElement = document.querySelector('.popup__form[name="new-place"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const CardContainer = document.querySelector('.places__list');
const popupImageBig = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image');
const avatarEditButton = document.querySelector('.profile__image_hover');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarInput = document.querySelector('#avatar-input');

// Конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// ID текущего пользователя
let userId;

// Закрытие попапов по крестику
popups.forEach((popup) => {
  const popupButtonClose = popup.querySelector(".popup__close");
  popupButtonClose.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Открытие попапа с изображением
function openImagePopUp(imageData) {
  popupImage.src = imageData.link;
  popupImage.alt = imageData.name;
  popupTitle.textContent = imageData.name;
  openPopup(popupImageBig);
}

// Обработчик формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = formElement.querySelector('.popup__button');
  const initialText = saveButton.textContent;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = 'Сохранение...';

  const name = nameInput.value;
  const about = jobInput.value;

  updateUserProfile(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupProfileEdit);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      saveButton.textContent = initialText;
    });
}

formElement.addEventListener('submit', handleFormSubmit);

// Обработчик формы добавления карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const saveButton = cardElement.querySelector('.popup__button');
  const initialText = saveButton.textContent;

  saveButton.textContent = 'Сохранение...';

  const name = document.querySelector('.popup__input_type_card-name').value;
  const link = document.querySelector('.popup__input_type_url').value;

  addNewCard(name, link)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        openImagePopUp,
        handleDeleteClick,
        handleLikeClick,
        userId
      );
      CardContainer.prepend(newCard);
      closePopup(popupNewCard);
      cardElement.reset();
      clearValidation(cardElement, validationConfig);
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      saveButton.textContent = initialText;
    });
}

cardElement.addEventListener('submit', handleFormSubmitCard);

// Обработчик удаления карточки
function handleDeleteClick(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
}

// Обработчик лайка
function handleLikeClick(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? unlikeCard : likeCard;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.error('Ошибка при лайке:', err);
    });
}

// Открытие попапа редактирования профиля
buttonProfileEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElement, validationConfig);
  openPopup(popupProfileEdit);
});

// Открытие попапа добавления карточки
buttonProfileAdd.addEventListener("click", () => {
  cardElement.reset();
  clearValidation(cardElement, validationConfig);
  openPopup(popupNewCard);
});

// Загрузка данных пользователя и карточек
Promise.all([fetchUserProfile(), fetchInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id; // Сохраняем ID пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    // Отображаем аватар пользователя
    if (userData.avatar) {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
    }

    // Отображаем карточки
    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        openImagePopUp,
        handleDeleteClick,
        handleLikeClick,
        userId
      );
      CardContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

// Включение валидации
enableValidation(validationConfig);

// Обработчик открытия попапа аватара
avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
});

// Обработчик отправки формы аватара
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector('.popup__button');
  const initialText = saveButton.textContent;

  saveButton.textContent = 'Сохранение...';

  updateUserAvatar(avatarInput.value.trim())
    .then((userData) => {
      // Обновляем аватар на странице
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupAvatar);
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.error('Ошибка:', err);
      avatarInput.setCustomValidity('Ошибка обновления аватара');
      const errorElement = avatarForm.querySelector(`#${avatarInput.id}-error`);
      errorElement.textContent = 'Неверный URL или ошибка сервера';
      errorElement.classList.add(validationConfig.errorClass);
    })
    .finally(() => {
      saveButton.textContent = initialText;
    });
});