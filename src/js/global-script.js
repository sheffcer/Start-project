$( document ).ready(function() {
    console.log( "ready!" );
    // Add your custom script here
    // $(document).ready(function() {
    //   $('.owl-carousel').owlCarousel({
    //     items: 13, // Количество видимых слайдов
    //     loop: true, // Зацикливать карусель
    //     margin: 10, // Отступы между слайдами
    //     autoplay: true, // Автопрокрутка
    //     autoplayTimeout: 2000, // Время до следующего слайда (в миллисекундах)
    //     autoplayHoverPause: true // Пауза автопрокрутки при наведении на слайд
    //   });
    // });
    
    // const select = document.querySelector('.page-header__lang .field-select__select');
    // const selectWrap = document.querySelector('.page-header__lang .field-select__select-wrap');

    // select.addEventListener('focus', () => {
    //     selectWrap.classList.add('open');
    // });

    // select.addEventListener('blur', () => {
    //     selectWrap.classList.remove('open');
    // });

    // const select = document.querySelector('.page-header__lang .field-select__select');
    // const selectWrap = document.querySelector('.page-header__lang  .field-select__select-wrap');

    // // Функция для переворота стрелки при выборе нового значения
    // select.addEventListener('change', function () {
    //   // Добавляем класс 'open' при изменении значения
    //   selectWrap.classList.add('open');
    
    //   // Это будет работать и в случае, если стрелка должна повернуться сразу после выбора
    //   // Если вы хотите повернуть стрелку при потере фокуса, добавьте обработчик blur
    // });

    // // Если нужно вернуть стрелку в исходное положение при потере фокуса
    // select.addEventListener('blur', function () {
    //   selectWrap.classList.remove('open');
    // });

    // const select = document.querySelector('.page-header__lang .field-select__select');
    // const selectWrap = document.querySelector('.page-header__lang .field-select__select-wrap');

    // // Переворачиваем стрелку при фокусе на select (открытие списка)
    // select.addEventListener('focus', function () {
    //   selectWrap.classList.add('open'); // Добавляем класс, чтобы повернуть стрелку
    // });

    // // Стрелка не возвращается в исходное положение сразу после выбора опции
    // select.addEventListener('change', function () {
    //   // Оставляем стрелку перевернутой после выбора
    //   selectWrap.classList.add('open');
    // });

    // // Возвращаем стрелку в исходное положение после того, как селект теряет фокус
    // select.addEventListener('blur', function () {
    //   selectWrap.classList.remove('open'); // Убираем класс, чтобы вернуть стрелку
    // });

    const select = document.querySelector('.page-header__lang .field-select__select');
    const selectWrap = document.querySelector('.page-header__lang .field-select__select-wrap');

    // Переворачиваем стрелку при фокусе на select (открытие списка)
    select.addEventListener('focus', function () {
      selectWrap.classList.add('open'); // Добавляем класс, чтобы повернуть стрелку
    });

    // Стрелка поворачивается при изменении значения
    select.addEventListener('change', function () {
      selectWrap.classList.remove('open'); // Возвращаем стрелку в исходное положение после выбора
      select.blur(); // Снимаем фокус с select
    });

    // Возвращаем стрелку в исходное положение при потере фокуса
    select.addEventListener('blur', function () {
      selectWrap.classList.remove('open'); // Убираем класс, чтобы вернуть стрелку в исходное положение
    });

});
