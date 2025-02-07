document.addEventListener('DOMContentLoaded', function(){

// Получаем все элементы селектора с классом .page-header__region
const selectContainers = document.querySelectorAll('.page-header__region');

selectContainers.forEach(container => {
  const selectElement = container.querySelector('.field-select__select');
  const optionsContainer = container.querySelector('.field-select__options');
  const selectedText = container.querySelector('.field-select__selected');
  const options = container.querySelectorAll('.field-select__option');

  // Открытие/закрытие списка при клике на селектор
  selectElement.addEventListener('click', function(event) {
    event.stopPropagation(); // Предотвращаем всплытие события
    optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block'; // Переключаем отображение
  });

  // Выбор опции
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Меняем выбранное значение
      selectedText.innerHTML = option.innerHTML;
      
      // Закрываем список после выбора
      optionsContainer.style.display = 'none';
      
      // Обновляем все другие селекторы с этим классом
      selectContainers.forEach(otherContainer => {
        if (otherContainer !== container) {
          const otherSelectedText = otherContainer.querySelector('.field-select__selected');
          if (otherSelectedText) {
            otherSelectedText.innerHTML = selectedText.innerHTML;
          }
        }
      });
    });
  });
});

// Закрытие списка при клике вне
document.addEventListener('click', function(event) {
  selectContainers.forEach(container => {
    const optionsContainer = container.querySelector('.field-select__options');
    if (!container.contains(event.target)) {
      optionsContainer.style.display = 'none';
    }
  });
});

      
// // Получаем все элементы
// const selectContainer = document.querySelector('.main .field-select__select');
// const optionsContainer = document.querySelector('.main .field-select__options');  // Список с опциями
// const selectedText = document.querySelector('.field-select__selected');
// const options = document.querySelectorAll('.field-select__option');

// // console.log(optionsContainer);
// console.log(selectContainer, optionsContainer, selectedText, options);

// // Открытие/закрытие списка при клике на контейнер
// selectContainer.addEventListener('click', function(event) {
//   console.log('Select container clicked');  
//   event.stopPropagation(); // Предотвращаем событие всплытия
//   optionsContainer.classList.toggle('open');  // Добавляем/удаляем класс .open на контейнере с опциями
// });

// // Обработчик выбора опции
// options.forEach(option => {
//   option.addEventListener('click', function() {
//     const selectedFlag = option.querySelector('.field-select__icon').src;
//     const selectedTextValue = option.textContent.trim();
    
//     // Изменяем выбранное значение
//     selectedText.innerHTML = `<img src="${selectedFlag}" class="field-select__icon" alt="Selected Flag"> ${selectedTextValue}`;

//     // Закрыть список после выбора
//     optionsContainer.classList.remove('open');  // Убираем класс open, чтобы скрыть список
//   });
// });

// // Закрытие списка при клике вне
// document.addEventListener('click', function(event) {
//   if (!selectContainer.contains(event.target)) {
//     optionsContainer.classList.remove('open');  // Закрываем список, если кликнули вне контейнера
//   }
// });



});