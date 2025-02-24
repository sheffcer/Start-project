    document.addEventListener('DOMContentLoaded', function() {
      const tabs = document.querySelectorAll('.tabs__link');
      const tabContents = document.querySelectorAll('.tabs__content-item');
      const tabWraps = document.querySelectorAll('.tabs__link-wrap');
      
      // Функция для переключения вкладок
      function showTab(tabId) {
        // Убираем активный класс с всех вкладок
        tabs.forEach(tab => tab.classList.remove('tabs__link--active'));
        tabWraps.forEach(wrap => wrap.classList.remove('tabs__link-wrap--active'));
        // Убираем активный класс с всех контентов
        tabContents.forEach(content => content.classList.remove('tabs__content-item--active'));
  
        // Добавляем активный класс на текущую вкладку
        const activeTab = document.querySelector(`a[href="${tabId}"]`);
        activeTab.classList.add('tabs__link--active');
  
        // Добавляем активный класс на обертку текущей вкладки
        const activeTabWrap = activeTab.closest('.tabs__link-wrap');
        activeTabWrap.classList.add('tabs__link-wrap--active');
  
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

document.addEventListener('DOMContentLoaded', function(){

  if(location.hash) {
    showTab(location.hash);
  }

  // Следим за поднимающимися кликами
  document.addEventListener('click', function(event) {
    if(event.target.dataset.toggle === 'tab') {
      event.preventDefault();
      var target = event.target.hash === undefined ? event.target.dataset.target : event.target.hash;
      if ( target !== undefined ) {
        showTab(target);
        if(history && history.pushState && history.replaceState) {
          var stateObject = {'url' : target};
          if (window.location.hash && stateObject.url !== window.location.hash) {
            window.history.pushState(stateObject, document.title, window.location.pathname + target);
          } else {
            window.history.replaceState(stateObject, document.title, window.location.pathname + target);
          }
        }
      }
    }
  });

  /**
   * Показывает таб
   * @param  {string} tabId ID таба, который нужно показать
   */
  function showTab(tabId){
    var element = document.querySelector(tabId);
    if ( element && element.classList.contains('tabs__content-item') ) {
      var tabsParent = document.querySelector(tabId).closest('.tabs');
      var activeTabClassName = 'tabs__link-wrap--active';
      var activeTabContentClassName = 'tabs__content-item--active';
      // таб
      tabsParent.querySelectorAll('.'+activeTabClassName).forEach(function(item){
        item.classList.remove(activeTabClassName);
      });
      var activeTab = tabsParent.querySelector('[href="'+tabId+'"]') ? tabsParent.querySelector('[href="'+tabId+'"]') : tabsParent.querySelector('[data-target="'+tabId+'"]')
      activeTab.closest('.tabs__link-wrap').classList.add(activeTabClassName);
      // контент таба
      tabsParent.querySelectorAll('.'+activeTabContentClassName).forEach(function(item){
        item.classList.remove(activeTabContentClassName);
      });
      tabsParent.querySelector(tabId).classList.add(activeTabContentClassName);
    }
  }

  // Добавление метода .closest() (полифил, собственно)
  (function(e){
   e.closest = e.closest || function(css){
     var node = this;

     while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
     }
     return null;
   }
  })(Element.prototype);

});
