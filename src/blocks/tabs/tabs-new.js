document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tabs__link'); // Все вкладки
  const tabContents = document.querySelectorAll('.tabs__content-item'); // Контент вкладок
  const tabWraps = document.querySelectorAll('.tabs__link-wrap'); // Обертки вкладок

  // Функция для отображения вкладки
  function showTab(tabId) {
    // Убираем активные классы с всех вкладок и контента
    tabs.forEach(tab => tab.classList.remove('tabs__link--active'));
    tabWraps.forEach(wrap => wrap.classList.remove('tabs__link-wrap--active'));
    tabContents.forEach(content => content.classList.remove('tabs__content-item--active'));

    // Добавляем активный класс на текущую вкладку
    const activeTab = document.querySelector(`a[href="${tabId}"]`);
    activeTab.classList.add('tabs__link--active');

    // Добавляем активный класс на обертку текущей вкладки
    const activeTabWrap = activeTab.closest('.tabs__link-wrap');
    activeTabWrap.classList.add('tabs__link-wrap--active');

    // Если это вкладка "Усе про товар", показываем весь контент
    if (tabId === '#tab00') {
      tabContents.forEach(content => content.classList.add('tabs__content-item--active'));
    } else {
      // Если это другая вкладка, показываем только её контент
      const targetContent = document.querySelector(tabId);
      targetContent.classList.add('tabs__content-item--active');
    }
  }

  // Проверка на хеш в URL при загрузке страницы
  const initialTab = location.hash || '#tab00'; // Если хеш пустой, показываем вкладку "#tab00"
  showTab(initialTab);

  // Обработчик кликов по вкладкам
  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const tabId = tab.getAttribute('href');
      showTab(tabId); // Показываем контент соответствующей вкладки
      window.location.hash = tabId; // Обновляем URL хеш
    });
  });
});
