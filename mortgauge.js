//$(document).ready(function () {

const total_millies = document.getElementById("total_millies");
const total_dollies = document.getElementById("total_dollies");
const deposit = document.getElementById("deposit");
const remaining = document.getElementById("remaining");
const ratepa = document.getElementById("ratepa");
const termyears = document.getElementById("termyears");
const numpayments = document.getElementById("numpayments");
const paymentper = document.getElementById("paymentper");

total_millies.addEventListener("input", function (e) {
    total_dollies.value = e.target.value * 1000000;
    remaining.value = total_dollies.value - deposit.value;
    update_payment_per_term(remaining.value, ratepa.value/100/12, numpayments.value);
});
deposit.addEventListener("input", function (e) {
    remaining.value = total_dollies.value - e.target.value;
    update_payment_per_term(remaining.value, ratepa.value/100/12, numpayments.value);
});
termyears.addEventListener("input", function (e) {
    numpayments.value = e.target.value * 12;
    update_payment_per_term(remaining.value, ratepa.value/100/12, numpayments.value);
});
// TODO: Okay this is an insufficient number of listeners to update this field
ratepa.addEventListener("input", function (e) {
    update_payment_per_term(remaining.value, e.target.value/100/12, numpayments.value);
});

function update_payment_per_term(principal, rate_per_period, num_periods)
{
    paymentper.value = payment_per_term(
        principal,
        rate_per_period,
        num_periods,
    );
}

// Source: https://en.wikipedia.org/wiki/Mortgage_calculator
function payment_per_term(principal, rate_per_period, num_periods)
{
    var numerator   = principal*(rate_per_period * Math.pow((1 + rate_per_period), num_periods));
    var denominator = Math.pow((1 + rate_per_period), num_periods) - 1;

    console.log(numerator);

    return numerator/denominator;
}

//document.querySelector("table").innerHTML = '';
for (var i=0; i<6; i++) {
    var row = document.querySelector("table").insertRow();
    for (var j=0; j<6; j++) {
        row.insertCell().innerHTML = i*6+j;
    }
}
