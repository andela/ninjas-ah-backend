/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const HOST = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

async function getData(URL, resType = 'text', token = '') {
  try {
    const request = new Request(URL, {
      method: 'GET',
      mode: 'cors',
      cache: 'reload',
      headers: {
        'access-token': token
      }
    });

    let result = '';
    const response = await fetch(request);

    if (resType === 'json') {
      result = await response.json();
      return result;
    }
    result = await response.text();
    return result;
  } catch (e) {
    throw Error(e);
  }
}

async function sendData(METHOD, URL, data = {}, resType = 'text', token = '') {
  try {
    const request = new Request(URL, {
      method: METHOD,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': token
      },
      body: JSON.stringify(data)
    });

    let result = '';
    const response = await fetch(request);

    if (resType === 'json') {
      result = await response.json();
      return result;
    }
    result = await response.text();
    return result;
  } catch (e) {
    throw Error(e);
  }
}

function displayUser() {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;

  if (user) {
    document.querySelector('.loggedInUser').innerHTML = `(${user.firstName} ${user.lastName})`;
  } else {
    document.querySelector('.loggedInUser').innerHTML = '';
  }
}

function startLoadingButton() {
  if (document.querySelector('#submit')) {
    document.querySelector('#submit').innerHTML = 'Loading...';
  }
}
function endLoadingButton() {
  if (document.querySelector('#submit')) {
    document.querySelector('#submit').innerHTML = 'Submit';
  }
}

window.document.addEventListener('DOMContentLoaded', () => {
  displayUser();
});
