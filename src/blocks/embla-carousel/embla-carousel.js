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
const dotsContainerSecond = rootNodeSecond.querySelector('.embla__dots');
const optionsSecond = { loop: false, speed: 10,  slidesToScroll: 2, };

const emblaSecond = EmblaCarousel(viewportNodeSecond, optionsSecond);

// Функция для обновления точек второго слайдера
const updateDotsSecond = () => {
  const slides = emblaSecond.slideNodes();
  const selectedIndex = emblaSecond.selectedScrollSnap();

  // Очистка старых точек
  dotsContainerSecond.innerHTML = '';

  // Добавление новых точек
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('embla__dot');

    if (index === selectedIndex) {
      dot.classList.add('is-selected'); // Активная точка
    }

    dot.addEventListener('click', () => {
      emblaSecond.scrollTo(index); // Прокрутка к выбранному слайду
    });

    dotsContainerSecond.appendChild(dot);
  });
};

// Инициализация точек для второго слайдера
updateDotsSecond();

// Обновление точек при изменении слайда
emblaSecond.on('select', updateDotsSecond);
