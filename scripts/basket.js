function addToCart() {
    var icon = document.querySelector("#BasketContent")
    let newVal = parseInt(icon.innerHTML);
    icon.innerHTML = newVal + 1
}