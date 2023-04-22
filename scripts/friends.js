let rangok = new Array("VIP", "ELIT", "ZSÍRKIRÁLY", "TITÁN", "FÉLISTEN", "MINDENHATÓ", "MINDENHATÓ+", "TROLL", "TROLL+", "BOSSZÚÁLLÓ", "MUTÁNS", "JEDI", "SITH");

for(let i = 0; i <= 7; i++){
    console.log(rangok[Math.floor(Math.random()*rangok.length)]);
}

function deleteFriend(index, on) {
    try{
        document.querySelector(`#${on}line`).children[index].remove();
    } catch (error){
        document.querySelector(`#${on}line`).lastElementChild.remove();
    }
}