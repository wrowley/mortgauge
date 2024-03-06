//$(document).ready(function () {

const total_millies = document.getElementById("total_millies");
const total_dollies = document.getElementById("total_dollies");
const deposit = document.getElementById("deposit");
const remaining = document.getElementById("remaining");
const ratepa = document.getElementById("ratepa");
const termyears = document.getElementById("termyears");
const numpayments = document.getElementById("numpayments");
const paymentper = document.getElementById("paymentper");

// On page load...
update_all_derived_input_params();
update_table();

total_millies.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
deposit.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
termyears.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
// TODO: Okay this is an insufficient number of listeners to update this field
ratepa.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});

function round2dp(value)
{
    return Math.round(value*100)/100;
}

function update_all_derived_input_params()
{
    total_dollies.value = total_millies.value * 1000000;
    remaining.value = total_dollies.value - deposit.value;
    numpayments.value = termyears.value * 12;
    ideal_payment = payment_per_term(remaining.value, ratepa.value/100/12, numpayments.value);
    paymentper.value = round2dp(ideal_payment);
}

// Source: https://en.wikipedia.org/wiki/Mortgage_calculator
function payment_per_term(principal, rate_per_period, num_periods)
{
    var numerator   = principal*(rate_per_period * Math.pow((1 + rate_per_period), num_periods));
    var denominator = Math.pow((1 + rate_per_period), num_periods) - 1;

    console.log(numerator);

    return numerator/denominator;
}

function update_table()
{
    document.querySelector("table").innerHTML = '';

    const d = new Date();
    var current_month = d.getMonth();
    var current_year  = d.getFullYear();
    var remaining_loan = remaining.value;

    var interest_amount  = 0;
    var principal_amount = 0;

    

    /* Title Row */
    var row = document.querySelector("table").insertRow();
    row.insertCell().innerHTML = 'Date';
    row.insertCell().innerHTML = 'Payment Number';
    row.insertCell().innerHTML = 'Payment Amount';
    row.insertCell().innerHTML = 'Interest';
    row.insertCell().innerHTML = 'Principal';
    row.insertCell().innerHTML = 'Loan';

    for (var i=0; i < numpayments.value; i++) {
        var row = document.querySelector("table").insertRow();

        /* Date */
        let year_add = (d.getMonth() + i) / 12;
        row.insertCell().innerHTML = ((current_month + i) % 12 + 1) + '/' + Math.floor(current_year + year_add);

        /* Payment Number */
        row.insertCell().innerHTML = i + 1;

        /* Payment Amount */
        row.insertCell().innerHTML = paymentper.value;

        /* Interest paid */
        interest_amount = remaining_loan * ratepa.value / 100 / 12;
        row.insertCell().innerHTML = round2dp(interest_amount);

        /* Principal paid */
        principal_amount = paymentper.value - interest_amount;
        row.insertCell().innerHTML = round2dp(principal_amount);

        /* Loan remaining */
        remaining_loan = round2dp(remaining_loan - principal_amount);       
        row.insertCell().innerHTML = remaining_loan;

        

    }
}



