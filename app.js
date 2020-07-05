const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
//exchangeRate API
const calculate = async () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`);
  let data = await response.json();

  const rate = data.rates[currency_two];

  rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
};

//event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('change', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
