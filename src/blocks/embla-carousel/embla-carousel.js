import EmblaCarousel from 'embla-carousel';
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons';
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton';

// Инициализация для первого слайдера
const rootNodeFirst = document.querySelector('.embla--first');
if (!rootNodeFirst) {
  console.error('Root node for first slider is not found');
}else {
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
}

// Инициализация для второго слайдера (без кнопок)
const rootNodeSecond = document.querySelector('.embla--second');
if (rootNodeSecond) {  
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
} else {console.error('Root node for second slider is not found');}



// Third group slider
const OPTIONS_THIRD = { align: 'start', slidesToScroll: 2, slide: 2 }
// const OPTIONS_THIRD = { align: 'start', slidesToScroll: 1 }

const emblaNodeThird = document.querySelector('.embla--third')
if (emblaNodeThird) {
console.log('Root Node for Third Slider is: ', emblaNodeThird);
const viewportNodeThird = emblaNodeThird.querySelector('.embla__viewport')
const prevBtnNodeThird = emblaNodeThird.querySelector('.embla__button--prev')
const nextBtnNodeThird = emblaNodeThird.querySelector('.embla__button--next')
const dotsNodeThird = emblaNodeThird.querySelector('.embla__dots')

const emblaApiThird = EmblaCarousel(viewportNodeThird, OPTIONS_THIRD)

const removePrevNextBtnsClickHandlersThird = addPrevNextBtnsClickHandlers(
  emblaApiThird,
  prevBtnNodeThird,
  nextBtnNodeThird
)
const removeDotBtnsAndClickHandlersThird = addDotBtnsAndClickHandlers(
  emblaApiThird,
  dotsNodeThird
)

emblaApiThird.on('destroy', removePrevNextBtnsClickHandlersThird)
emblaApiThird.on('destroy', removeDotBtnsAndClickHandlersThird)
} else {console.error('Root node for third slider is not found');}


// Fourth group slider
const OPTIONS_FOURTH = { align: 'start', slidesToScroll: 2, slide: 4 }
// const OPTIONS_FOURTH = { align: 'start', slidesToScroll: 1 }

const emblaNodeFourth = document.querySelector('.embla--fourth')
if (emblaNodeFourth) {
console.log('Root Node for Fourth Slider is: ', emblaNodeFourth);
const viewportNodeFourth = emblaNodeFourth.querySelector('.embla__viewport')
const prevBtnNodeFourth = emblaNodeFourth.querySelector('.embla__button--prev')
const nextBtnNodeFourth = emblaNodeFourth.querySelector('.embla__button--next')
const dotsNodeFourth = emblaNodeFourth.querySelector('.embla__dots')

const emblaApiFourth = EmblaCarousel(viewportNodeFourth, OPTIONS_FOURTH)

const removePrevNextBtnsClickHandlersFourth = addPrevNextBtnsClickHandlers(
  emblaApiFourth,
  prevBtnNodeFourth,
  nextBtnNodeFourth
)
const removeDotBtnsAndClickHandlersFourth = addDotBtnsAndClickHandlers(
  emblaApiFourth,
  dotsNodeFourth
)

emblaApiFourth.on('destroy', removePrevNextBtnsClickHandlersFourth)
emblaApiFourth.on('destroy', removeDotBtnsAndClickHandlersFourth)
} else {console.error('Root node for fourth slider is not found');}



// Five group slider

const OPTIONS_FIVE = { align: 'start', slidesToScroll: 2, slide: 2 }
// const OPTIONS_FIVE = { align: 'start', slidesToScroll: 1 }

const emblaNodeFive = document.querySelector('.embla--five')
if (emblaNodeFive) {
console.log('Root Node for Five Slider is: ', emblaNodeFive);
const viewportNodeFive = emblaNodeFive.querySelector('.embla__viewport')
const prevBtnNodeFive = emblaNodeFive.querySelector('.embla__button--prev')
const nextBtnNodeFive = emblaNodeFive.querySelector('.embla__button--next')
const dotsNodeFive = emblaNodeFive.querySelector('.embla__dots')

const emblaApiFive = EmblaCarousel(viewportNodeFive, OPTIONS_FIVE)

const removePrevNextBtnsClickHandlersFive = addPrevNextBtnsClickHandlers(
  emblaApiFive,
  prevBtnNodeFive,
  nextBtnNodeFive
)
const removeDotBtnsAndClickHandlersFive = addDotBtnsAndClickHandlers(
  emblaApiFive,
  dotsNodeFive
)

emblaApiFive.on('destroy', removePrevNextBtnsClickHandlersFive)
emblaApiFive.on('destroy', removeDotBtnsAndClickHandlersFive)
} else {console.error('Root node for five slider is not found');}

// Sixth group slider

// const OPTIONS_SIXTH = { align: 'start', slidesToScroll: 2, slide: 2 }
// // const OPTIONS_SIXTH = { align: 'start', slidesToScroll: 1 }

// const emblaNodeSixth = document.querySelector('.embla--sixth')
// console.log('Root Node for Sixth Slider is: ', emblaNodeSixth);
// const viewportNodeSixth = emblaNodeSixth.querySelector('.embla__viewport')
// const prevBtnNodeSixth = emblaNodeSixth.querySelector('.embla__button--prev')
// const nextBtnNodeSixth = emblaNodeSixth.querySelector('.embla__button--next')
// const dotsNodeSixth = emblaNodeSixth.querySelector('.embla__dots')

// const emblaApiSixth = EmblaCarousel(viewportNodeSixth, OPTIONS_SIXTH)

// const removePrevNextBtnsClickHandlersSixth = addPrevNextBtnsClickHandlers(
//   emblaApiSixth,
//   prevBtnNodeSixth,
//   nextBtnNodeSixth
// )
// const removeDotBtnsAndClickHandlersSixth = addDotBtnsAndClickHandlers(
//   emblaApiSixth,
//   dotsNodeSixth
// )

// emblaApiSixth.on('destroy', removePrevNextBtnsClickHandlersSixth)
// emblaApiSixth.on('destroy', removeDotBtnsAndClickHandlersSixth)



// Zero group slider

const OPTIONS_ZERO = { align: 'start', slidesToScroll: 1, slide: 1 }
// const OPTIONS_ZERO = { align: 'start', slidesToScroll: 1 }

const emblaNodeZero = document.querySelector('.embla--zero')
if (emblaNodeZero) {
console.log('Root Node for Zero Slider is: ', emblaNodeZero);
const viewportNodeZero = emblaNodeZero.querySelector('.embla__viewport')
const prevBtnNodeZero = emblaNodeZero.querySelector('.embla__button--prev')
const nextBtnNodeZero = emblaNodeZero.querySelector('.embla__button--next')
// const dotsNodeZero = emblaNodeZero.querySelector('.embla__dots')

const emblaApiZero = EmblaCarousel(viewportNodeZero, OPTIONS_ZERO)

const removePrevNextBtnsClickHandlersZero = addPrevNextBtnsClickHandlers(
  emblaApiZero,
  prevBtnNodeZero,
  nextBtnNodeZero
)
// const removeDotBtnsAndClickHandlersZero = addDotBtnsAndClickHandlers(
//   emblaApiZero,
//   dotsNodeZero
// )

emblaApiZero.on('destroy', removePrevNextBtnsClickHandlersZero)
// emblaApiZero.on('destroy', removeDotBtnsAndClickHandlersZero)
} else {console.error('Root node for zero slider is not found');}



// Embla--product-slider


// Embla--product-slider

// const emblaNodeProduct = document.querySelector('.embla--product');
// if (emblaNodeProduct) {
//   console.log('Root Node for Product Slider is: ', emblaNodeProduct);
  
//   const viewportNodeProduct = emblaNodeProduct.querySelector('.embla__viewport');
//   const thumbnails = document.querySelectorAll('.embla-thumbnail');

//   const emblaApiProduct = EmblaCarousel(viewportNodeProduct, {
//     loop: true,  // Зацикливаем карусель
//     autoplay: false,  // Отключаем автопрокрутку для теста
//     speed: 5,  // Скорость анимации
//   });

//   // Проверка на миниатюры
//   if (thumbnails.length === 0) {
//     console.error('Не найдены элементы миниатюр');
//   } else {
//     // Обработчик клика по миниатюре
//     thumbnails.forEach((thumbnail, index) => {
//       thumbnail.addEventListener('click', () => {
//         console.log(`Миниатюра нажата: ${index}`);
//         emblaApiProduct.scrollTo(index);  // Переход к слайду при клике на миниатюру
//         updateThumbnailActiveClass(index);  // Обновление активного состояния миниатюры
//       });
//     });

//     // Функция для обновления активного состояния миниатюр
//     function updateThumbnailActiveClass(index) {
//       thumbnails.forEach((thumb, i) => {
//         if (i === index) {
//           thumb.classList.add('active');  // Добавляем класс для активной миниатюры
//         } else {
//           thumb.classList.remove('active');  // Убираем класс с неактивных миниатюр
//         }
//       });
//     }

//     // Синхронизация слайдера с миниатюрами
//     emblaApiProduct.on('select', () => {
//       const selectedIndex = emblaApiProduct.selectedScrollSnap();
//       console.log(`Слайд переключен на индекс: ${selectedIndex}`);
//       updateThumbnailActiveClass(selectedIndex);  // Обновляем миниатюры, когда слайдер двигается
//     });

//     // Изначальная установка активной миниатюры
//     updateThumbnailActiveClass(0);
//   }
// } else {
//   console.error("Root node for product slider is not found");
// }



// // Embla--product-slider

// document.addEventListener('DOMContentLoaded', function() {
//   const emblaNodeProduct = document.querySelector('.embla--product');
  
//   if (emblaNodeProduct) {
//     console.log('Root Node for Product Slider is: ', emblaNodeProduct);
    
//     const viewportNodeProduct = emblaNodeProduct.querySelector('.embla__viewport');
//     const thumbnails = document.querySelectorAll('.embla-thumbnail');
//     const prevBtnNode = document.querySelector('.product__photo-inner .embla__button--prev');
//     const nextBtnNode = document.querySelector('.product__photo-inner .embla__button--next');
    
//     // Проверка наличия кнопок prev и next
//     if (!prevBtnNode || !nextBtnNode) {
//       console.error('Не найдены кнопки prev или next');
//       return; // Если кнопки не найдены, прекращаем выполнение
//     }
    
//     const emblaApiProduct = EmblaCarousel(viewportNodeProduct, {
//       loop: true,
//       autoplay: false,
//       speed: 5
//     });

//     // Функция для обновления активного состояния миниатюр
//     const updateThumbnailActiveClass = (index) => {
//       thumbnails.forEach((thumb, i) => {
//         if (i === index) {
//           thumb.classList.add('active');
//         } else {
//           thumb.classList.remove('active');
//         }
//       });
//     };

//     // Обработчик клика по миниатюре
//     thumbnails.forEach((thumbnail, index) => {
//       thumbnail.addEventListener('click', () => {
//         emblaApiProduct.scrollTo(index);
//         updateThumbnailActiveClass(index);
//       });
//     });

//     emblaApiProduct.on('select', () => {
//       const selectedIndex = emblaApiProduct.selectedScrollSnap();
//       updateThumbnailActiveClass(selectedIndex);
//     });

//     updateThumbnailActiveClass(0);

//     // Обработчики для кнопок prev и next
//     prevBtnNode.addEventListener('click', () => {
//       emblaApiProduct.scrollPrev();
//     });

//     nextBtnNode.addEventListener('click', () => {
//       emblaApiProduct.scrollNext();
//     });

//   } else {
//     console.error('Root node for product slider is not found');
//   }
// });


// Embla--product-slider

document.addEventListener('DOMContentLoaded', function() {
  const emblaNodeProduct = document.querySelector('.embla--product');
  
  if (emblaNodeProduct) {
      const viewportNodeProduct = emblaNodeProduct.querySelector('.embla__viewport');
      const sliderControls = document.querySelector('.product__photo-inner .embla__controls');
      const prevBtnNode = sliderControls.querySelector('.embla__button--prev');
      const nextBtnNode = sliderControls.querySelector('.embla__button--next');
      const thumbnailsContainer = document.querySelector('.embla-thumbnails');
      const thumbnails = document.querySelectorAll('.embla-thumbnail');

      // Инициализация Embla
      const emblaApiProduct = EmblaCarousel(viewportNodeProduct, {
          loop: true,
          autoplay: false,
          speed: 5,
      });

      // Проверяем на наличие миниатюр
      if (thumbnails.length === 0) {
          console.error('Не найдены элементы миниатюр');
      } else {
          const updateThumbnailActiveClass = (index) => {
              thumbnails.forEach((thumb, i) => {
                  if (i === index) {
                      thumb.classList.add('active');
                  } else {
                      thumb.classList.remove('active');
                  }
              });
          };

          // Обработчик клика по миниатюре
          thumbnails.forEach((thumbnail, index) => {
              thumbnail.addEventListener('click', () => {
                  emblaApiProduct.scrollTo(index);
                  updateThumbnailActiveClass(index);
              });
          });

          // Синхронизация слайдера с миниатюрами
          emblaApiProduct.on('select', () => {
              const selectedIndex = emblaApiProduct.selectedScrollSnap();
              updateThumbnailActiveClass(selectedIndex);

              // Прокручиваем контейнер миниатюр
              const thumbnailWidth = thumbnails[0].offsetWidth + 10; // Учитываем gap между миниатюрами
              thumbnailsContainer.scrollTo({
                  left: selectedIndex * thumbnailWidth,
                  behavior: 'smooth',
              });
          });

          // Изначальная установка активной миниатюры на первый слайд
          updateThumbnailActiveClass(0);
          const initialScrollPosition = 0; // Начальная позиция скроллинга миниатюр
          thumbnailsContainer.scrollTo({
              left: initialScrollPosition,
              behavior: 'smooth',
          });

          // Блокировка кнопки prev, если мы на первом слайде
          const blockPrevButtonIfNeeded = () => {
              const currentIndex = emblaApiProduct.selectedScrollSnap();
              const totalSlides = emblaApiProduct.slideNodes().length;

              if (currentIndex === 0) {
                  prevBtnNode.setAttribute('disabled', 'true');
              } else {
                  prevBtnNode.removeAttribute('disabled');
              }

              if (currentIndex === totalSlides - 1) {
                  nextBtnNode.setAttribute('disabled', 'true');
              } else {
                  nextBtnNode.removeAttribute('disabled');
              }
          };

          // Блокировка кнопки prev и next при инициализации
          blockPrevButtonIfNeeded();

          // Прокрутка миниатюр на одну ширину при клике на prev/next
          const thumbnailWidth = thumbnails[0].offsetWidth + 10; // Учитываем gap между миниатюрами

          prevBtnNode.addEventListener('click', function() {
              const currentIndex = emblaApiProduct.selectedScrollSnap();
              emblaApiProduct.scrollPrev(); // Переключаем слайд
              updateThumbnailActiveClass(currentIndex === 0 ? 0 : currentIndex - 1); // Обновляем активную миниатюру
              blockPrevButtonIfNeeded(); // Проверяем, нужно ли блокировать prev
          });

          nextBtnNode.addEventListener('click', function() {
              const currentIndex = emblaApiProduct.selectedScrollSnap();
              emblaApiProduct.scrollNext(); // Переключаем слайд
              updateThumbnailActiveClass(currentIndex === thumbnails.length - 1 ? currentIndex : currentIndex + 1); // Обновляем активную миниатюру
              blockPrevButtonIfNeeded(); // Проверяем, нужно ли блокировать prev
          });

          // Отслеживаем события перемещения, чтобы избежать лишних анимаций
          emblaApiProduct.on('select', function() {
              blockPrevButtonIfNeeded(); // Проверяем, нужно ли блокировать prev
          });
      }
  } else {
      console.error('Root node for product slider is not found');
  }
});
