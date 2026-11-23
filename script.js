// 1. Seleccionar los botones y las tarjetas
const botones = document.querySelectorAll(".categorias button");
const tarjetas = document.querySelectorAll(".galeria .tarjeta");

// 2. Recorrer cada botón para detectar el clic
botones.forEach(function(boton) {
  boton.addEventListener("click", function() {
    
    // Obtener el valor del filtro usando data-filtro
    const filtro = boton.dataset.filtro;

    // 3. Decidir qué tarjetas mostrar u ocultar usando if / else y el operador ||
    tarjetas.forEach(function(tarjeta) {
      if (filtro === "todos" || tarjeta.dataset.categoria === filtro) {
        tarjeta.style.display = ""; // Muestra la tarjeta
      } else {
        tarjeta.style.display = "none"; // Oculta la tarjeta
      }
    });

    // 4. Actualizar la clase "seleccionado" en los botones
    botones.forEach(function(b) {
      b.classList.remove("seleccionado");
    });
    boton.classList.add("seleccionado");
  });
});