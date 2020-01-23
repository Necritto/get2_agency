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