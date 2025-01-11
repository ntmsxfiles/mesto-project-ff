export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  const popupButtonClose = popup.querySelector(".popup__close");
  popupButtonClose.addEventListener("click", function () {
    closePopup(popup);
  })

  popup.addEventListener('click', handleClickClose)
  document.addEventListener('keydown', handleEscClose)
  console.log(popup)

  function handleClickClose(evt) {
    if (evt.currentTarget === evt.target) {
      closePopup(popup)
    }
  }

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

