// Включение валидации всех форм
export const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => evt.preventDefault());
      setEventListeners(formElement, config);
    });
  };
  
  // Установка обработчиков для формы
  const setEventListeners = (formElement, config) => {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputs, button, config);
  
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(formElement, input, config);
        toggleButtonState(inputs, button, config);
      });
    });
  };
  
  // Проверка валидности поля
  const checkInputValidity = (formElement, input, config) => {
    // Сбрасываем предыдущие ошибки
    input.setCustomValidity('');
  
    // Проверка URL для полей с типом url
    if (input.type === 'url' && !isValidUrl(input.value)) {
      input.setCustomValidity('Введите корректный URL');
    }
  
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    }
  
    if (!input.validity.valid) {
      showInputError(formElement, input, input.validationMessage, config);
    } else {
      hideInputError(formElement, input, config);
    }
  };
  
  // Функция для проверки корректности URL
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  // Показать ошибку
  const showInputError = (formElement, input, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  // Скрыть ошибку
  const hideInputError = (formElement, input, config) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  };
  
  // Проверка на невалидные поля
  const hasInvalidInput = (inputs) => inputs.some((input) => !input.validity.valid);
  
  // Переключение состояния кнопки
  const toggleButtonState = (inputs, button, config) => {
    if (hasInvalidInput(inputs)) {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    }
  };
  
  // Очистка ошибок валидации
  export const clearValidation = (formElement, config) => {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const button = formElement.querySelector(config.submitButtonSelector);
  
    inputs.forEach((input) => {
      hideInputError(formElement, input, config);
      input.setCustomValidity('');
    });
  
    toggleButtonState(inputs, button, config);
  };