document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar ramos aprobados desde localStorage
  let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

  // Inicializar ramos según estado
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const requisitos = (ramo.dataset.prerqs || "").split(",").filter(Boolean);

    if (aprobados.includes(id)) {
      ramo.classList.add("aprobado");
    } else if (requisitos.length > 0 && !requisitos.every(req => aprobados.includes(req))) {
      ramo.classList.add("bloqueado");
    }

    // Tooltip con requisitos
    if (requisitos.length > 0) {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.innerText = "Requiere: " + requisitos.join(", ");
      ramo.appendChild(tooltip);
    }
  });

  // Manejar clic en ramos
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      const id = ramo.dataset.id;
      const requisitos = (ramo.dataset.prerqs || "").split(",").filter(Boolean);

      if (ramo.classList.contains("bloqueado")) return;

      if (ramo.classList.contains("aprobado")) {
        // Desaprobar
        ramo.classList.remove("aprobado");
        aprobados = aprobados.filter(a => a !== id);
      } else {
        // Aprobar
        ramo.classList.add("aprobado");
        aprobados.push(id);
      }

      // Guardar estado
      localStorage.setItem("aprobados", JSON.stringify(aprobados));

      // Actualizar todos los ramos con requisitos
      actualizarDesbloqueo();
    });
  });

  function actualizarDesbloqueo() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const requisitos = (ramo.dataset.prerqs || "").split(",").filter(Boolean);
      if (!aprobados.includes(id)) {
        if (requisitos.length > 0 && !requisitos.every(req => aprobados.includes(req))) {
