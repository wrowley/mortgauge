//$(document).ready(function () {

const total_millies = document.getElementById("total_millies");
const total_dollies = document.getElementById("total_dollies");

total_millies.addEventListener("input", function (e) {
    total_dollies.value = e.target.value * 1000000;
});

//document.querySelector("table").innerHTML = '';
for (var i=0; i<6; i++) {
    var row = document.querySelector("table").insertRow();
    for (var j=0; j<6; j++) {
        row.insertCell().innerHTML = i*6+j;
    }
}
