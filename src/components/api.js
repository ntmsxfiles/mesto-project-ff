const apiConfig = {
  serverUrl: "https://nomoreparties.co/v1",
  cohortId: "/wff-cohort-31",
  headers: {
    authorization: "fb8789f7-ddc0-4afb-9c50-6c650b642488",
    "Content-Type": "application/json",
  },
};

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function fetchUserProfile() {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/users/me`, {
    method: "GET",
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  }).then(handleServerResponse);
}

export function fetchInitialCards() {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/cards`, {
    method: "GET",
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  }).then(handleServerResponse);
}

export function updateUserProfile(name, about) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleServerResponse);
}

export function addNewCard(name, link) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleServerResponse);
}

export function deleteCard(cardId) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

export function likeCard(cardId) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

export function unlikeCard(cardId) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(handleServerResponse);
}

export function updateUserAvatar(avatarUrl) {
  return fetch(`${apiConfig.serverUrl + apiConfig.cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(handleServerResponse);
}