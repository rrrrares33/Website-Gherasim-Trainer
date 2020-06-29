function word() 
{
    var paragrafe = document.getElementsByTagName("p");
    var p0 = paragrafe[0];
    var p1 = paragrafe[1];
    
    var text0 = p0.innerHTML;
    var text1 = p1.innerHTML;
    
    text0 = text0.split(" ");
    text1 = text1.split(" ");
    
    p0.innerText = "";
    p1.innerText = "";
    
    var aux0 = 0;
    var aux1 = 0;
    
    var fin = setInterval(function () {
        if (aux0 == text0.length && aux1 == text1.length)
            clearInterval();
        else if (aux0 < text0.length && aux1 < text1.length)
            {
                p0.innerHTML += text0[aux0++] + " " ;
                p1.innerHTML += text1[aux1++] + " ";
            }
        else if (aux0 < text0.length)
            p0.innerHTML += (text0[aux0++]+ " ");
        else if (aux1 < text1.length)
            p1.innerHTML += (text1[aux1++]+ " ");
    },333)
}

function inactivity() {
    var secondsOfInacitivity = 0;
    var div = document.getElementById("inactivityDiv");
    div.style.display = "none";
    setInterval ( function () {
        secondsOfInacitivity ++;
        if (secondsOfInacitivity > 5) {
            div.style.display = "block";
            div.style.opacity = "0.9";
            div.innerText = secondsOfInacitivity + " secunde de inactivitate."
        }
    },1000)
    
    function resetInactivity() {
        secondsOfInacitivity = 0;
        div.style.display = "none";
    }
    
    var events = ['mousedown', 'mousemove','keydown','keypress','keyup', 'scroll', 'touchstart'];
    
    events.forEach (function(eventName)
                   {
        document.addEventListener(eventName, resetInactivity, true);
    })
    
}

function domLoaded() {
    document.addEventListener("DOMContentLoaded", word);
    document.addEventListener("DOMContentLoaded", inactivity);
}

window.onload = domLoaded();
/*var x = "O viață sănătoasă din punct de vedere fizic este cel mai bine reprezentată prin: o dietă echilibrată, sport constant și odihnă. O dietă echilibrată trebuie să fie realizată în așa fel încât să vă ajute să va realizați țelurile, aceasta putând fi de mai multe feluri: pentru slăbit, pentru îngrășare sau pentru dezvoltarea masei musculare. Sportul, pentru a îmbunătății starea de bine a organismului, trebuie practicat de cel puțin două ori pe săptămână.";
    var res = x.split(" ");
    for(var i = 0 ; i < res.length; i++)
        { 
        setInterval(function(){
            var text = "";
            for (var j = 0 ; j <= i; j++)
            {    
                text += res[j];
                text += " ";
            }
            document.getElementById("text1").innerHTML = text;
            //sleep(333);
        },333);
    }*/

/*
function sleep(milliseconds) {
  let date = new Date;
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}*/


/*O viață sănătoasă din punct de vedere fizic este cel mai bine reprezentată prin: o dietă echilibrată, sport constant și odihnă. O dietă echilibrată trebuie să fie realizată în așa fel încât să vă ajute să va realizați țelurile, aceasta putând fi de mai multe feluri: pentru slăbit, pentru îngrășare sau pentru dezvoltarea masei musculare. Sportul, pentru a îmbunătății starea de bine a organismului, trebuie practicat de cel puțin două ori pe săptămână.*/