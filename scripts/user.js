var input = document.getElementById("Username");
var usrname = document.getElementById("playername")
var PlayerHead = document.getElementById("playerimg")

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

function Login() {
  document.cookie = "username=" + input.value;
  document.cookie = "beosszeg=" + Math.floor(Math.random() * 10001);
  if ((getCookie("username") != "")) window.location.href = 'nav.html'; // redirect to nav.html
}

function Logout() {
  document.cookie = "username=" + "";
}

function getSkinHead() {
  const xhr = new XMLHttpRequest();
  var fullUUID = "";
  xhr.open('GET', `https://mcuuid.net/?q=${getCookie("username")}`, true);
  xhr.responseType = 'text';
  xhr.onload = function() {
    if (xhr.status === 200 && PlayerHead != undefined) {
      // get trimmed UUID ****************************************************
      for (let i = 0; i < 32; i++) {
        fullUUID += xhr.response[xhr.response.search("Trimmed UUID:")+170+i];
        if(PlayerHead != undefined) { PlayerHead.src = `https://crafatar.com/avatars/${fullUUID}?size=48&default=MHF_Steve&overlay`; usrname.innerText = getCookie("username"); }
        else return;
      }
    } else {
      console.error('Request failed. Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

// LOAD MORE BUTTON ************************************************************************************
let MoreBTN = document.createElement('button');
MoreBTN.id = "loadmoreBTN";
MoreBTN.innerText = "Több betöltése...";
MoreBTN.className = "btn btn-primary text-white rounded-end-circle p-3";
MoreBTN.setAttribute("onclick","loadMore(10, document.querySelector('#bracletHolder'))");
if(document.querySelector("loadmoreBTN") != undefined) document.querySelector("loadmoreBTN").remove();

// CREATE RANDOM BRACLETS ---------------------------------------------------------------------------
function loadMore(NTime, append){
    let Bracletimgs = new Array();
    MoreBTN.setAttribute("onclick","loadMore(10, document.querySelector('#bracletHolder'))");
    for(let i = 0; i <= NTime; i++){
        Bracletimgs.push(document.querySelector("#bracletTemplate").cloneNode(true));
        Bracletimgs[i].children[0].src = 'images/kellekek/bluebraclet.png';
        Bracletimgs[i].children[0].style.filter += `hue-rotate(${Math.floor(Math.random() * 361) + Math.random() * 100}deg)`;
        Bracletimgs[i].children[1].id = `btnradio${i+2}`;
        Bracletimgs[i].children[2].setAttribute("for", `btnradio${i+2}`);
    }
    Bracletimgs.forEach(element => append.appendChild(element));
    document.querySelector("#bracletHolder").parentElement.appendChild(MoreBTN);
    // console.log("added braclets");
}

// LOAD PREVIEW DIV ---------------------------------------------------------------------------
function ChangePreview() {
  let skin2d = document.getElementById("skin2D");
  let skin3d = document.getElementById("skin3D");
  // console.log("Change Preview test");
  skin2d.classList.toggle("col-md-12");
  skin2d.classList.toggle("col-md-6");
  skin3d.classList.toggle("col-md-6");
  skin3d.classList.toggle("d-none");
}

// LOGIN MESSAGE BUY ---------------------------------------------------------------------------
function Buy(amount) {
  if((parseInt(getCookie('beosszeg')) - amount) < 0) {
    document.getElementById("buyBtn").classList.remove("btn-primary")
    document.getElementById("buyBtn").classList.add("btn-danger")
    document.getElementById("buyBtn").innerText = "Nincs elég BÉ-d!"
    return;
  }
  document.cookie = `beosszeg=${parseInt(getCookie('beosszeg')) - amount}`
  document.cookie = `udvozlo=${document.getElementById("udvozloText").value}`
  console.log(getCookie("udvozlo"));
  document.getElementById("buyBtn").classList.remove("btn-primary")
  document.getElementById("buyBtn").classList.add("btn-success")
  document.getElementById("buyBtn").innerText = "Megvéve!"
  document.getElementById("osszeg").innerText = getCookie("beosszeg") + " BÉ";
}
// CHEATS ---------------------------------------------------------------------------
function addBe(amount) {
  document.cookie = `beosszeg=${parseInt(getCookie('beosszeg')) + amount}`
  location.reload();
}
function setBE(amount) {
  document.cookie = `beosszeg=${amount}`
  location.reload();
}

// CALL FUNCTIONS IF ON RIGHT PAGES ************************************************************************************
if ( document.getElementById("osszeg" ) != undefined) { document.getElementById("osszeg").innerText = getCookie("beosszeg") + " BÉ"; getSkinHead(); loadMore(10, document.querySelector("#bracletHolder"));}
if ( document.getElementById("udvozloText") != undefined ) { document.getElementById("udvozloText").placeholder=getCookie("udvozlo");   
document.getElementById("buyBtn").classList.remove("btn-primary"); document.getElementById("buyBtn").classList.add("btn-success"); document.getElementById("buyBtn").innerText = "Megvéve!"; document.getElementById("buyBtn").setAttribute("data-bs-target", "")}