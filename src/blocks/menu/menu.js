const dropdown = document.querySelector('.page-header__catalog .dropdown__toggler');
const menu = document.querySelector('.page-header__catalog .menu');
const menuItems = document.querySelectorAll('.menu__item');

dropdown.addEventListener('click', function (e) {
  e.preventDefault(); // Предотвратить стандартное поведение

  if (menu) {
    menu.classList.toggle('show'); // Добавляем/удаляем класс для отображения меню
    console.log("Menu toggled"); // Проверка, что событие сработало
  } else {
    console.warn('Menu not found');
  }

  // Закрытие меню при клике вне меню или кнопки
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !dropdown.contains(event.target)) {
      menu.classList.remove('show'); // Закрываем меню, если кликнули вне
      console.log('Menu closed');
    }
  });
});

// Обработка наведения на элементы для показа подменю
menuItems.forEach(item => {
  item.addEventListener('mouseenter', function () {
    const subMenu = item.querySelector('.menu__lvl--2');
    if (subMenu) {
      subMenu.style.opacity = 1;
      subMenu.style.visibility = 'visible';
      subMenu.style.maxHeight = '1000px'; // Подменю раскрывается
      console.log("Submenu visible");
    }
  });

  item.addEventListener('mouseleave', function () {
    const subMenu = item.querySelector('.menu__lvl--2');
    if (subMenu) {
      subMenu.style.opacity = 0;
      subMenu.style.visibility = 'hidden';
      subMenu.style.maxHeight = '0'; // Подменю скрывается
      console.log("Submenu hidden");
    }
  });
});
