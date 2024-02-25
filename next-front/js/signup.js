"use strict";

// For Signup
const signupform = document.querySelector("#signupform");
signupform.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Create a new FormData object from the form
  const formData = new FormData(signupform);
  formData.append("username", signupform.querySelector("#email").value);
  await signup(formData);
  alert("User Created!");
  window.location.href = "/index.html";
});
