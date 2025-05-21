$(document).ready(function () {
  let menuAbierto = false;

  // Mostrar/ocultar menú principal
  $('.menu_bar').click(function (event) {
    event.preventDefault();
    const left = menuAbierto ? '-100%' : '0';
    $('nav').animate({ left });
    menuAbierto = !menuAbierto;
  
    // Ocultar submenús cuando se cierra el menú principal
    if (!menuAbierto) {
      $('.children').slideUp(400);
    }
  });
  
  // Función para detectar si es móvil
  function esMovil() {
    return window.innerWidth <= 963;
  }

  // Evento en los submenús
  $('.submenu > a').click(function (event) {
    event.preventDefault();
  });

  // Submenús en escritorio (hover)
  $('.submenu').hover(
    function () {
      if (!esMovil()) $(this).children('.children').stop(true, true).slideDown(400);
    },
    function () {
      if (!esMovil()) $(this).children('.children').stop(true, true).slideUp(400);
    }
  );

  // Submenús en móvil (click)
  $('.submenu').click(function (e) {
    if (esMovil()) {
      $('.children').not($(this).children('.children')).slideUp(400); // Cierra otros submenús
      $(this).children('.children').slideToggle(400);
      e.stopPropagation();
    }
  });

  // Redirección al hacer clic en un enlace del submenú
  $('.submenu .children li a').click(function (event) {
    event.preventDefault();
    const url = $(this).attr('href');
  
    // Ocultar submenús en escritorio
    $('.children').slideUp(350);
  
    $('nav').animate({ left: '-100%' }, 300, function () {
      window.location.href = url;
    });



    // Recargar la página automáticamente al regresar con el botón "atrás"
    $(window).on("pageshow", function (event) {
      if (event.originalEvent.persisted) {
        location.reload();
      }
    });



  });

  // Desvanecer y pegar elementos al hacer scroll
  const contenedorDesvanecer = $('#contenedorDesvanecer');
  const contenedorPegajoso = $('#contenedorPegajoso');

  $(window).scroll(function () {
    const scrollPosition = $(this).scrollTop();
    contenedorDesvanecer.toggleClass('oculto', scrollPosition > 50);
    contenedorPegajoso.css('marginTop', scrollPosition > 50 ? '-47px' : '0');
  });
});



