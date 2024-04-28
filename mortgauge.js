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
ratepa.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
offset_starting.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
offset_annual.addEventListener("input", function (e) {
    update_all_derived_input_params();
    update_table();
});
offset_monthly.addEventListener("input", function (e) {
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
    var mortgage_lifecycle_table = document.getElementById("mortgage_lifecycle_table");

    mortgage_lifecycle_table.innerHTML = '';

    const d = new Date();
    var current_month = d.getMonth();
    var current_year  = d.getFullYear();
    var remaining_loan = +remaining.value;

    var interest_amount  = 0;
    var principal_amount = 0;
    var offset_account_deposit = 0;

    var offset_account_balance = 0;

    /* Title Row */
    var row = mortgage_lifecycle_table.insertRow();
    row.insertCell().innerHTML = 'Date';
    row.insertCell().innerHTML = 'Payment Number';
    row.insertCell().innerHTML = 'Payment Amount';
    row.insertCell().innerHTML = 'Interest';
    row.insertCell().innerHTML = 'Principal';
    row.insertCell().innerHTML = 'Loan';
    row.insertCell().innerHTML = 'Offset Account Deposit'
    row.insertCell().innerHTML = 'Offset Account Balance'
    row.insertCell().innerHTML = 'Effective Debt'

    for (var i=0; i < numpayments.value; i++) {
        var row = mortgage_lifecycle_table.insertRow();

        /* Date */
        let year_add = (d.getMonth() + i) / 12;
        let month_num = (current_month + i) % 12 + 1;

        /* Offset deposits */
        let deposit_if_not_starting = (month_num == 1) ? (+offset_annual.value + +offset_monthly.value) : +offset_monthly.value;
        let deposit = (i == 0) ? +offset_starting.value : deposit_if_not_starting;

        /* Loan calcs */
        offset_account_deposit = round2dp(deposit);
        offset_account_balance = round2dp(offset_account_balance + offset_account_deposit);
        effective_debt = round2dp(remaining_loan - offset_account_balance);
        effective_debt = Math.max(0, effective_debt);
        interest_amount = round2dp(effective_debt * ratepa.value / 100 / 12);
        principal_amount = paymentper.value - interest_amount;

        row.insertCell().innerHTML = (month_num) + '/' + Math.floor(current_year + year_add);

        /* Payment Number */
        row.insertCell().innerHTML = i + 1;

        /* Payment Amount */
        row.insertCell().innerHTML = paymentper.value;

        /* Interest paid */
        row.insertCell().innerHTML = round2dp(interest_amount);

        /* Principal paid */
        row.insertCell().innerHTML = round2dp(principal_amount);

        /* Loan remaining */
        row.insertCell().innerHTML = remaining_loan;

        /* Offset deposit */
        row.insertCell().innerHTML = offset_account_deposit;

        /* Offset balance */
        row.insertCell().innerHTML = offset_account_balance;

        /* Effective debt */
        row.insertCell().innerHTML = effective_debt;

        remaining_loan = round2dp(remaining_loan - principal_amount);
        remaining_loan = Math.max(0, remaining_loan);

        if (remaining_loan == 0) break;

    }
}



