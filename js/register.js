const registerForm = document.getElementById("register-form");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = registerEmail.value;
  const password = registerPassword.value;

  // users array yahan
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check email
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("Email already registered!");
    return;
  }

  // create new user
  const newUser = {
     id: users.length + 1,
    email: email,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Redirecting to login.");
  window.location.href = "login.html";
});
