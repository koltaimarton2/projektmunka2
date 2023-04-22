var wheel = document.getElementById('wheel'),
    spinBtn = document.getElementById('spinBtn'),
    amounts = new Array(0, 777, -3000, 420, -69, 666, 1337, 42);

function spin() {
    var rotVal = 45 * Math.floor(Math.random() * 81 + 360),
    nums = Array.from(document.getElementsByClassName("number"));
    let winner;
    wheel.style.transition = `transform 5s ease-in-out`;
    // console.log(val);
    // console.log(rotVal);
    wheel.style.transform = `rotate(${rotVal}deg)`;
    rotVal += 45 * Math.floor(Math.random() * 81) + 360;
    //onsole.log(rotVal);
    setTimeout(function() {
        nums.forEach(function(currentVal, index, arr) {
            console.log(`Currentval ${nums[index].getBoundingClientRect().top} index is ${index}`)
            if(80 <= nums[index].getBoundingClientRect().top && 130 >= nums[index].getBoundingClientRect().top) {
                console.log(`Winner is ${index}`); 
                winner = index;
            }
        })
        console.log(amounts[winner]);
        document.cookie = `beosszeg=${parseInt(getCookie('beosszeg')) + parseInt(amounts[winner])}`
        document.getElementById("osszeg").innerText = getCookie("beosszeg") + " BÉ";
    }, 5000);
}

spinBtn.onclick = () => {
    
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }