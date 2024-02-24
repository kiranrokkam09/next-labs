"use strict";

// For Login
const loginform = document.querySelector("#loginform");
loginform.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Create a new FormData object from the form
  const formData = new FormData(loginform);
  const data = await login(formData);
  // Save token to sessionStorage
  sessionStorage.setItem("token", data["token"]);
  sessionStorage.setItem("firstname", data["first_name"]);
  sessionStorage.setItem("lastname", data["last_name"]);
  sessionStorage.setItem("username", data["username"]);
  sessionStorage.setItem("email", data["email"]);
  // Check if the user is an admin
  if (data["isadmin"] === true) {
    // Redirect to admin page
    window.location.href = "/next-front/admin.html";
  } else {
    // Redirect to user page
    window.location.href = "/next-front/user.html";
  }
});
