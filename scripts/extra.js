let count = 0;
let sum = 0;
let cart = {};

if (localStorage.getItem("count")) {
    count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

updateCart();

let btns = document.querySelectorAll(".product button");

for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener("click", add);

    // id = btn.dataset.id;
    // if (cart.indexOf(id) >= 0) {
    //     btn.className = "added";
    //     btn.textContent = "Remove";
    // }
}

let clearBtn = document.querySelector("#clearCart");
if(clearBtn !== null) {
  clearBtn.addEventListener("click", clearCart);
}

function clearCart(event) {
  cart = {};
  sum = 0;
  count = 0;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  console.log('kosár ürítve');
  console.log(cart);
}

function add(event) {
  let price = Number(event.target.dataset.price);
  let title = event.target.dataset.title;
  let id = event.target.dataset.id;

  if (id in cart) {
    cart[id].qty++;
} else {
    let cartItem = {
        title: title,
        price: price,
        qty: 1
    };
    cart[id] = cartItem
}

    count++;
    sum += price;

    console.log(cart);

    //  let index = cart.indexOf(event.target.dataset.id);
    //  if (index >= 0) {
    //      cart.splice(index, 1);
    //      count--;
    //      sum -= price;
    //      event.target.className = "";
    //      event.target.textContent = "Add to cart";
    //  } else {
    //      cart.push(event.target.dataset.id);
    //      count++;
    //      sum += price;
    //      event.target.className = "added";
    //      event.target.textContent = "Remove";
    //  }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    let sumTotal = document.getElementById("sumTotal");
    if(sumTotal !== null) sumTotal.textContent = sum + " Ft";
    // document.getElementById("count").textContent = count;
     localStorage.setItem("sum", sum);
     localStorage.setItem("count", count);

     let productList = document.getElementById("product-list");
     if(productList !== null) {
      for(i = 0; i < Object.keys(cart).length; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between cartItem";
        li.appendChild(document.createTextNode(Object.values(cart)[i].title));

        var pr = document.createElement("span");
        pr.appendChild(document.createTextNode(Object.values(cart)[i].qty + " x " + Object.values(cart)[i].price + " Ft"));
        li.appendChild(pr);

        //productList.appendChild(li);
        productList.insertBefore(li, productList.firstChild);
      }
      if(Object.keys(cart).length == 0) {
        const items = document.querySelectorAll(".cartItem");
        items.forEach(item => { item.remove(); });
      }
     }
}