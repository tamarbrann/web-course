function showProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = undefined;

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
    div.appendChild(button);

    container.appendChild(div);
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
  const color = e.target.value;
  if (color) {
    const filterd = [];
    for (const p of allProducts) {
      if (p.color === color) {
        filterd.push(p);
      }
    }
    showProducts(filterd);
  } else {
    showProducts(allProducts);
  }
});

const sizePicker = document.getElementById("size");
sizePicker.addEventListener("change", (e) => {
  const size = e.target.value;
  if (size) {
    const filterd = [];
    for (const p of allProducts) {
      if (p.size === size) {
        filterd.push(p);
      }
    }
    showProducts(filterd);
  } else {
    showProducts(allProducts);
  }
});

const genderPicker = document.getElementById("gender");
genderPicker.addEventListener("change", (e) => {
  const gender = e.target.value;
  if (gender) {
    const filterd = [];
    for (const p of allProducts) {
      if (p.gender === gender) {
        filterd.push(p);
      }
    }
    showProducts(filterd);
  } else {
    showProducts(allProducts);
  }
});

const typePicker = document.getElementById("type");
typePicker.addEventListener("change", (e) => {
  const type = e.target.value;
  if (type) {
    const filterd = [];
    for (const p of allProducts) {
      if (p.type === type) {
        filterd.push(p);
      }
    }
    showProducts(filterd);
  } else {
    showProducts(allProducts);
  }
});

const conditionPicker = document.getElementById("condition");
conditionPicker.addEventListener("change", (e) => {
  const condition = e.target.value;
  if (condition) {
    const filterd = [];
    for (const p of allProducts) {
      if (p.condition === condition) {
        filterd.push(p);
      }
    }
    showProducts(filterd);
  } else {
    showProducts(allProducts);
  }
});