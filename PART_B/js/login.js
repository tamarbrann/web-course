const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  const pass = document.getElementById("password").value;
  if (pass.length < 8) {
    alert("password need to be at least 8 characters");
    e.preventDefault();
  }
  const email = document.getElementById("email").value;
  if (!email.includes('.')) {
    alert("email need to include .");
    e.preventDefault();
  }

  localStorage.setItem("user", JSON.stringify({ email }));
});
