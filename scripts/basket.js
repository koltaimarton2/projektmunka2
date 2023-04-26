var costs = getCookie("costs") || "";

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
    var icon = document.querySelector("#BasketContent")
    costs += `${cost},`;
    icon.innerHTML = parseInt(icon.innerHTML || 0) + 1;
    document.cookie = `costs=${costs}`;
    document.cookie = `basketCount=${parseInt(getCookie("basketCount") || 0) + 1}`;
    // 
    console.log(getCookie("basketCount"));
    console.log(getCookie("costs"));
}

function emptyBasket()
{
    document.cookie = `basketCount=`;
    document.cookie = `items=`;
    location.reload();
}

function CalcAll() {
    basketList = JSON.parse(items);
    
    Array.from(basketList).forEach(function(currVal, i, arr) {
        console.log(mycost.rangok[basketList[i]]);
    })
}