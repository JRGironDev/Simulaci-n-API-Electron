document.addEventListener("DOMContentLoaded", function () {
  const consultarClimaBtn = document.getElementById("consultarClima");
  const fechaConsulta = document.getElementById("fecha-consulta");
  const respuesta = document.querySelector(".respuesta");
  const cardLeft = document.querySelector(".div-left");
  const cardCenter = document.querySelector(".div-center");
  const cardRight = document.querySelector(".div-right");
  let fecha = "";

  fechaConsulta.addEventListener("input", obtenerFecha);
  consultarClimaBtn.addEventListener("click", obtenerDatos);

  function obtenerFecha(evento) {
    if (evento.target.value.trim() === "") {
      consultarClimaBtn.classList.add("opacidad");
      consultarClimaBtn.disabled = true;
      return;
    }
    fecha = evento.target.value;
    consultarClimaBtn.classList.remove("opacidad");
    consultarClimaBtn.disabled = false;
  }

  function obtenerDatos() {
    spinner(); // Muestra el Spinner de carga

    setTimeout(() => {
      const url = "data/climas.json";
      fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => mostrarHTML(resultado));
    }, 2500);
  }

  function mostrarHTML(climas) {
    if (validarFechaHoy()) {
      limpiarHTML();
      if (respuesta | cardLeft | cardCenter | cardRight) {
        respuesta.innerHTML = " ";
        cardLeft.innerHTML = " ";
        cardCenter.innerHTML = " ";
        cardRight.innerHTML = " ";

        const numeroRandom = Math.floor(Math.random() * 15) + 1;

        mostrarCardMañana(climas, numeroRandom, cardLeft);
        mostrarCardTarde(climas, numeroRandom, cardCenter);
        mostrarCardNoche(climas, numeroRandom, cardRight);
      } else {
        respuesta.innerHTML = "";
        const divLeft = document.createElement("DIV");
        const divCenter = document.createElement("DIV");
        const divRight = document.createElement("DIV");
        divLeft.classList.add("card", "div-left");
        divCenter.classList.add("card", "div-center");
        divRight.classList.add("card", "div-right");
        respuesta.classList.add("cards");
        respuesta.appendChild(divLeft);
        respuesta.appendChild(divCenter);
        respuesta.appendChild(divRight);

        const cardLeft = document.querySelector(".div-left");
        const cardCenter = document.querySelector(".div-center");
        const cardRight = document.querySelector(".div-right");

        const numeroRandom = Math.floor(Math.random() * 15) + 1;

        mostrarCardMañana(climas, numeroRandom, cardLeft);
        mostrarCardTarde(climas, numeroRandom, cardCenter);
        mostrarCardNoche(climas, numeroRandom, cardRight);
      }
    } else {
      respuesta.classList.remove("cards");
      limpiarHTML();
      respuesta.innerHTML = " ";
      const numeroRandom = Math.floor(Math.random() * 15) + 1;

      let html = ``;
      climas.forEach((clima) => {
        const { id, estadoMañana, temperaturaMañana } = clima;
        if (numeroRandom === id) {
          html += `<div class="cardUnica">
            <p>Fecha: ${fecha}</p>
            <img src="${estadoMañana}" class="imagen" alt="">
            <p class="temp">Temperatura Mañana ${temperaturaMañana}</p>
          </div>`;
          return;
        }
      });
      respuesta.innerHTML = html;
    }
  }

  function limpiarHTML() {
    const card = document.querySelector(".card");
    if (card) {
      card.remove();
    }
  }

  // Tuve muchos problemas con la fecha, a cierta hora ya no me genera la fecha del dia actual
  // genera la del día siguiente, por lo que utilicé getUTCDate
  // (Si no le muestra lo correcto para el día actual, es por eso)

  function validarFechaHoy() {
    const fechaIngresadaUTC = new Date(fecha);
    const fechaHoyUTC = new Date();
    const fechaValidada =
      fechaIngresadaUTC.getUTCDate() == fechaHoyUTC.getDate() &&
      fechaIngresadaUTC.getMonth() == fechaHoyUTC.getMonth() &&
      fechaIngresadaUTC.getFullYear() == fechaHoyUTC.getFullYear();

    return fechaValidada;
  }

  function mostrarCardMañana(climas, numeroRandom, card) {
    let htmlLeft = ``;
    climas.forEach((clima) => {
      const { id, estadoMañana, temperaturaMañana } = clima;
      if (numeroRandom === id) {
        htmlLeft += `<p>Mañana</p>
          <img src="${estadoMañana}" class="imagen" alt="">
          <p class="temp">Temperatura: ${temperaturaMañana}</p>`;
        return;
      }
    });
    card.innerHTML = htmlLeft;
  }

  function mostrarCardTarde(climas, numeroRandom, card) {
    let htmlCenter = ``;
    climas.forEach((clima) => {
      const { id, estadoTarde, temperaturaTarde } = clima;
      if (numeroRandom === id) {
        htmlCenter += `<p>Tarde</p>
          <img src="${estadoTarde}" class="imagen" alt="">
          <p class="temp">Temperatura: ${temperaturaTarde}</p>`;
        return;
      }
    });
    card.innerHTML = htmlCenter;
  }

  function mostrarCardNoche(climas, numeroRandom, card) {
    let htmlRight = ``;
    climas.forEach((clima) => {
      const { id, estadoNoche, temperaturaNoche } = clima;
      if (numeroRandom === id) {
        htmlRight += `<p>Noche</p>
            <img src="${estadoNoche}" class="imagen" alt="">
            <p class="temp">Temperatura: ${temperaturaNoche}</p>`;
        return;
      }
    });
    card.innerHTML = htmlRight;
  }

  function spinner() {
    respuesta.innerHTML = "";
    limpiarHTML();
    const divSpinner = document.createElement("DIV");
    divSpinner.classList.add("sk-cube-grid");

    divSpinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    respuesta.appendChild(divSpinner);
  }
});
