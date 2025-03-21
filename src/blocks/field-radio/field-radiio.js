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