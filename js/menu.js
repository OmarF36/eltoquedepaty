$(document).ready(function () {
  let contador = 1;

  // Mostrar/ocultar menú
  $('.menu_bar').click(function (event) {
    event.preventDefault();

    const nav = $('nav');
    const isMenuVisible = nav.css('left') === '0px';

    if (isMenuVisible) {
      nav.animate({ left: '-100%' });
    } else {
      nav.animate({ left: '0' });
    }
  });

// Cierra el menú si se hace clic fuera de él
$(document).click(function (event) {
  const $target = $(event.target);
  const nav = $('nav');
  const isMenuVisible = nav.css('left') === '0px';

  if (
    isMenuVisible &&
    !$target.closest('nav').length &&
    !$target.closest('.menu_bar').length
  ) {
    nav.animate({ left: '-100%' });
    $('.children').slideUp(600); // también cerramos submenús si están abiertos
  }
});


  // Verifica si la pantalla es móvil
  function esMovil() {
    return window.innerWidth <= 983;
  }

  // Maneja la interacción con los submenús en dispositivos móviles y de escritorio
  $('.submenu > a').click(function (event) {
    event.preventDefault();
  });

  $('.submenu').hover(
    function () {
      if (!esMovil()) $(this).children('.children').stop(true, true).slideDown(600);
    },
    function () {
      if (!esMovil()) $(this).children('.children').stop(true, true).slideUp(600);
    }
  );

  $('.submenu').click(function (e) {
    if (esMovil()) {
      $('.children').not($(this).children('.children')).slideUp(600);
      $(this).children('.children').slideToggle(600);
      e.stopPropagation();
      
    }
  });
  
  // Redirige al hacer clic en un enlace del submenú
  $('.submenu .children li a').click(function (event) {
    
    event.preventDefault();
    const url = $(this).attr('href');
    $('nav').animate({ left: '-100%' }, 300, function () {
      window.location.href = url;
    });
  });
// Retraer el menú al hacer clic en cualquier enlace del menú (excepto los que abren submenús)
$('nav ul li a').click(function (event) {
  const isSubmenuToggle = $(this).parent().hasClass('submenu');
  const isMobile = esMovil();

  if (!isSubmenuToggle || !isMobile) {
    const url = $(this).attr('href');
    $('nav').animate({ left: '-100%' }, 300, function () {
      if (url && url !== '#') {
        window.location.href = url;
      }
    });
    event.preventDefault();
  }
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

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    $('nav').css('left', '-100%');
    $('.children').slideUp(0);
    contador = 1; // Reestablece el contador para que el menú funcione con un solo clic
  }
});