import EmblaCarousel from 'embla-carousel';

// Инициализация для первого слайдера
const rootNodeFirst = document.querySelector('.embla--first');
const viewportNodeFirst = rootNodeFirst.querySelector('.embla__viewport');
const dotsContainerFirst = rootNodeFirst.querySelector('.embla__dots');
const prevButtonNodeFirst = rootNodeFirst.querySelector('.embla__prev');
const nextButtonNodeFirst = rootNodeFirst.querySelector('.embla__next');
const optionsFirst = { loop: true, speed: 5 };

const emblaFirst = EmblaCarousel(viewportNodeFirst, optionsFirst);

// Добавление обработчиков событий для кнопок первого слайдера
prevButtonNodeFirst.addEventListener('click', () => emblaFirst.scrollPrev(), false);
nextButtonNodeFirst.addEventListener('click', () => emblaFirst.scrollNext(), false);

// Функция для обновления точек первого слайдера
const updateDotsFirst = () => {
  const slides = emblaFirst.slideNodes();
  const selectedIndex = emblaFirst.selectedScrollSnap();

  // Очистка старых точек
  dotsContainerFirst.innerHTML = '';

  // Добавление новых точек
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('embla__dot');

    if (index === selectedIndex) {
      dot.classList.add('is-selected'); // Активная точка
    }

    dot.addEventListener('click', () => {
      emblaFirst.scrollTo(index); // Прокрутка к выбранному слайду
    });

    dotsContainerFirst.appendChild(dot);
  });
};

// Инициализация точек для первого слайдера
updateDotsFirst();

// Обновление точек при изменении слайда
emblaFirst.on('select', updateDotsFirst);


// Инициализация для второго слайдера (без кнопок)
const rootNodeSecond = document.querySelector('.embla--second');
const viewportNodeSecond = rootNodeSecond.querySelector('.embla__viewport');

// Переменная для хранения слайдера
let emblaSecond;

// Функция для получения настроек слайдера
const getEmblaOptions = () => {
  return window.innerWidth >= 992 ? {
    loop: false,
    speed: 10,
    slidesToScroll: 1,
    axis: 'y', // Вертикальная прокрутка
  } : {
    loop: false,
    speed: 10,
    slidesToScroll: 2,
    axis: 'x', // Горизонтальная прокрутка
  };
};

// Функция для инициализации слайдера
const initializeEmbla = () => {
  // Уничтожаем старую инициализацию, если она есть
  if (emblaSecond) {
    emblaSecond.destroy();
  }

  // Инициализация слайдера с новыми настройками
  emblaSecond = EmblaCarousel(viewportNodeSecond, getEmblaOptions());
};

// Перерисовываем слайдер при изменении размера окна
const updateSlider = () => {
  // Добавляем или убираем классы в зависимости от прокрутки
  rootNodeSecond.classList.toggle('embla--vertical', window.innerWidth >= 992);
  rootNodeSecond.classList.toggle('embla--horizontal', window.innerWidth < 992);

  // Инициализируем слайдер заново с актуальными настройками
  initializeEmbla();
};

// Инициализация слайдера
updateSlider();

// Обновляем слайдер при изменении ширины окна
window.addEventListener('resize', updateSlider);