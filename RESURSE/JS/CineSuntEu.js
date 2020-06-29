var ravase = ["O sa ai o zi minunata!", "O sa reusesti in tot ceea ce iti vei propune!", "O sa ai o vara frumoasa!", "O sa iti realizezi un vis!", "O sa intalnesti o persoana deosebita!", "O sa castigi un premiu mare!", "O sa te apuci de sala!", "O sa iti incepi un hobby nou!", "O sa castigi la loto!"];

function randInt(a,b){
	return Math.trunc(a+(b-a)*Math.random());
}

window.onload = function() {
    document.getElementById("ravas").innerHTML = ravase[randInt(0,9)];
}
    
