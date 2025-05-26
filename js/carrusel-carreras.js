document.addEventListener("DOMContentLoaded", function () {
    var flkty = new Flickity('.carrusel_carreras', {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: 3000,
      pauseAutoPlayOnHover: false,
      prevNextButtons: true,
      selectedAttraction: 0.01,
      friction: 0.2
    });

    flkty.on('select', function () {
      flkty.playPlayer(); // Reinicia el autoplay después de interacción
    });

    // Asegura que botones funcionen correctamente
    setTimeout(function () {
      var prevButton = document.querySelector('.flickity-prev-next-button.previous');
      var nextButton = document.querySelector('.flickity-prev-next-button.next');

      [prevButton, nextButton].forEach(function (button) {
        if (button) {
          button.addEventListener('click', function () {
            flkty.playPlayer();
          });
        }
      });
    }, 500); // Espera medio segundo por si Flickity tarda en renderizar botones
  });