const form = document.getElementById("signup-form");

form.addEventListener("submit", (e) => {
  const firstName = document.getElementById("first-name").value;
  if (firstName.length <= 3) {
    alert("The name must contain more then three letters.");
    e.preventDefault();
  }

  const lastName = document.getElementById("last-name").value;
  if (lastName.length <= 3) {
    alert("The last name must contain more then three letters.");
    e.preventDefault();
  }

  const email = document.getElementById("email").value;
  if (!email.includes("@")) {
    alert("The email must be valid");
    e.preventDefault();
  }

  const phone = document.getElementById("phone").value;
  if (!phone.startsWith("05") || !phone.length === 10) {
    alert("The phone must be valid");
    e.preventDefault();
  }

  const ctiy = document.getElementById("city").value;
  if (ctiy.length <= 3) {
    alert("The city must contain more then three letters.");
    e.preventDefault();
  }

  const pass = document.getElementById("password").value;
  if (pass.length < 8) {
    alert("password need to be at least 8 characters");
    e.preventDefault();
  }

  const confirm = document.getElementById("confirm-password").value;
  if (confirm !== pass) {
    alert("The passwords do not match.");
    e.preventDefault();
  }
});

const show = document.getElementById("show");
show.addEventListener("change", (e) => {
  const pass = document.getElementById("password");
  const value = e.target.checked;
  if (value) {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
});
