const botonesFiltro = document.querySelectorAll('.categorias button');
const tarjetas = document.querySelectorAll('.galeria .tarjeta');

// Recorremos cada botón para agregarle un evento de clic
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitamos la clase 'seleccionado' de todos los botones y la ponemos en el presionado
        botonesFiltro.forEach(b => b.classList.remove('seleccionado'));
        boton.classList.add('seleccionado');

        // Obtenemos la categoría que se desea filtrar
        const filtro = boton.getAttribute('data-filtro');

        // Mostramos u ocultamos las tarjetas según la categoría
        tarjetas.forEach(tarjeta => {
            const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

            if (filtro === 'todos' || categoriaTarjeta === filtro) {
                tarjeta.style.display = 'block'; // Muestra la tarjeta
            } else {
                tarjeta.style.display = 'none';  // Oculta la tarjeta
            }
        });
    });
});