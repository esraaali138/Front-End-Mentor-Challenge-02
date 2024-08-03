const form = document.getElementById("myform");
const buttonStep = document.querySelectorAll(".btn");
const btnTarget = document.querySelectorAll(".btns");
const inputFields = document.querySelectorAll(".form-step-fields-input");
const checkboxInput = document.querySelector(".switch input");

let count = 0;
let i = 0;
function inputValidation() {
  let hasError = false;

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
    input.style.border = "1px solid hsl(243, 100%, 70%)";

    if (value === "") {
      errorMessage.textContent = "This field is required";
      input.style.border = "1px solid red";
      hasError = true;
    } else {
      if (input.id === "email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage.textContent = "Invalid email";
          input.style.border = "1px solid red";
          hasError = true;
        }
      } else if (input.id === "name") {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage.textContent = "Only Characters";
          input.style.border = "1px solid red";
          hasError = true;
        }
      } else if (input.id === "phone") {
        if (!/^\+\d{1,3} \d{3} \d{3} \d{4}$/.test(value)) {
          errorMessage.textContent = "Enter your country code and phone ";
          input.style.border = "1px solid red";
          hasError = true;
        }
      }
    }
  });
  return hasError; //will return true if haserror = true
}

function addToggleClass(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", () => {
      const parentElement = ele.parentElement;
      parentElement.classList.toggle("toggle");
    });
  });
}

addToggleClass(
  document.querySelectorAll(".form-step-ons-addons input[type='checkbox']")
);

btnTarget.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const formStep = document.querySelectorAll(".form-step");
    const active = document.querySelectorAll(".sidebar-content-step-number");
    const selectPlan = document.querySelectorAll(
      ".form-step-plan-options-option"
    );
    selectPlan.forEach((select) => {
      select.addEventListener("click", () => {
        select.classList.toggle("toggle");
      });
      const time = select.children[1].children[1].children[0];      
      checkboxInput.addEventListener("change", () => {
        if (checkboxInput.checked) {
          time.textContent = "yr";
          time.insertAdjacentHTML("afterend", `<p>2 months free</p>`);
          time.nextElementSibling.classList.add("discount");
          select.style.height = "160px"

        } else {
          time.textContent = "mo";
          time.nextElementSibling.remove();
          select.style.height = "130px" // هنا
        }
      });
    });

    if (e.target.classList.contains("next")) {
      if (i < formStep.length) {
        // if (inputValidation()) {
        //   //function reurn true
        //   return;
        // }
        formStep[i].classList.add("hidden");
      }

      if (count < active.length) {
        active[count].classList.remove("active");
      }
      count++;
      i++;
      formStep[i].classList.remove("hidden");
      active[count].classList.add("active");

      if (i > formStep.length) {
        i = 0;
      }
      if (count >= active.length) {
        count = 0;
      }
      // if (btn.classList.contains("back")) {
      //   btn.disabled = true;
      // }
    }
  });
});
