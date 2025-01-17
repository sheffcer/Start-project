import EmblaCarousel from 'embla-carousel';

// Grab wrapper nodes
const rootNode = document.querySelector('.embla');
const viewportNode = rootNode.querySelector('.embla__viewport');
const dotsContainer = document.querySelector('.embla__dots');
const options = { loop: false, speed: 10 };

// Initialize the carousel
const embla = EmblaCarousel(viewportNode, options);

// Grab button nodes
const prevButtonNode = rootNode.querySelector('.embla__prev');
const nextButtonNode = rootNode.querySelector('.embla__next');

// Add click listeners after initializing embla
prevButtonNode.addEventListener('click', () => embla.scrollPrev(), false);
nextButtonNode.addEventListener('click', () => embla.scrollNext(), false);

// Функция для обновления точек
const updateDots = () => {
  const slides = embla.slideNodes();
  const selectedIndex = embla.selectedScrollSnap();
  
  // Очистка старых точек
  dotsContainer.innerHTML = '';
  
  // Добавление новых точек
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('embla__dot');
    
    if (index === selectedIndex) {
      dot.classList.add('is-selected'); // Активная точка
    }

    dot.addEventListener('click', () => {
      embla.scrollTo(index); // Прокрутка к выбранному слайду
    });

    dotsContainer.appendChild(dot);
  });
};

// Инициализация точек
updateDots();

// Обновление точек при изменении слайда
embla.on('select', updateDots);

// Логирование слайдов (опционально)
console.log(embla.slideNodes());
