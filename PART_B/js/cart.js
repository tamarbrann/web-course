// Renders products in the cart page
function showProducts(products, email) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  // If cart is empty, show message and exit
  if (!products.length) {
    container.innerText = 'Cart is empty, you can add items to the cart in the shop.';
    return;
  }

  // Loop through products and render them in the cart
  for (const product of products) {
    const div = document.createElement("div");

    const img = document.createElement("img");
    img.src = product.image_url;
    img.alt = product.name;
    div.appendChild(img);

    const h3 = document.createElement("h3");
    h3.innerText = product.name;
    div.appendChild(h3);

    const desc = document.createElement("p");
    desc.innerText = product.description;
    div.appendChild(desc);

    const price = document.createElement("div");
    price.innerText = "Price: $" + product.price;
    div.appendChild(price);

    // Create "Remove from cart" button
    const button = document.createElement("button");
    button.innerText = "Remove from cart";
    button.onclick = function () {
      // Send request to backend to remove item from cart
      fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: email,
          product_id: product.id
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to remove item");
          return res.text();
        })
        .then(() => {
          location.reload(); // Reload the page to refresh cart view
        })
        .catch(err => {
          alert("There was an error: " + err.message);
        });
    };
    div.appendChild(button);

    container.appendChild(div);
  }

  // Create cart summary section
  const summary = document.createElement("div");

  const label = document.createElement("label");
  label.innerText = "Total to pay: ";
  summary.appendChild(label);

  const value = document.createElement("span");
  value.id = "total-value"; // ID used to update total later
  summary.appendChild(value);

  // Fetch total cart value from backend
  fetch("/api/cart/total?email=" + email)
    .then(res => res.json())
    .then(({ total }) => {
      value.innerText = "$" + Number(total).toFixed(2);
    })
    .catch(err => {
      console.error("Error calculating total:", err);
      value.innerText = "N/A";
    });

  // Simulated "Pay" button
  const payButton = document.createElement("button");
  payButton.innerText = "Pay";
  payButton.onclick = function () {
    alert('We’re currently experiencing issues with our payment system. Please try again later.');
  };
  summary.appendChild(payButton);

  container.appendChild(summary);
}

const userEmail = getUserEmail();

if (userEmail) {
  // If logged in, fetch user's cart from server
  fetch("/api/cart?email=" + userEmail)
    .then(res => res.json())
    .then(data => {
      showProducts(data, userEmail);
    })
    .catch(err => {
      console.error("Error fetching cart:", err);
      alert("There was an error loading your cart.");
    });
} else {
  // Redirect to login page if not logged in
  alert("You need to be logged in to view your cart.");
  window.location.replace("Login.html");
}
