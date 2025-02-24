document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.querySelector('.tabs__links'); // Родительский элемент вкладок
  const tabContents = document.querySelectorAll('.tabs__content-item'); // Все вкладки контента
  const tabs = document.querySelectorAll('.tabs__link'); // Все элементы вкладок
  const tabWraps = document.querySelectorAll('.tabs__link-wrap'); // Обертки для вкладок
console.log("tabsContainer:", tabsContainer);
  // Функция для отображения контента в зависимости от выбранной вкладки
  function showTab(tabId) {
    console.log("Переключаем на вкладку:", tabId);

    // Убираем активные классы с всех вкладок и контента
    tabContents.forEach(content => content.classList.remove('tabs__content-item--active'));
    tabs.forEach(tab => tab.classList.remove('tabs__link--active'));
    tabWraps.forEach(wrap => wrap.classList.remove('tabs__link-wrap--active'));

    // Находим активную вкладку
    const activeTab = document.querySelector(`a[href="${tabId}"]`);
    console.log("Активная вкладка:", activeTab);
    if (activeTab) {
      activeTab.classList.add('tabs__link--active');  // Добавляем класс активной вкладке

      const activeTabWrap = activeTab.closest('.tabs__link-wrap');
      console.log("Обертка активной вкладки:", activeTabWrap);
      if (activeTabWrap) {
        activeTabWrap.classList.add('tabs__link-wrap--active');  // Добавляем класс активной обертке
      }
    }

    // Показываем контент для выбранной вкладки
    const targetContent = document.querySelector(tabId);
    console.log("Целевой контент:", targetContent);
    if (targetContent) {
      targetContent.classList.add('tabs__content-item--active');
    }

    // Если вкладка "Усе про товар", показываем контент всех вкладок, кроме этой
    if (tabId === '#tab00') {
      tabContents.forEach(content => {
        if (content.id !== 'tab00') {  // Пропускаем вкладку "Усе про товар"
          content.classList.add('tabs__content-item--active');
        }
      });
    }
  }

  // Проверка на хеш в URL при загрузке страницы
  const initialTab = location.hash || '#tab00'; // Если хеш пустой, показываем вкладку "#tab00"
  showTab(initialTab);

  // Обработчик кликов по вкладкам (делегирование событий)
  tabsContainer.addEventListener('click', function (e) {
    const clickedTab = e.target.closest('a.tabs__link'); // Проверяем, что клик был по ссылке вкладки
    console.log("Клик по элементу:", clickedTab);

    if (clickedTab) {
      e.preventDefault(); // Останавливаем стандартное поведение
      const tabId = clickedTab.getAttribute('href');
      console.log("ID вкладки:", tabId);  // Логируем ID вкладки, на которую кликнули
      showTab(tabId); // Показываем контент соответствующей вкладки
      window.location.hash = tabId; // Обновляем URL хеш
    }
  });
});
