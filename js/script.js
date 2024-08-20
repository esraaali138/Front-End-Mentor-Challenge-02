const form = document.getElementById("myform");
const buttonStep = document.querySelectorAll(".btn");
const btnTarget = document.querySelectorAll(".btns");
const inputFields = document.querySelectorAll(".form-step-fields-input");

let count = 0;
let i = 0;

function updateAddOns() {
  const addonsInfoElements = document.querySelectorAll(
    ".form-step-checkout-info-two, .form-step-checkout-info-three"
  );

  const checkboxinputs = document.querySelectorAll(
    ".form-step-ons-addons input[type='checkbox']"
  );

  checkboxinputs.forEach((input, index) => {
    const addonName = input.nextElementSibling.querySelector(".form-step-ons-addons-info-one");
    const addonPrice = input.nextElementSibling.nextElementSibling.querySelector(".time").textContent; // here ////
    if(addonName) {
      var addonNameContent = addonName.textContent;
    }

    if (input.checked && addonsInfoElements[index]) {
      addonsInfoElements[index].querySelector("span").textContent = addonNameContent;
    }
  });
}

function addToggleClass(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", () => {
      const parentElement = ele.parentElement;
      parentElement.classList.toggle("toggle");
      updateAddOns();
    });

  });
}

addToggleClass(
  document.querySelectorAll(".form-step-ons-addons input[type='checkbox']")
);

function change(element) {
  let time = element.nextElementSibling.children[1];
  time.innerHTML = `+$<span class="total">${10 + 12}</span>/yr`;
}
change(document.querySelector(".form-step-checkout-info"));

function selectValidation(selector) {
  let isSelected = false;

  selector.forEach((select) => {
    if (select.classList.contains("toggle")) {
      isSelected = true;
    }
  });
  return isSelected;
}

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

function selectPlan(e) {
  const selectPlan = document.querySelectorAll(
    ".form-step-plan-options-option"
  );

  const checkboxInput = document.querySelector(".switch input");

  selectPlan.forEach((select) => {
    const time = select.children[1].children[1];
    checkboxInput.addEventListener("change", () => {
      const price = parseInt(
        select.children[1].children[1].children[0].textContent
      );
      if (checkboxInput.checked) {
        time.innerHTML = `$<span>${price * 10}</span>/yr`;
        time.insertAdjacentHTML("afterend", `<p>2 months free</p>`);
        time.nextElementSibling.classList.add("discount");
        select.style.height = "160px";
        document.querySelector(".long").textContent = " (Yearly)";
        document.querySelector(".month").textContent = "Total (per year)";
        change(document.querySelector(".form-step-checkout-info"));

        // second chosen

        const stepAddonsTime = document.querySelectorAll(".time");

        stepAddonsTime.forEach((step) => {
          console.log(step);

          const parentElement = step.parentElement;
          parentElement.innerHTML = `+$<span class="time">${(step.textContent =
            parseInt(step.textContent) * 10)}</span>/yr`;
        });
      } else {
        time.innerHTML = `$<span>${price / 10}</span>/mo`;
        time.nextElementSibling.remove();
        select.style.height = "130px";
      }
    });
    select.addEventListener("click", () => {
      select.classList.toggle("toggle");
      const planName = select.children[1].children[0].textContent;
      const planPrice = select.children[1].children[1].textContent;
      document.querySelector(
        ".form-step-checkout-info-one"
      ).children[0].children[0].innerHTML = `${planName}<span class="long"> ${
        document.querySelector(".long").textContent
      }</span>`;
      document.querySelector(
        ".form-step-checkout-info-one"
      ).children[0].nextElementSibling.innerHTML = `${planPrice}<span class="planPrice">${
        document.querySelector(".planPrice").textContent
      }</span>`;
    });
  });
}
selectPlan();

btnTarget.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const formStep = document.querySelectorAll(".form-step");
    const active = document.querySelectorAll(".sidebar-content-step-number");
    if (e.target.classList.contains("next")) {
      if (
        i === 1 &&
        !selectValidation(
          document.querySelectorAll(".form-step-plan-options-option")
        )
      ) {
        alert("you should select a plan");
        return;
      }
      if (
        i === 2 &&
        !selectValidation(document.querySelectorAll(".form-step-ons-addons"))
      ) {
        alert("you should select a addons");
        return;
      }

      if (i < formStep.length) {
        // if (inputValidation()) {
        //   //function reurn true
        //   return;
        // }
        formStep[i].classList.add("hidden");

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
        if (count > active.length) {
          count = 0;
        }
        ///////////////////////////////////////
      }
    }
  });
});
