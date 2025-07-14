document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Cargar ramos aprobados desde localStorage
  let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

  function actualizarEstado() {
    ramos.forEach(ramo => {
      const id = ramo.dataset.id;
      const prerqs = ramo.dataset.prerqs ? ramo.dataset.prerqs.split(',') : [];

      if (aprobados.includes(id)) {
        ramo.classList.add('aprobado');
        ramo.classList.remove('bloqueado');
      } else if (prerqs.length > 0 && !prerqs.every(p => aprobados.includes(p))) {
        ramo.classList.add('bloqueado');
        ramo.classList.remove('aprobado');
      } else {
        ramo.classList.remove('bloqueado', 'aprobado');
      }
    });
  }

  // Evento de clic para aprobar/desaprobar ramos
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      const id = ramo.dataset.id;
      const prerqs = ramo.dataset.prerqs ? ramo.dataset.prerqs.split(',') : [];

      // No se puede aprobar si los prerrequisitos no están cumplidos
      if (prerqs.length > 0 && !prerqs.every(p => aprobados.includes(p))) {
        alert('Debes aprobar primero los ramos requeridos.');
        return;
      }

      if (aprobados.includes(id)) {
        aprobados = aprobados.filter(r => r !== id);
      } else {
        aprobados.push(id);
      }

      // Guardar en localStorage
      localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
      actualizarEstado();
    });
  });

  // Inicializar
  actualizarEstado();
});
