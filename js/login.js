const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const email = loginEmail.value;
    const password = loginPassword.value;

    //  validate credentials
 let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(user => user.email === email && user.password === password);

if(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful! Redirecting to dashboard.");
    window.location.href = "index.html";
} else {
    alert("Invalid email or password!");
}


});
