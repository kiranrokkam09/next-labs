"use strict";

// Restrict Access
(function () {
  var token = sessionStorage.getItem("token");

  if (!token) {
    // Redirect the user to the login page if not logged in
    window.location.href = "/index.html";
  }
})();

const home = document.querySelector("#home");
const addapps = document.querySelector("#add-apps");
addapps.style.display = "None";

const homebutton = document.querySelector("#homebtn");
const addappbutton = document.querySelector("#addappbtn");
const addpointsButton = document.getElementById("addpoints");
const submitbutton = document.getElementById("submit");

//  Navigating the tabs

homebutton.addEventListener("click", () => {
  home.style.display = "flex";
  addapps.style.display = "None";
  changeAllButtons();
  homebutton.style.backgroundColor = "rgb(168, 85, 247)";
  homebutton.style.color = "white";
});

addappbutton.addEventListener("click", () => {
  home.style.display = "None";
  addapps.style.display = "Block";
  changeAllButtons();
  addappbutton.style.backgroundColor = "rgb(168, 85, 247)";
  addappbutton.style.color = "white";
});

function changeAllButtons() {
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.style.backgroundColor = "white";
    button.style.color = "rgb(168, 85, 247)";
  });
}
// for Getting the all the apps

const adminfetchapps = (async () => {
  const data = await getapps();
  const apps = data.map(
    (app) => `
  <div class="p-2 m-2 bg-gray-300 border flex flex-row w-full md:w-[80%] overflow-hidden shadow rounded-lg capitalize">
    <div class="min-w-[75px] max-w-[120px] basis-1/5 rounded">
      <img src="${url}${app.image}" alt="" />
    </div>
    <div class="flex basis-3/4 sm:ml-3 md:ml-10 justify-left items-center">
      <div>
        <h1 class="font-bold text-3xl">${app.name}</h1>
        <a class="underline text-purple-500" href="${app.link}">${app.link}</a>
      </div>
    </div>
    <div class="flex basis-1/5 sm:mr-3 md:mr-10 items-center justify-center">
      <button class="px-2 py-1 md:px-5 md:py-2 bg-green-500 border border-green-700 rounded">
        ${app["points"]} Points
      </button>
    </div>
  </div>
`
  );

  home.innerHTML = apps.join("");
})();

// Function to display image preview
function displayImagePreview(input) {
  const imgElement = document.querySelector("#displayImage");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Function for increment of add points
function incrementValue() {
  submitbutton.classList.remove("hidden");
  // Get the current value of the button
  var currentValue = parseInt(addpointsButton.value);

  // Increment the value
  var newValue = currentValue + 1;

  // Update the button value with the new value
  addpointsButton.value = newValue;

  addpointsButton.innerHTML = newValue;
}

// for updating the subcategories
function updateSubcategories() {
  var categoryDropdown = document.getElementById("category");
  var subcategoryDropdown = document.getElementById("subcategory");

  // Clear existing options in subcategoryDropdown
  subcategoryDropdown.innerHTML =
    "<option disabled selected>Sub category</option>";

  // Get the selected category
  var selectedCategory = categoryDropdown.value;

  // Add subcategories based on the selected category
  if (selectedCategory === "entertainment") {
    // Add options for Entertainment
    addOption(subcategoryDropdown, "Action", "action");
    addOption(subcategoryDropdown, "Comedy", "comedy");
  } else if (selectedCategory === "sports") {
    // Add options for Sports
    addOption(subcategoryDropdown, "Football", "football");
    addOption(subcategoryDropdown, "Basketball", "basketball");
  } else if (selectedCategory === "health") {
    // Add options for Health
    addOption(subcategoryDropdown, "Fitness", "fitness");
    addOption(subcategoryDropdown, "Nutrition", "nutrition");
  } else if (selectedCategory === "education") {
    // Add options for Education
    addOption(subcategoryDropdown, "Math", "math");
    addOption(subcategoryDropdown, "Science", "science");
  }
}

function addOption(selectElement, text, value) {
  var option = document.createElement("option");
  option.text = text;
  option.value = value;
  selectElement.add(option);
}

// for Creating app
const form = document.querySelector("#appform");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Create a new FormData object from the form
  const formData = new FormData(form);
  formData.append("points", addpointsButton.value);
  await createapp(formData);
  alert("App Created!");
  window.location.href = "/index.html";
});
