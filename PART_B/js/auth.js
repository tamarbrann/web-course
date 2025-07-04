function getUserEmail() {
  const decoded = decodeURIComponent(document.cookie);
  const arr = decoded.split("; ");
  const dict = Object.fromEntries(arr.map((pair) => pair.split("=")));
  return dict.userEmail;
}

const email = getUserEmail();
console.log("logged in to", email);

if (email) {
  const loginLink = document.getElementById("login-link");
  loginLink.innerText = "logout";
  loginLink.onclick = function () {
    document.cookie = "userEmail=";
  };
}
