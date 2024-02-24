"use strict";

// All Urls
const url = "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com";
const API_TOKEN = sessionStorage.getItem("token");
const getapps_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/getapps";
const createapp_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/createapp";
const signup_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/signup";
const login_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/login";
const points_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/points";
const tasks_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/tasks";
const assignapp_url =
  "http://ec2-13-60-21-86.eu-north-1.compute.amazonaws.com/next/assignapp";

// Post Request for signup
const signup = async (formdata) => {
  const response = await fetch(signup_url, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `HTTP error! Status: ${response.status}, Error: ${errorText}`
    );
    alert(errorText);
  }

  const data = await response.json();
};

//Post Request for Login
const login = async (formdata) => {
  const response = await fetch(login_url, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `HTTP error! Status: ${response.status}, Error: ${errorText}`
    );
    alert("Invalid Username or Password");
  }
  const data = await response.json();
  return data;
};

// GET Request for getting all the apps
const getapps = async () => {
  try {
    const response = await fetch(getapps_url, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in getapps:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};

// Post Request for Creating the apps
const createapp = async (formdata) => {
  try {
    const response = await fetch(createapp_url, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Error: ${errorText}`
      );
      //   throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in createapp:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};

// Get Request for Points
const getpoints = async () => {
  try {
    const response = await fetch(points_url, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in getpoints:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};

// Get request for Tasks
const gettasks = async () => {
  try {
    const response = await fetch(tasks_url, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in gettasks:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};

// Logout Function
const handleLogout = () => {
  // Clear the token from localStorage
  sessionStorage.removeItem("token");

  // Redirect the user to the login page
  window.location.href = "/next-front/index.html";
};

// Get single app details
const getapp = async (id) => {
  try {
    const urlWithParam = `${getapps_url}?id=${id}`;
    const response = await fetch(urlWithParam, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in getapps:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};

// Assign Apps in View Details
const assignapp = async (formdata) => {
  try {
    const response = await fetch(assignapp_url, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Error: ${errorText}`
      );
      alert(errorText);
      //   throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {
    // Handle any other errors, including network errors
    console.error("Error in createapp:", error.message);
    throw error; // rethrow the error to propagate it to the caller if needed
  }
};
