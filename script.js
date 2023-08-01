'use strict';

//elements

const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const btnSwap = document.getElementById('swap');

//global variables
let amountOne;
let currencyOne;
let currencyTwo;
//function
const init = () => {
  showCurrrencies(currencyElOne);
  showCurrrencies(currencyElTwo);
};

const showCurrrencies = async (input) => {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/2036f6aed05915dc3aa24fed/latest/` +
      'INR'
  );
  const data = await response.json();
  // console.log(data);
  const currencyArr = Object.keys(data.conversion_rates);
  // console.log(currencyArr);
  currencyArr.forEach((currency) => {
    const optionEl = document.createElement('option');
    optionEl.value = currency;
    optionEl.innerText = currency;
    input.appendChild(optionEl);
  });
};

const calculate = async function () {
  amountOne = Number(amountElOne.value);
  currencyOne = currencyElOne.value;
  currencyTwo = currencyElTwo.value;

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/2036f6aed05915dc3aa24fed/latest/${currencyOne}`
  );
  const data = await response.json();
  const rate = data.conversion_rates[currencyTwo];
  console.log(rate);
  amountElTwo.value = amountOne * rate;
  rateEl.innerText = ` 1${currencyOne} = ${rate} ${currencyTwo}`;
};
//addeventlistener
amountElOne.addEventListener('input', calculate);
currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);

btnSwap.addEventListener('click', () => {
  let temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

//init
init();
