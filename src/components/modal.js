export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener('click', handleClickClose);
  document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  popup.removeEventListener('click', popup._handleClickClose);
  document.removeEventListener('keydown', popup._handleEscClose);
}

function handleClickClose(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}