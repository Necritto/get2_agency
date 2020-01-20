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
});

//  Login window

const login = $nav.querySelector('.login');

login.addEventListener('click', modal);

function modal() {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.innerHTML = `
    <form action="" class="form">
      <h2>Login</h2>
      <input type="text" placeholder="Login" required>
      <input type="password" placeholder="********" required>
      <input type="submit" value="Log in">
    </form>
  `;
  login.parentElement.append(div);

  document.addEventListener('click', (e) => {
    if(e.target.nodeName === 'DIV') {
      div.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.body.style.overflow = 'hidden';
}