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
  },
  {
    title: "Baby Dress",
    desc: "Eco-friendly materials, first hand.",
    price: 15,
    img: "picture/dress.png",
    color: "green",
  },
];

showProducts(allProducts);

const colorPicker = document.getElementById("color");
colorPicker.addEventListener("change", (e) => {
  const color = e.target.value;
  if (color) {
    showProducts(allProducts.filter((p) => p.color === color));
  } else {
    showProducts(allProducts);
  }
});
