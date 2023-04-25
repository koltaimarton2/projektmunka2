function addToCart() {
    var icon = document.querySelector("#BasketContent")
    let newVal = (parseInt(icon.innerHTML) || 0) + 1;
    icon.innerHTML = newVal
}

