const CART = 'cart';

function showProducts(products) {
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
      const cart = JSON.parse(localStorage.getItem(CART)) ?? [];
      const filtered = cart.filter((p) => p.title !== product.title);
      localStorage.setItem(CART, JSON.stringify(filtered));
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

const productsInCart =  JSON.parse(localStorage.getItem(CART)) ?? [];
showProducts(productsInCart);

