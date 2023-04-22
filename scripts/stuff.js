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

if ( document.getElementById("udvozloText") != undefined) document.getElementById("udvozloText").placeholder=getCookie("udvozlo");
if (getCookie("udvozlo") != "") {
  document.getElementById("buyBtn").classList.remove("btn-primary"); 
  document.getElementById("buyBtn").classList.add("btn-success"); 
  document.getElementById("buyBtn").innerText = "Megvéve!"; 
  document.getElementById("buyBtn").setAttribute("data-bs-target", "")
}

loadMore(10, document.querySelector("#bracletHolder"));