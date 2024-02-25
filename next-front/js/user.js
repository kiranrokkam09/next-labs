"use strict";

// Restrict Access
(function () {
  var token = sessionStorage.getItem("token");

  if (!token) {
    // Redirect the user to the login page if not logged in
    window.location.href = "/index.html";
  }
})();

// Function to show a specific section and hide others
function showSection(sectionId) {
  // Hide all sections
  hideAllSections();

  // Show the selected section
  document.getElementById(sectionId).style.display = "flex";
  changeAllButtons();
  const button = document.getElementById(sectionId + "btn");
  button.style.backgroundColor = "rgb(168, 85, 247)";
  button.style.color = "white";
  console.log(document.getElementById(sectionId));
}

// Function to hide all sections
function hideAllSections() {
  var sections = document.querySelectorAll(".section");
  sections.forEach(function (section) {
    section.style.display = "none";
  });
}

function changeAllButtons() {
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.style.backgroundColor = "white";
    button.style.color = "rgb(168, 85, 247)";
  });
}

// Sections
const home = document.querySelector("#home");
const profile = document.querySelector("#profile");
const points = document.querySelector("#points");
const tasks = document.querySelector("#task");
const detail = document.querySelector("#view-in-detail");

// Header Name
document.querySelector(
  "#headername"
).innerHTML = `Hello ${sessionStorage.getItem("firstname")}`;

// for Getting the all the apps
const fetchapps = (async () => {
  const data = await getapps();
  // border-gray-600
  const apps = data.map(
    (app) => `
  <div class="p-2 m-2 bg-gray-300 border flex flex row w-full md:w-[80%] rounded-lg overflow-hidden shadow">
    <div class="min-w-[75px] max-w-[120px] basis-1/5 rounded">
      <img src="${url}${app.image}" alt="" />
    </div>
    <div class="flex basis-3/4 sm:ml-3 md:ml-10 justify-left items-center">
      <div>
        <h1 class="font-bold text-3xl capitalize">${app.name}</h1>
        <a class="underline text-purple-500 view-in-detail" onclick="viewindetail(event, ${app.id})" href="">View in Detail</a>
      </div>
    </div>
    <div class="flex basis-1/5 sm:mr-3 md:mr-10 items-center justify-center">
      <button class="px-2 py-1 md:px-5 md:py-2 bg-green-500 border border-green-700 rounded">
        ${app.points} Points
      </button>
    </div>
  </div>
`
  );

  home.innerHTML = apps.join("");
})();

// Adding data to profile from Session Storage
profile.innerHTML = `<div class="bg-gray-300 overflow-hidden shadow rounded-lg border flex flex-col items-center justify-center">
<div class="px-6 py-5 sm:px-6">
  <h3 class="text-xl leading-6 font-medium text-gray-900 flex items-center justify-center">
    User Profile
  </h3>
</div>
<div class="border-t border-gray-200 px-6 py-5">
  <dl class="divide-y divide-gray-200">
    <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">First Name</dt>
      <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 capitalize col-span-1 md:col-span-2">
        ${sessionStorage.getItem("firstname")}
      </dd>
    </div>
    <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">Last Name</dt>
      <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 sm:mt-0 md:col-span-2 capitalize">
        ${sessionStorage.getItem("lastname")}
      </dd>
    </div>
    <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">User Name</dt>
      <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 sm:mt-0 md:col-span-2">
        ${sessionStorage.getItem("username")}
      </dd>
    </div>
    <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">Email</dt>
      <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 sm:mt-0 md:col-span-2">
        ${sessionStorage.getItem("email")}
      </dd>
    </div>
  </dl>
</div>
</div>
`;

// Points Page
const fetchpoints = (async () => {
  const data = await getpoints();
  points.innerHTML = `<div class="bg-gray-300 overflow-hidden shadow rounded-lg border p-4 flex flex-col items-center justify-center">
  <div class="px-6 py-5 sm:px-6">
    <h3 class="text-xl leading-6 font-medium text-gray-900 flex items-center justify-center">
      User Points
    </h3>
  </div>
  <div class="border-t border-gray-200 px-6 py-5 sm:p-0">
    <dl class="divide-y divide-gray-200">
      <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-start md:justify-items-center">
        <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">
          Total Points
        </dt>
        <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 capitalize md:col-span-2 flex justify-center md:justify-end md:pr-6">
          ${data["points"]}
        </dd>
      </div>
      <div class="py-5 md:py-4 lg:py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-start md:justify-items-center">
        <dt class="text-lg md:text-base lg:text-lg font-medium text-gray-900">
          Total Apps
        </dt>
        <dd class="mt-1 text-lg md:text-base lg:text-lg text-gray-900 sm:mt-0 md:col-span-2 flex justify-center md:justify-end md:pr-6">
          ${data["count"]}
        </dd>
      </div>
    </dl>
  </div>
`;
})();

// Tasks Page
const fetchtasks = (async () => {
  const data = await gettasks();
  const completedtasks = data.map(
    (task) => `
  <div class="p-2 m-2 bg-gray-300 border flex flex row w-full md:w-[80%] overflow-hidden shadow rounded-lg">
    <div class="min-w-[75px] max-w-[120px] basis-1/5 rounded">
      <img src="${url}${task.image}" alt="" />
    </div>
    <div class="flex basis-3/4 sm:ml-3 md:ml-10 justify-left items-center">
      <div>
        <h1 class="font-bold text-3xl capitalize">${task.name}</h1>
        <button class="bg-green-500 text-white font-bold mt-2 px-1 rounded-lg focus:outline-none focus:shadow-outline">completed</button>
      </div>
    </div>
    <div class="flex basis-1/5 sm:mr-3 md:mr-10 items-center justify-center">
      <button class="px-2 py-1 md:px-5 md:py-2 bg-green-500 border border-green-700 rounded">
        ${task.points} Points
      </button>
    </div>
  </div>
`
  );

  tasks.innerHTML = completedtasks.join("");
})();

// View In Detail

const viewindetail = async (event, id) => {
  event.preventDefault();
  const data = await getapp(id);
  sessionStorage.setItem("appid", id);
  const app = data[0];
  hideAllSections();
  detail.style.display = "flex";
  const appdetail = document.querySelector("#app-details");
  const appdetails = `<div
      id="detail-image"
      class="flex-1 min-w-[60px] max-w-[100px] rounded"
    >
      <img src="${url}${app.image}" alt="img" />
    </div>

    <div
      id="detail-name"
      class="flex-1 flex items-center justify-center"
    >
      <div>
        <h1
          class="font-bold text-3xl sm:text-lg md:text-2xl lg:text-3xl xl:text-3xl capitalize"
        >
        ${app.name}
        </h1>
        <a class="underline text-purple-500" value="" href="${app.link}"
          >${app.link}</a
        >
      </div>
    </div>
    <div
      id="detail-points"
      class="flex-1 h-2/4 flex items-center justify-center"
    >
      <button
        class="px-2 py-1 md:px-5 md:py-2 bg-green-500 border border-green-700 rounded"
      >
      ${app.points} Points
      </button>
    </div>`;
  appdetail.innerHTML = appdetails;
};

// Drag and Drop
const dragDropArea = document.getElementById("dragdrop");
const fileInput = document.getElementById("fileInput");

// Prevent default behavior to allow dropping files
dragDropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// Handle dropped files
dragDropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  handleFiles(e.dataTransfer.files);
});

// Open file dialog when the button is clicked
fileInput.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*"; // Adjust to your file type
  input.click();

  input.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });
});

// Handle the dropped or selected files
async function handleFiles(files) {
  const appid = sessionStorage.getItem("appid");
  const formData = new FormData();
  formData.append("app", appid);
  formData.append("screenshot", files[0]);
  await assignapp(formData);
  alert("Points added");
  window.location.href = "/index.html";
}
