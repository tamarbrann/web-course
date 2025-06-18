const CART = 'cart';

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
    button.onclick = function() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) {
        alert('You need to be logged in to add to your cart.')
        return
      }
      const all = JSON.parse(localStorage.getItem(CART)) ?? {};
      const cart = all[user.email] ?? [];

      if (cart.findIndex((p) => p.title === product.title) >= 0) {
        alert("Our products are unique, you can only purchase one item each.");
        return;
      }
      cart.push(product);
      all[user.email] = cart;
      localStorage.setItem(CART, JSON.stringify(all));
    }
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

const allProducts = [
  {
    title: "Blue Baby Overalls",
    desc: "Organic cotton, second hand, excellent condition.",
    price: 10,
    img: "picture/overalls.png",
    color: "blue",
    size: "0-3",
    gender: "boys",
    type: "overalls",
    condition: "first-hand",
  },
  {
    title: "Baby Dress",
    desc: "Eco-friendly materials, first hand.",
    price: 15,
    img: "picture/dress.png",
    color: "green",
    size: "6-12",
    gender: "girls",
    type: "dresses",
    condition: "second-hand",
  },
];

showProducts(allProducts);

const colorPicker = document.getElementById("color");
colorPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const color = e.target.value;
  if (color) {
    const filtered = [];
    for (const p of allProducts) {
      if (p.color === color) {
        filtered.push(p);
      }
    }
    showProducts(filtered);
  } else {
    showProducts(allProducts);
  }
});

const sizePicker = document.getElementById("size");
sizePicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const size = e.target.value;
  if (size) {
    const filtered = [];
    for (const p of allProducts) {
      if (p.size === size) {
        filtered.push(p);
      }
    }
    showProducts(filtered);
  } else {
    showProducts(allProducts);
  }
});

const genderPicker = document.getElementById("gender");
genderPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const gender = e.target.value;
  if (gender) {
    const filtered = [];
    for (const p of allProducts) {
      if (p.gender === gender) {
        filtered.push(p);
      }
    }
    showProducts(filtered);
  } else {
    showProducts(allProducts);
  }
});

const typePicker = document.getElementById("type");
typePicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const type = e.target.value;
  if (type) {
    const filtered = [];
    for (const p of allProducts) {
      if (p.type === type) {
        filtered.push(p);
      }
    }
    showProducts(filtered);
  } else {
    showProducts(allProducts);
  }
});

const conditionPicker = document.getElementById("condition");
conditionPicker.addEventListener("change", (e) => {
  resetOtherFilters(e.target);
  const condition = e.target.value;
  if (condition) {
    const filtered = [];
    for (const p of allProducts) {
      if (p.condition === condition) {
        filtered.push(p);
      }
    }
    showProducts(filtered);
  } else {
    showProducts(allProducts);
  }
});
