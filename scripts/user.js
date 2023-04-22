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
  document.cookie = "udvozlo= ";
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
if ( document.getElementById("osszeg" ) != undefined) { document.getElementById("osszeg").innerText = getCookie("beosszeg") + " BÉ"; getSkinHead();}