document.querySelectorAll('.field-radio__input').forEach(input => {
    input.addEventListener('change', () => {
      // Убираем класс у всех элементов
      document.querySelectorAll('.field-radio__input-wrap').forEach(wrap => {
        wrap.classList.remove('checked');
        console.log('checked');
      });
      
      // Добавляем класс к родительскому элементу выбранного input
      input.closest('.field-radio__input-wrap').classList.add('checked');
    });
  });

  // document.querySelectorAll('.field-radio__input').forEach((radioButton) => {
  //   radioButton.addEventListener('change', () => {
  //     const label = radioButton.closest('label');
  //     const span = label.querySelector('.field-radio__name-text');
      
  //     // Меняем line-height в зависимости от того, выбран ли инпут
  //     if (radioButton.checked) {
  //       span.style.fontwight = '700';
  //       span.style.color = 'red';
  //     } else {
  //       span.style.lineHeight = '500'; // Или ваш начальный line-height
  //     }
  //   });
  // });
  

// Функция для обновления стилей
function updateFontWeight() {
  // Для всех элементов .field-radio__name-text сбрасываем font-weight на 500
  document.querySelectorAll('.field-radio__name-text').forEach((span) => {
    span.style.fontWeight = '500'; // Сбрасываем font-weight на 500
    span.style.color = 'var(--light-text-color)'; // Сбрасываем font-weight на 500
  });

  // Для выбранного инпута изменяем font-weight на 700
  document.querySelectorAll('.field-radio__input').forEach((radioButton) => {
    if (radioButton.checked) {
      const label = radioButton.closest('label');
      const span = label.querySelector('.field-radio__name-text');
      span.style.fontWeight = '700'; // Меняем font-weight на 700
      span.style.color = 'black';
    }
  });
}

// Добавляем обработчик для изменения состояния инпута
document.querySelectorAll('.field-radio__input').forEach((radioButton) => {
  radioButton.addEventListener('change', updateFontWeight);
});

// Инициализация страницы — сразу применяем стили для выбранного инпута
window.addEventListener('load', updateFontWeight);

