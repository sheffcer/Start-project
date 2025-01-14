$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
      items: 13, // Количество видимых слайдов
      loop: true, // Зацикливать карусель
      margin: 10, // Отступы между слайдами
      autoplay: true, // Автопрокрутка
      autoplayTimeout: 2000, // Время до следующего слайда (в миллисекундах)
      autoplayHoverPause: true, // Пауза автопрокрутки при наведении на слайд
      nav: true,
      navText: ['<', '>'], // Стандартный текст для стрелок (можно заменить на что угодно)
      navContainer: '.custom-nav', // Указываем кастомный контейнер для навигации
      responsive : {
              0 : {
                items: 4,
                // nav: true,
                loop: true,
                center: true,
              },
              480 : {
                items: 4,
              },
              768 : {
                items: 7,
              },
              992 : {
                items: 10,
              },
              1200 : {
                items: 13,
              },
              1400 : {
                items: 13,
              }
            } 
    });
  });

// $(document).ready(function(){

//   $("#owl-carousel-demo").owlCarousel({
//     items: 3,
//     nav: true,
//     loop: true,
//     center: true,
//     responsive : {
//       0 : {
//         items: 1,
//         nav: true,
//         loop: true,
//         center: true,
//       },
//       480 : {
//         items: 3,
//       },
//       768 : {
//         items: 3,
//       },
//       992 : {
//         items: 3,
//       },
//       1200 : {
//         items: 3,
//       },
//       1800 : {
//         items: 3,
//       }
//     }
//   });

// });
