var button = document.getElementById("countButton");
var reset = document.getElementById("saveButton")
var counter = document.getElementById("counter");

var clickCount = localStorage.getItem("clickCount");
if (clickCount) {
  clickCount = parseInt(clickCount);
} else {
  clickCount = 0;
}

counter.textContent = "Napin painallukset: " + clickCount;

var s100 = false;
var s200 = false;
var s500 = false;

var saavutus100 = document.getElementById("saavutus100");
var saavutus200 = document.getElementById("saavutus200");
var saavutus500 = document.getElementById("saavutus500");


var config = {
  offsetX: '1px',
  offsetY: '0px',
  blurRadius: '3px',
  color: 'green'
};

var config2 = {
  offsetX: '1px',
  offsetY: '0px',
  blurRadius: '3px',
  color: 'rgb(255, 0, 0)'
};

function updateTextShadow(target) {
  var value = config.offsetX + ' ' + config.offsetY + ' ' + config.blurRadius + ' ' + config.color;  
  target.style.textShadow = value;
}

function resetTextShadow(target) {
  var value2 = config2.offsetX + ' ' + config2.offsetY + ' ' + config2.blurRadius + ' ' + config2.color;  
  target.style.textShadow = value2;
}



if (clickCount >= 100)  {
  saavutus100.style.color = "green"
  updateTextShadow(saavutus100)
}

if (clickCount >= 200)  {
  saavutus200.style.color = "green"
  updateTextShadow(saavutus200)
}

if (clickCount >= 500)  {
  saavutus500.style.color = "green"
  updateTextShadow(saavutus500)
}

reset.addEventListener("click", function() {
  clickCount = 0;
  counter.textContent = "Napin painallukset: " + clickCount;
  resetTextShadow(saavutus100)
  resetTextShadow(saavutus200)
  resetTextShadow(saavutus500)
  saavutus100.style.color = 'rgb(255, 0, 0)'
  saavutus200.style.color = 'rgb(255, 0, 0)'
  saavutus500.style.color = 'rgb(255, 0, 0)'
  localStorage.clear
})


button.addEventListener("click", function() {
  clickCount++;
  counter.textContent = "Napin painallukset: " + clickCount;
  localStorage.setItem("clickCount", clickCount.toString());

  if (clickCount >= 100) {
    s100 = true

  } 
  if (clickCount >= 200){
    s200 = true

  } 
  if (clickCount >= 500){
    s500 = true
  }

  if (clickCount === 100) {
    counter.textContent = "Hienoa! Saavutit 100 painallusta!";

  } else if (clickCount === 200){

    counter.textContent = "Hienoa! Saavutit 200 painallusta!";

  } else if (clickCount === 500){

    counter.textContent = "Hienoa! Saavutit 500 painallusta!";
  }


  if (s100 === true)  {
    saavutus100.style.color = "green"
    updateTextShadow(saavutus100)
  }

  if (s200 === true)  {
    saavutus200.style.color = "green"
    updateTextShadow(saavutus200)
  }

  if (s500 === true)  {
    saavutus500.style.color = "green"
    updateTextShadow(saavutus500)
  }

});

