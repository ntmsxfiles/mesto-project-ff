export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener('click', handleClickClose)
  document.addEventListener('keydown', handleEscClose)
  console.log(popup)
}

function handleClickClose(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target)
  }
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export function closePopup(popup) {
  console.log(popup)
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', handleEscClose)

}