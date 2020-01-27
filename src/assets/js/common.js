// Menu for phones

const $btn = document.querySelector('#show');
const $nav = document.querySelector('#nav');

$btn.addEventListener('click', function (e) {
  e.preventDefault();
  $nav.classList.toggle('active');
});

document.addEventListener('scroll', function (e) {
  e.preventDefault();
  $nav.classList.remove('active');
});

// Additional navbar

const more = $nav.querySelector('.more');
const moreItem = $nav.querySelector('.moreItem');
moreItem.classList.add('hide');
more.firstChild.style.opacity = '0.3';

more.addEventListener('click', (e) => {
  e.preventDefault();
  more.querySelector('.dot').classList.toggle('triangle');
  moreItem.classList.toggle('show');


  // Additional navbar positioning

  function createElementsUnder(anchor, elem) {
    let coords = getCoords(anchor);

    elem.style.left = coords.left - anchor.offsetWidth / 5 + 'px';
    elem.style.top = coords.top + (anchor.offsetHeight - 10) + 'px';
  }

  createElementsUnder(more, moreItem);
});

//  Login window

const login = $nav.querySelector('.login');

login.addEventListener('click', modal);

function modal() {
  const modal = $nav.querySelector('.logModal');

  modal.classList.remove('hide');
  modal.classList.add('show');

  document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'DIV') {
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }
  });

  document.body.style.overflow = 'hidden';
}

// Form validate

const [logErrReg, logErrLog] = $nav.querySelectorAll('.logErr');
const [passErrReg, passErrLog] = $nav.querySelectorAll('.passErr');
const [regForm, logForm] = $nav.querySelectorAll('.form');
const [loginInputReg, loginInputLog] = $nav.querySelectorAll('input[type="text"]');
const [passInputReg, passInputLog] = $nav.querySelectorAll('input[type="password"]');
const [submitReg, submitLog] = $nav.querySelectorAll('input[type="submit"]');

const logOptions = {
  mainElem: logForm,
  errLogElem: loginInputLog,
  errPassElem: passInputLog,
  logErr: logErrLog,
  passErr: passErrLog,
  submitLog
};

formValidate(logOptions);

function formValidate(options) {
  options.mainElem.addEventListener('submit', (e) => {
    let logMessages = [];
    let passMessages = [];

    (options.errLogElem.value.length < 3) ? logMessages.push('Login must be at least 2 characters')
      : (options.errLogElem.value.length > 10) ? logMessages.push('Login must be less than 10 characters') : '';

    (options.errPassElem.value.length < 8) ? passMessages.push('Password must be at least 8 characters')
      : (options.errPassElem.value.length > 20) ? passMessages.push('Password must be less than 20 characters') : '';

    if (logMessages.length > 0 || passMessages.length > 0) {
      e.preventDefault();
      options.logErr.innerHTML = logMessages;
      options.passErr.innerHTML = passMessages;
    }

    (!logMessages.length) ? options.logErr.style.display = 'none' : options.logErr.style.display = 'block';
    (!passMessages.length) ? options.passErr.style.display = 'none' : options.passErr.style.display = 'block';

    if (!logMessages.length && !passMessages.length) {
      options.errLogElem.style.margin = '30px auto';
      options.errPassElem.style.margin = '30px auto';
      options.submitLog.style.margin = '30px auto';
    } else if (!logMessages.length) {
      options.errLogElem.style.margin = '30px auto';
      options.errPassElem.style.margin = '30px auto 10px auto';
      options.submitLog.style.margin = '10px auto';
    } else if (!passMessages.length) {
      options.errLogElem.style.margin = '30px auto 10px auto';
      options.errPassElem.style.margin = '10px auto';
      options.submitLog.style.margin = '30px auto';
    } else {
      options.errLogElem.style.margin = '30px auto 10px auto';
      options.errPassElem.style.margin = '10px auto';
      options.submitLog.style.margin = '10px auto';
    }
  });
}

// Error validation message positioning

function createMessageUnder(anchor, elem) {
  let coords = getCoords(anchor);

  elem.style.left = coords.left + coords.offsetWidth + getComputedStyle(anchor).marginLeft + 'px';
  elem.style.top = coords.top + coords.offsetHeight + 'px';
  anchor.style.marginBottom = 0;
}

createMessageUnder(loginInputLog, logErrLog);
createMessageUnder(passInputLog, passErrLog);

function getCoords(elem) {

  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

// Registration form

const reg = $nav.querySelector('.reg');

reg.addEventListener('click', registration);

function registration() {
  const registr = $nav.querySelector('.registr');
  const close = $nav.querySelector('.close');

  registr.classList.remove('hide');
  registr.classList.add('show');

  close.addEventListener('click', () => {
    registr.classList.remove('show');
    registr.classList.add('hide');
    document.body.style.overflow = '';
  });

  document.body.style.overflow = 'hidden';
}

const regOptions = {
  mainElem: regForm,
  errLogElem: loginInputReg,
  errPassElem: passInputReg,
  logErr: logErrReg,
  passErr: passErrReg,
  submitReg
};

formValidate(regOptions);

createMessageUnder(loginInputReg, logErrReg);
createMessageUnder(passInputReg, passErrReg);

// SearchBox

const searchBox = document.querySelector('.searchBox');
const items = searchBox.querySelectorAll('select');

searchBox.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.nodeName === 'BUTTON') {
    let searchArray = [];

    for (let item of items) {
      searchArray.push(item.selectedOptions[0].value);
    }

    let searchObj = searchArray.reduce((acc, item, i) => {
      acc[i] = item;
      return acc;
    }, {});

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchObj)
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(setTimeout(() => {
        window.open('https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS');
      }, 1000));
  }
});

//  Header icon dynamics

const placeIcon = document.querySelector('.headerContent__icons .place');
const timeIcon = document.querySelector('.headerContent__icons .time');
const weatherIcon = document.querySelector('.headerContent__icons .weather');
const flightsIcon = document.querySelector('.headerContent__icons .flights');
const hotelsIcon = document.querySelector('.headerContent__icons .hotels');

clock();

function clock() {
  const date = new Date();
  let gmt = date.getTimezoneOffset();
  let hours = date.getUTCHours() + 2; // need to make a choice of time zone
  let min = date.getMinutes();

  if (hours < 10) hours = '0' + hours;
  if (min < 10) min = '0' + min;
  if (gmt === -180) gmt = '+2';

  let timeStr = `${hours}:${min}, GMT${gmt}`;

  timeIcon.innerHTML = timeStr;
  setInterval(clock, 1000);
}

weather();

function weather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Madrid,es&APPID=bf78e6fd2a2368ccd82e3e19af599950')
    .then(response => response.json())
    .then(data => {
      let url = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
      const img = document.createElement('img');
      img.src = url;
      img.style.width = '80px';
      placeIcon.textContent = data.name;
      weatherIcon.querySelector('.descr').textContent = data.weather[0]['description'];
      weatherIcon.querySelector('.temp').innerHTML = `${Math.round(data.main.temp - 273)}°C`;
      weatherIcon.querySelector('.image').appendChild(img);
    });
}

flight();

function flight() {
  flightsIcon.textContent = `+${Math.floor(Math.random() * (500 - (Math.random() * 2) + 1))} Flights`;
}

hotel();

function hotel() {
  hotelsIcon.textContent = `+${Math.floor(Math.random() * (100 - (Math.random() * 2) + 1))} Hotels`;
}

//  Tours

const tourBtn = document.querySelector('.tour-btn');

tourBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.open('/tours');
});


// Cities

const cities = document.querySelector('.cities-wrap');
cities.style.cursor = 'pointer';

cities.addEventListener('click', (e) => {
  e.preventDefault();
  const firstImg = document.querySelector('.cities-img__item-main');
  const secondImg = document.querySelector('.cities-img__item-second');
  const thirdImg = document.querySelector('.cities-img__item-third');
  const linkText = document.querySelector('.cities-link span');

  if (e.target.nodeName === 'P') {
    [...cities.children].forEach(item => {
      item.classList.remove('focusedCity');
    });
    e.target.classList.add('focusedCity');

    const src = e.target.textContent.replace(/\s/g, '').toLowerCase();

    firstImg.src = `./assets/img/${src}.jpg`;
    secondImg.src = `./assets/img/${src}2.jpg`;
    thirdImg.src = `./assets/img/${src}3.jpg`;

    firstImg.alt = e.target.textContent;
    secondImg.alt = e.target.textContent;
    thirdImg.alt = e.target.textContent;

    linkText.textContent = e.target.textContent;
  }
});

// Places

const placesType = document.querySelector('.section-places__type');
const placesCards = document.querySelectorAll('.section-places__card-item');

placesType.addEventListener('click', (e) => {
  if (e.target.classList.contains('section-places__type-item') || e.target.nodeName === 'P') {
    [...placesType.children].forEach(item => {
      item.classList.remove('focusedPlaces');
    });
    if (e.target.nodeName === 'P') {
      e.target.parentElement.classList.add('focusedPlaces');
    }
    if (e.target.classList.contains('section-places__type-item')) {
      e.target.classList.add('focusedPlaces');
      let randomCost = [Math.floor(Math.random() * (100 - (Math.random() * 2)))
        , Math.floor(Math.random() * (50 - (Math.random() * 2)))
        , Math.floor(Math.random() * (30 - (Math.random() * 2)))];

      placesCards.forEach(item => {
        item.innerHTML = `
          <div class="section-places__card-item">
            <img src="./assets/img/${e.target.textContent.trim().toLowerCase()}Hotel.jpg" alt="Hotel" class="section-places__cart-item-img">
            <div class="section-places__card-item-wrap">
              <h3 class="section-places__card-item-title">Some ${e.target.textContent.trim()} Hotel</h3>
              <img class="rate" src="./assets/img/star.png" alt="star"></i>
            </div>
            <div class="section-places__card-item-icons">
              <p class="section-places__card-item-cost flights">${randomCost[0]} €</p>
              <p class="section-places__card-item-cost hotels">${randomCost[1]} €</p>
              <p class="section-places__card-item-cost cars">${randomCost[2]} €</p>
            </div>
          </div>
        `;
      });
    }
  }
});
