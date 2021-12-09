document.addEventListener('DOMContentLoaded', () => {
  const MENU_ICON = document.querySelector('.menu-icon');
  const CLOSE_ICON = document.querySelector('.close-icon');
  const SIDE_MENU = document.querySelector('.side-menu');

  MENU_ICON.addEventListener('click', () => {
    SIDE_MENU.classList.toggle('active');
  });
  CLOSE_ICON.addEventListener('click', () => {
    SIDE_MENU.classList.remove('active');
  });
})