document.addEventListener('DOMContentLoaded', function(){
    var filtersBtn = document.querySelector('.product-list__filters');
    var closeFiltersBtn = document.querySelector('.mobile-filters .burger--close');
    var submitFiltersBtn = document.querySelector('.mobile-filters .btn--submit');
    var filters = document.querySelector('.mobile-filters');

    // Открытие фильтров при клике на кнопку
    if (filtersBtn) {
        filtersBtn.addEventListener('click', function() {
            filters.classList.toggle('mobile-filters--open');
        });
    }

    // Закрытие фильтров при клике на кнопку закрытия
    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', function() {
            filters.classList.remove('mobile-filters--open');
        });
    }
   
    // Закрытие фильтров при клике на кнопку применения фильтров
    if (submitFiltersBtn) {
        submitFiltersBtn.addEventListener('click', function() {
            filters.classList.remove('mobile-filters--open');
        });
    }

    // Закрытие фильтров при нажатии клавиши Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            filters.classList.remove('mobile-filters--open');
        }
    });

    // Автоматическое закрытие фильтров при изменении ширины экрана
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            filters.classList.remove('mobile-filters--open');
        }
    });
    
});
