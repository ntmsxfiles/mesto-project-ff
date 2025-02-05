(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,r,n,o,c){var a=e.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__delete-button"),i=a.querySelector(".card__like-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__title"),d=a.querySelector(".card__like-counter");return l.src=t.link,l.alt="фотография "+t.name,s.textContent=t.name,d.textContent=t.likes.length,t.likes.some((function(e){return e._id===c}))&&i.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){var e={name:t.name,link:t.link};r(e)})),i.addEventListener("click",(function(){o(t._id,i,d)})),t.owner._id===c?u.addEventListener("click",(function(){n(t._id,a)})):u.remove(),a}function r(e){e.classList.add("popup_is-opened"),e.addEventListener("click",n),document.addEventListener("keydown",o),console.log(e)}function n(e){e.currentTarget===e.target&&c(e.target)}function o(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function c(e){console.log(e),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}var a=function(e,t,r){t.setCustomValidity(""),"url"!==t.type||function(e){try{return new URL(e),!0}catch(e){return!1}}(t.value)||t.setCustomValidity("Введите корректный URL"),t.validity.patternMismatch&&t.setCustomValidity(t.dataset.errorMessage),t.validity.valid?i(e,t,r):u(e,t,t.validationMessage,r)},u=function(e,t,r,n){var o=e.querySelector("#".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)},i=function(e,t,r){var n=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.textContent="",n.classList.remove(r.errorClass)},l=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.disabled=!1):(t.classList.add(r.inactiveButtonClass),t.disabled=!0)},s=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){i(e,r,t),r.setCustomValidity("")})),l(r,n,t)},d={serverUrl:"https://nomoreparties.co/v1",cohortId:"/wff-cohort-31",headers:{authorization:"fb8789f7-ddc0-4afb-9c50-6c650b642488","Content-Type":"application/json"}};function p(e){return e.ok?e.json():Promise.reject(e.status)}function f(e){return fetch("".concat(d.serverUrl+d.cohortId,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then(p)}function m(e){return fetch("".concat(d.serverUrl+d.cohortId,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then(p)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var y,v,h=document.querySelectorAll(".popup"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_edit"),E=document.querySelector('.popup__form[name="edit-profile"]'),L=document.querySelector('.popup__form[name="new-place"]'),g=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),I=document.querySelector(".places__list"),U=document.querySelector(".popup_type_image"),T=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),j=document.querySelector(".profile__image"),O=document.querySelector(".profile__image_hover"),B=document.querySelector(".popup_type_avatar"),D=document.forms["edit-avatar"],P=document.querySelector("#avatar-input"),z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-save_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function V(e){T.src=e.link,T.alt=e.name,w.textContent=e.name,r(U)}function M(e,t){(function(e){return fetch("".concat(d.serverUrl+d.cohortId,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then(p)})(e).then((function(){t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function N(e,t,r){(t.classList.contains("card__like-button_is-active")?m:f)(e).then((function(e){r.textContent=e.likes.length,t.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при лайке:",e)}))}h.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){c(e)}))})),E.addEventListener("submit",(function(e){e.preventDefault();var t,r,n=E.querySelector(".popup__button"),o=n.textContent;n.textContent="Сохранение...",(t=g.value,r=k.value,fetch("".concat(d.serverUrl+d.cohortId,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:t,about:r})}).then(p)).then((function(e){x.textContent=e.name,A.textContent=e.about,c(C)})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){n.textContent=o}))})),L.addEventListener("submit",(function(e){e.preventDefault();var r,n,o=L.querySelector(".popup__button"),a=o.textContent;o.textContent="Сохранение...",(r=document.querySelector(".popup__input_type_card-name").value,n=document.querySelector(".popup__input_type_url").value,fetch("".concat(d.serverUrl+d.cohortId,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:r,link:n})}).then(p)).then((function(e){var r=t(e,V,M,N,y);I.prepend(r),c(q),L.reset(),s(L,z)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){o.textContent=a}))})),S.addEventListener("click",(function(){g.value=x.textContent,k.value=A.textContent,s(E,z),r(C)})),b.addEventListener("click",(function(){L.reset(),s(L,z),r(q)})),Promise.all([fetch("".concat(d.serverUrl+d.cohortId,"/users/me"),{method:"GET",headers:{authorization:d.headers.authorization}}).then(p),fetch("".concat(d.serverUrl+d.cohortId,"/cards"),{method:"GET",headers:{authorization:d.headers.authorization}}).then(p)]).then((function(e){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];y=c._id,x.textContent=c.name,A.textContent=c.about,c.avatar&&(j.style.backgroundImage="url(".concat(c.avatar,")")),a.forEach((function(e){var r=t(e,V,M,N,y);I.append(r)}))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)})),v=z,Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);l(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){a(e,o,t),l(r,n,t)}))}))}(e,v)})),O.addEventListener("click",(function(){s(D,z),r(B)})),D.addEventListener("submit",(function(e){e.preventDefault();var t,r=D.querySelector(".popup__button"),n=r.textContent;r.textContent="Сохранение...",(t=P.value.trim(),fetch("".concat(d.serverUrl+d.cohortId,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:t})}).then(p)).then((function(e){j.style.backgroundImage="url(".concat(e.avatar,")"),c(B),D.reset(),s(D,z)})).catch((function(e){console.error("Ошибка:",e),P.setCustomValidity("Ошибка обновления аватара");var t=D.querySelector("#".concat(P.id,"-error"));t.textContent="Неверный URL или ошибка сервера",t.classList.add(z.errorClass)})).finally((function(){r.textContent=n}))}))})();