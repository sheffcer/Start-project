  document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tabs__link');
    const tabContents = document.querySelectorAll('.tabs__content-item');
    
    // Функция для переключения вкладок
    function showTab(tabId) {
      // Убираем активный класс с всех вкладок
      tabs.forEach(tab => tab.classList.remove('tabs__link--active'));
      // Убираем активный класс с всех контентов
      tabContents.forEach(content => content.classList.remove('tabs__content-item--active'));

      // Добавляем активный класс на текущую вкладку
      const activeTab = document.querySelector(`a[href="${tabId}"]`);
      activeTab.classList.add('tabs__link--active');

      // Показываем контент для текущей вкладки
      const targetContent = document.querySelector(tabId);
      targetContent.classList.add('tabs__content-item--active');
    }

    // Проверка на хеш в URL при загрузке страницы
    if (location.hash) {
      showTab(location.hash);  // Показываем вкладку по хешу
    }

    // Добавляем событие для клика на вкладку
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = tab.getAttribute('href');
        showTab(tabId);
        window.location.hash = tabId;  // Обновляем хеш в URL
      });
    });
  });