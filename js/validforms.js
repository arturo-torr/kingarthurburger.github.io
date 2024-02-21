// Primer formulario
let form = document.forms.kabform;
// Segundo formulario
let secondForm = document.forms.kabform2;
// Barra de progreso
let progressBar = document.getElementById("progress-bar");
progressBar.style.width = "0%";
// Modal
let modal = new bootstrap.Modal(document.getElementById("confirmModal"));
// Sección para mostrar dentro el resumen
let section = document.querySelector(".form__section");

// Validación del primer formulario
form.addEventListener("submit", function (event) {
  let isValid = true;

  this.phone.value = this.phone.value.trim();
  if (!this.phone.checkValidity()) {
    isValid = false;
    showFeedBack(this.phone, false);
  } else {
    showFeedBack(this.phone, true);
  }

  this.name.value = this.name.value.trim();
  if (!this.name.checkValidity()) {
    isValid = false;
    showFeedBack(this.name, false);
  } else {
    showFeedBack(this.name, true);
  }

  this.surname.value = this.surname.value.trim();
  if (!this.surname.checkValidity()) {
    isValid = false;
    showFeedBack(this.surname, false);
  } else {
    showFeedBack(this.surname, true);
  }

  this.mail.value = this.mail.value.trim();
  if (!this.mail.checkValidity()) {
    isValid = false;
    showFeedBack(this.mail, false);
  } else {
    showFeedBack(this.mail, true);
  }

  let fechaActual = new Date().toISOString().split("T")[0];
  if (this.date.value < fechaActual) {
    isValid = false;
    showFeedBack(this.date, false);
  } else {
    showFeedBack(this.date, true);
  }

  if (!this.time.checkValidity()) {
    isValid = false;
    showFeedBack(this.time, false);
  } else {
    showFeedBack(this.time, true);
  }

  if (!isValid) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    changeForms();
    updateProgressBar(65);
    document.getElementById("textInfo").classList.remove("d-none");
  }
});

// Validación del segundo formulario
secondForm.addEventListener("submit", function (event) {
  let isValid = true;

  this.titular.value = this.titular.value.trim();
  if (!this.titular.checkValidity()) {
    isValid = false;
    showFeedBack(this.titular, false);
  } else {
    showFeedBack(this.titular, true);
  }

  this.creditCard.value = this.creditCard.value.trim();
  if (!this.creditCard.checkValidity()) {
    isValid = false;
    showFeedBack(this.creditCard, false);
  } else {
    showFeedBack(this.creditCard, true);
  }

  this.cardDate.value = this.cardDate.value.trim();
  if (!this.cardDate.checkValidity()) {
    isValid = false;
    showFeedBack(this.cardDate, false);
  } else {
    showFeedBack(this.cardDate, true);
  }

  this.cvc.value = this.cvc.value.trim();
  if (!this.cvc.checkValidity()) {
    isValid = false;
    showFeedBack(this.cvc, false);
  } else {
    showFeedBack(this.cvc, true);
  }

  if (!isValid) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    updateProgressBar(95);
    modal.show();
  }
});

// Muestra los contenedores de feedback
function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

// Pasa al segundo formulario
function changeForms() {
  secondForm.classList.remove("d-none");
  form.classList.add("d-none");
}

// Actualiza la barra de progreso con el valor que se le introduzca
function updateProgressBar(value) {
  progressBar.style.width = value + "%";
  progressBar.setAttribute("aria-valuenow", value);
}

// Manejador para el modal, oculta el segundo formulario, oculta el <h> con información y añade una nueva cabecera
// También actualiza la barra de progreso y muestra el resumen
document
  .getElementById("confirmModalButton")
  .addEventListener("click", function () {
    modal.hide();
    secondForm.classList.add("d-none");
    document.getElementById("textInfo").classList.add("d-none");
    document.getElementById("firstTitle").classList.add("d-none");
    document.getElementById("secondTitle").classList.remove("d-none");
    updateProgressBar(100);
    showResume();
  });

// Muestra el resumen utilizando la clase card de bootstrap
function showResume() {
  // Crea el contenedor y le añade las clases
  const container = document.createElement("div");
  container.classList.add("container", "my-5");
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="row">
      <div class="col-12">
        <div class="card bg__grey border--green">
          <div class="row align-items-center">
            <div class="col-xl-12 text-center">
              <div class="p-4">
                <div class="mt-4 mb-3">
                  <h2 class="text-uppercase text--green fw-bold fst-italic">
                    Resumen de la reserva:
                  </h2>
                </div>
                <div class="mt-4 mb-3">
                  <h6 class="text-uppercase text--green fw-bold">
                    Nombre y apellidos
                  </h6>
                  <p class="text--green">
                    ${form.name.value} ${form.surname.value}
                  </p>
                </div>
                <div class="mt-4 mb-3">
                  <h6 class="text-uppercase text--green fw-bold">
                    Teléfono de contacto
                  </h6>
                  <p class="text--green">${form.phone.value}</p>
                </div>
                <div class="mt-4 mb-3">
                  <h6 class="text-uppercase text--green fw-bold">
                    Correo electrónico
                  </h6>
                  <p class="text--green">${form.mail.value}</p>
                </div>
                <div class="mt-4 mb-3">
                <h6 class="text-uppercase text--green fw-bold">
                  Día y hora
                </h6>
                <p class="text--green">${form.date.value} ${form.time.value}</p>
              </div>
              <div class="mt-4 mb-3">
                <h6 class="text-uppercase text--green fw-bold">
                 Observaciones
                </h6>
                <p class="text--green">${form.comments.value}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  );
  // Añade el contenedor en la sección
  section.append(container);
}
