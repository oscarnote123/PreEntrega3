// Declaración de una constante "historialInscripciones" que obtiene su valor del local storage
const historialInscripciones = JSON.parse(localStorage.getItem("historialInscripciones")) || [];

// Función que borra los campos del formulario
function borrarFormulario() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='date']");
  inputs.forEach(input => input.value = "");
  document.querySelector("#duracion").value = "";
}

// Función que muestra el historial de inscripciones en la página y actualiza en el local storage
function mostrarHistorialInscripciones() {
  const lista = document.querySelector("#historial");
  lista.innerHTML = "";

  historialInscripciones.forEach(inscripcion => {
    const item = document.createElement("li");
    item.textContent = `${inscripcion.nombre} ${inscripcion.apellido} - ${inscripcion.instrumento} - 

${inscripcion.edad} años - ${inscripcion.fechaInicio}`;
    lista.appendChild(item);
  });

  localStorage.setItem("historialInscripciones", JSON.stringify(historialInscripciones));
}
// declaro constante mensaje
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

// Función que calcula el precio total en función del instrumento y los días de reserva
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
   //Función que se encarga de inscribir al usuario en la escuela de música 
  function inscribirseEnMusica(nombre, apellido, edad, instrumento, fechaInicio) {
    if (edad < 18) {
    return "Lo sentimos, debes ser mayor de edad para inscribirte.";
  } else {
    // Validar que el nombre y apellido no tenga números, uso una expresion regular de JS, funciona en local
//no poseo los conocimientos para arreglarlo. igual lo puse como practica. aclaro.
    const regex = /\d/;
    if (regex.test(nombre)) {
      return "El nombre no puede contener números.";
    }
        
    if (regex.test(apellido)) {
      return "El apellido no puede contener números.";
    }
    const diasReserva = Math.ceil((new Date(fechaInicio) - new Date()) / (1000 * 60 * 60 * 24));
    const precioTotal = calcularPrecioTotal(instrumento, diasReserva);
    const mensaje = `¡Felicidades ${nombre} ${apellido}! Te has inscripto en la escuela de música para tocar el 

${instrumento}. El precio total de tu reserva es de ${precioTotal} dólares.`;
    const inscripcion = {
      nombre,
      apellido,
      edad,
      instrumento,
      fechaInicio
    };
    historialInscripciones.push(inscripcion);
    mostrarHistorialInscripciones();// Actualiza el historial en la página
    return mensaje;
  }
  //borrar campos
}
function borrarCampos() {
  document.querySelector("#formulario").reset();
  document.querySelector("#mensaje").textContent = "";
}
