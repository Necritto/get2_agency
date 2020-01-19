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

const more = $nav.querySelector('.more');
const moreItem = $nav.querySelector('.moreItem');
moreItem.classList.add('hide');
more.firstChild.style.opacity = '0.3';

more.addEventListener('click', (e) => {
  e.preventDefault();
  more.querySelector('.dot').classList.toggle('triangle');
  moreItem.classList.toggle('show');
});

const login = $nav.querySelector('.login');

login.addEventListener('click', modal);

function modal() {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.innerHTML = `
    <div class="modal__content">
      <span class="close">&times;</span>
      <p>Login</p>
    </div>
  `;
  login.parentElement.append(div);

  const span = div.querySelector('.close');

  span.addEventListener('click', () => {
    div.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.body.style.overflow = 'hidden';
}