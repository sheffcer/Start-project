$( document ).ready(function() {
    console.log( "ready!" );

    // const select = document.querySelector('.page-header__lang .field-select__select');
    // const selectWrap = document.querySelector('.page-header__lang .field-select__select-wrap');

    // // Переворачиваем стрелку при фокусе на select (открытие списка)
    // select.addEventListener('focus', function () {
    //   selectWrap.classList.add('open'); // Добавляем класс, чтобы повернуть стрелку
    // });

    // // Стрелка поворачивается при изменении значения
    // select.addEventListener('change', function () {
    //   selectWrap.classList.remove('open'); // Возвращаем стрелку в исходное положение после выбора
    //   select.blur(); // Снимаем фокус с select
    // });

    // // Возвращаем стрелку в исходное положение при потере фокуса
    // select.addEventListener('blur', function () {
    //   selectWrap.classList.remove('open'); // Убираем класс, чтобы вернуть стрелку в исходное положение
    // });

//     fetch('/img/sprite.svg')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to fetch sprite.svg');
//     }
//     return response.text();
//   })
//   .then(data => {
//     console.log(data);  // Ты должен увидеть SVG код спрайта в консоли
//   })
//   .catch(error => {
//     console.error('Error fetching sprite:', error);
//   });

});
