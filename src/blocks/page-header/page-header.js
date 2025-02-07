document.addEventListener('DOMContentLoaded', function(){

// Получаем все элементы селектора с классом .page-header__region
const selectRegionContainers = document.querySelectorAll('.page-header__region');

selectRegionContainers.forEach(container => {
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
      selectRegionContainers.forEach(otherContainer => {
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
  selectRegionContainers.forEach(container => {
    const optionsContainer = container.querySelector('.field-select__options');
    if (!container.contains(event.target)) {
      optionsContainer.style.display = 'none';
    }
  });
});

 // language switcher

// Получаем все элементы с классом .page-header__lang (для переключения языка)
const selectLangContainers = document.querySelectorAll('.page-header__lang');

selectLangContainers.forEach(container => {
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
      
      // Обновляем все другие селекторы с этим классом .page-header__lang
      selectLangContainers.forEach(otherContainer => {
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

// Закрытие списка при клике вне селектора
document.addEventListener('click', function(event) {
  selectLangContainers.forEach(container => {
    const optionsContainer = container.querySelector('.field-select__options');
    if (!container.contains(event.target)) {
      optionsContainer.style.display = 'none';
    }
  });
});



});