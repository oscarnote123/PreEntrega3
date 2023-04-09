/*
const historialInscripciones = JSON.parse(sessionStorage.getItem("historialInscripciones")) || [];

function borrarFormulario() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='date']");
  inputs.forEach(input => input.value = "");
  document.querySelector("#duracion").value = "";
}


function mostrarHistorialInscripciones() {
  const lista = document.querySelector("#historial");
  lista.innerHTML = "";

  historialInscripciones.forEach(inscripcion => {
    const item = document.createElement("li");
    item.textContent = `${inscripcion.nombre} ${inscripcion.apellido} - ${inscripcion.instrumento} - ${inscripcion.edad} años - ${inscripcion.fechaInicio}`;
    lista.appendChild(item);
  });

  localStorage.setItem("historialInscripciones", JSON.stringify(historialInscripciones));
}

const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = parseInt(document.querySelector("#edad").value);
  const instrumento = document.querySelector("#instrumento").value;
  const fechaInicio = document.querySelector("#fechaInicio").value;

  if (!instrumento) {
    mensaje.textContent = "Seleccione un instrumento.";
    return;
  }

  if (!fechaInicio) {
    mensaje.textContent = "Seleccione una fecha de inicio.";
    return;
  }

  const resultado = inscribirseEnMusica(nombre, apellido, edad, instrumento, fechaInicio);
  mensaje.textContent = resultado;
});

function calcularPrecioTotal(instrumento, diasReserva) {
  let precio;
  switch (instrumento) {
    case 'saxo':
      precio = 10;
      break;
    case 'piano':
      precio = 15;
      break;
    case 'guitarra':
      precio = 12;
      break;
    case 'clarinete':
      precio = 8;
      break;
    default:
      precio = 0;
      break;
  }
  return precio * diasReserva;
}

function inscribirseEnMusica(nombre, apellido, edad, instrumento, fechaInicio) {
  if (edad < 18) {
    return "Lo sentimos, debes ser mayor de edad para inscribirte.";
  } else {
    const diasReserva = Math.ceil((new Date(fechaInicio) - new Date()) / (1000 * 60 * 60 * 24));
    const precioTotal = calcularPrecioTotal(instrumento, diasReserva);
    const mensaje = `¡Felicidades ${nombre} ${apellido}! Te has inscripto en la escuela de música para tocar el ${instrumento}. El precio total de tu reserva es de ${precioTotal} dólares.`;
    const inscripcion = {
      nombre,
      apellido,
      edad,
      instrumento,
      fechaInicio
    };
    historialInscripciones.push(inscripcion);
    mostrarHistorialInscripciones();
    return mensaje;
  }
  
}

*/


//segundo codigo con promise
const historialInscripciones = JSON.parse(localStorage.getItem("historialInscripciones")) || [];

function borrarFormulario() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='date']");
  inputs.forEach(input => input.value = "");
  document.querySelector("#duracion").value = "";
}

function mostrarHistorialInscripciones() {
  const lista = document.querySelector("#historial");
  lista.innerHTML = "";

  historialInscripciones.forEach(inscripcion => {
    const item = document.createElement("li");
    item.textContent = `${inscripcion.nombre} ${inscripcion.apellido} - ${inscripcion.instrumento} - ${inscripcion.edad} años - ${inscripcion.fechaInicio}`;
    lista.appendChild(item);
  });

  localStorage.setItem("historialInscripciones", JSON.stringify(historialInscripciones));
}

const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = parseInt(document.querySelector("#edad").value);
  const instrumento = document.querySelector("#instrumento").value;
  const fechaInicio = document.querySelector("#fechaInicio").value;

  if (!instrumento) {
    mensaje.textContent = "Seleccione un instrumento.";
    return;
  }

  if (!fechaInicio) {
    mensaje.textContent = "Seleccione una fecha de inicio.";
    return;
  }

  const resultado = await inscribirseEnMusica(nombre, apellido, edad, instrumento, fechaInicio);
  mensaje.textContent = resultado;
});

function calcularPrecioTotal(instrumento, diasReserva) {
  let precio;
  switch (instrumento) {
    case 'saxo':
      precio = 10;
      break;
    case 'piano':
      precio = 15;
      break;
    case 'guitarra':
      precio = 12;
      break;
    case 'clarinete':
      precio = 8;
      break;
    default:
      precio = 0;
      break;
  }
  return precio * diasReserva;
}

async function inscribirseEnMusica(nombre, apellido, edad, instrumento, fechaInicio) {
  if (edad < 18) {
    return "Lo sentimos, debes ser mayor de edad para inscribirte.";
  } else {
    const diasReserva = Math.ceil((new Date(fechaInicio) - new Date()) / (1000 * 60 * 60 * 24));
    const precioTotal = calcularPrecioTotal(instrumento, diasReserva);
    const mensaje = `¡Felicidades ${nombre} ${apellido}! Te has inscrito en la escuela de música para tocar el ${instrumento}. El precio total de tu reserva es de ${precioTotal} dólares.`;
    const inscripcion = {
      nombre,
      apellido,
      edad,
      instrumento,
      fechaInicio
    };
    historialInscripciones.push(inscripcion);
    mostrarHistorialInscripciones();

    await esperaAleatoria(); // Espera aleatoria simulando una operación asíncrona

    return mensaje;
  }    
}

function esperaAleatoria() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, Math.floor(Math.random() * 5000));
  });
}
