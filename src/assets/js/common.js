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
    elem.style.top = coords.top + (anchor.offsetHeight - 10) +'px';
  }

  createElementsUnder(more, moreItem);
});

//  Login window

const login = $nav.querySelector('.login');

login.addEventListener('click', modal);

function modal() {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.innerHTML = `
    <form action="/" class="form" method="GET">
      <h2>Login</h2>
      <input type="text" placeholder="Login" required>
      <span class="logErr hide"></span>
      <input type="password" placeholder="********" required>
      <span class="passErr hide"></span>
      <input type="submit" value="Log in">
    </form>
  `;
  login.parentElement.append(div);

  document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'DIV') {
      div.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.body.style.overflow = 'hidden';

  // Form validate

  const logErr = $nav.querySelector('.logErr');
  const passErr = $nav.querySelector('.passErr');
  const form = $nav.querySelector('.form');
  const loginInput = $nav.querySelector('input[type="text"]');
  const passInput = $nav.querySelector('input[type="password"]');

  form.addEventListener('submit', (e) => {
    let logMessages = [];
    let passMessages = [];

    (loginInput.value.length < 3) ? logMessages.push('Login must be at least 2 characters')
      : (loginInput.value.length > 10) ? logMessages.push('Login must be less than 10 characters') : '';

    (passInput.value.length < 8) ? passMessages.push('Password must be at least 8 characters')
      : (passInput.value.length > 20) ? passMessages.push('Password must be less than 20 characters') : '';

    if (logMessages.length > 0 || passMessages.length > 0) {
      e.preventDefault();
      logErr.innerHTML = logMessages;
      passErr.innerHTML = passMessages;
    }

    (!logMessages.length) ? logErr.style.display = 'none' : logErr.style.display = 'block';
    (!passMessages.length) ? passErr.style.display = 'none' : passErr.style.display = 'block';
  });

  // Error validation message positioning

  function createMessageUnder(anchor, elem) {
    let coords = getCoords(anchor);

    elem.style.left = coords.left + coords.offsetWidth + 'px';
    elem.style.top = (coords.top + coords.offsetHeight) + 'px';
    anchor.style.marginBottom = 0;
  }

  createMessageUnder(loginInput, logErr);
  createMessageUnder(passInput, passErr);
}

function getCoords(elem) {

  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}