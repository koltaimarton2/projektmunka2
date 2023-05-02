function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function addToCart(cost) {
  var costs = getCookie("costs") || 0;
  var icon = document.querySelector("#BasketContent");
  let newVal = parseInt(icon.innerHTML) || 0;
  icon.innerHTML = newVal + 1;
  document.cookie = `BasketContent=${newVal + 1}`;
  document.cookie = `costs=${parseInt(costs) + parseInt(cost)}`;
}

function emptyBasket() {
  document.cookie = "costs=";
  document.cookie = "BasketContent=";
  location.reload();
}