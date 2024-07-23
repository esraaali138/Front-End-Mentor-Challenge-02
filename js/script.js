const form = document.getElementById("myform");
const buttonStep = document.querySelectorAll(".btn");
const inputFields = document.querySelectorAll(".form-step-fields-input");
let count = 0;
let i = 0;
function get() {
  inputFields.forEach((input) => {
    const value = input.value;
    const label = input.previousElementSibling.childNodes[1];
    let errorMessage = label.nextElementSibling;
    if (!errorMessage) {
      errorMessage = document.createElement("span");
      errorMessage.classList.add("form-step-fields-container-error");
      label.insertAdjacentElement("afterend", errorMessage);
    }
    errorMessage.textContent = "";
    if (value === "") {
      errorMessage.textContent = "This field is required";
    } else {
      if (input.id === "email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage.textContent = "Invalid email";
        }
      } else if (input.id === "name") {
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage.textContent = "Only Characters";
        }
      } else if (input.id === "phone") {
        if (!/^\+\d{1,3} \d{3} \d{3} \d{4}$/.test(value)) {
          errorMessage.textContent = "Enter your country code and phone ";
        }
      }
    }
  });
}
buttonStep.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    activeStep();
  });
});
function activeStep() {
  const formStep = document.querySelectorAll(".form-step");
  const active = document.querySelectorAll(".sidebar-content-step-number");

  if (count < active.length) {
    active[count].classList.remove("active");
  }

  if (i < formStep.length) {
    formStep[i].classList.add("hidden");
  }

  count++;
  i++;

  if (i >= formStep.length) {
    i = 0;
  }
  if (count >= active.length) {
    count = 0;
  }

  formStep[i].classList.remove("hidden");
  active[count].classList.add("active");
}
