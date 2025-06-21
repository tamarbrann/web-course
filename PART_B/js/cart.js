const CARTS = 'carts';

function showProducts(products, email) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (!products.length) {
    container.innerText = 'Cart is empty, you can add items to the cart in the shop'
    return;
  }

  for (const product of products) {
    const div = document.createElement("div");

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.title;
    div.appendChild(img);

    const h3 = document.createElement("h3");
    h3.innerText = product.title;
    div.appendChild(h3);

    const desc = document.createElement("p");
    desc.innerText = product.desc;
    div.appendChild(desc);

    const price = document.createElement("div");
    price.innerText = "Price: $" + product.price;
    div.appendChild(price);

    const button = document.createElement("button");
    button.innerText = "Remove from cart";
    button.onclick = function() {
      const all = JSON.parse(localStorage.getItem(CARTS)) ?? [];
      const cart = all[email];
      const filtered = cart.filter((p) => p.title !== product.title);
      all[email] = filtered;
      localStorage.setItem(CARTS, JSON.stringify(all));
      showProducts(filtered);
    }
    div.appendChild(button);

    container.appendChild(div);
  }

  const div = document.createElement("div");

  const label = document.createElement("label");
  label.innerText = "Total to pay: "
  div.appendChild(label);

  const value = document.createElement("span")
  value.innerText = "$" + products.reduce((acc, product) => acc + product.price, 0);
  div.appendChild(value);

  const payButton = document.createElement("button")
  payButton.innerText = "Pay"
  payButton.onclick = function() {
    alert('We’re currently experiencing issues with our payment system. Please try again later. Thank you for your patience.');
  }
  div.appendChild(payButton);

  container.appendChild(div)
}

const user = JSON.parse(localStorage.getItem("user"));

if (user?.email) {
  const all = JSON.parse(localStorage.getItem(CARTS)) ?? [];
  const cart = all[user.email] ?? [];
  showProducts(cart, user.email);
} else {
  alert('You need to be logged in to view your cart.')
  window.location.replace('Login.html')
}

