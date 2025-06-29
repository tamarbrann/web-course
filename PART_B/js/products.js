const CARTS = 'carts';

function showProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

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
    button.innerText = "Add to cart";
    button.onclick = function () {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) {
        alert('You need to be logged in to add to your cart.');
        return;
      }

      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          product_id: product.id,
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to add to cart");
          return res.text();
        })
        .then(message => {
          alert(message);
        })
        .catch(err => {
          alert("There was an error: " + err.message);
        });
    };
    div.appendChild(button);

    container.appendChild(div);
  }
}

function resetOtherFilters(el) {
  const selects = document.getElementsByTagName("select");
  for (const select of selects) {
    if (el !== select) {
      select.value = "";
    }
  }
}

let allProducts = [];

fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.map(p => ({
      id: p.id,
      title: p.name,
      desc: p.description,
      price: Number(p.price),
      img: p.image_url,
      color: p.color,
      size: p.size,
      gender: p.gender,
      type: p.type,
      condition: p.condition,
    }));
    showProducts(allProducts);
  });

const colorPicker = document.getElementById("color");
colorPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const color = e.target.value;
  showProducts(color ? allProducts.filter(p => p.color === color) : allProducts);
});

const sizePicker = document.getElementById("size");
sizePicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const size = e.target.value;
  showProducts(size ? allProducts.filter(p => p.size === size) : allProducts);
});

const genderPicker = document.getElementById("gender");
genderPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const gender = e.target.value;
  showProducts(gender ? allProducts.filter(p => p.gender === gender) : allProducts);
});

const typePicker = document.getElementById("type");
typePicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const type = e.target.value;
  showProducts(type ? allProducts.filter(p => p.type === type) : allProducts);
});

const conditionPicker = document.getElementById("condition");
conditionPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const condition = e.target.value;
  showProducts(condition ? allProducts.filter(p => p.condition === condition) : allProducts);
});
