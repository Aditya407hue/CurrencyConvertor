const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
const convertorContainer = document.querySelector(".convertor-container");

resultElement.textContent = "Fetching Exchange Rates";

// Array to populate Select tags with these countries
const countries = [
  { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "AFN", name: "Afghan Afghani" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "ANG", name: "Netherlands Antillean Guilder" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "BAM", name: "Bosnian Convertible Mark" },
  { code: "BBD", name: "Barbadian or Bajan Dollar" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "BIF", name: "Burundian Franc" },
  { code: "BMD", name: "Bermudian Dollar" },
  { code: "BND", name: "Bruneian Dollar" },
  { code: "BOB", name: "Bolivian Bolíviano" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "BSD", name: "Bahamian Dollar" },
  { code: "BTN", name: "Bhutanese Ngultrum" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "IQD", name: "Iraqi Dinar" },
  { code: "JMD", name: "Jamaican Dollar" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "MAD", name: "Moroccan Dirham" },
];

// Showing Countries from array to select tag

countries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = country.code;
  option1.textContent =
    option2.textContent = `${country.code} (${country.name})`;

  fromCurrencyElement.appendChild(option1);
  toCurrencyElement.appendChild(option2);

  fromCurrencyElement.value = "USD";
  toCurrencyElement.value = "INR";
});

// Function to get exchange rate using api

const getExchangeRate = async () => {
  const amount = parseFloat(fromAmountElement.value);
  const fromCurrency = fromCurrencyElement.value;
  const toCurrency = toCurrencyElement.value;

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    if(typeof conversionRate === 'undefined'){
        resultElement.textContent = "Exchange rate data is not available for selected countries!!!";
        convertedAmountElement = "";
    }
    else{
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

  } catch (error) {
       convertorContainer.innerHTML = `<h2>Error while fetching exchange rates !!!</h2>`;
  }
};

fromAmountElement.addEventListener("input", getExchangeRate);

fromAmountElement.addEventListener("change", getExchangeRate);

fromAmountElement.addEventListener("change", getExchangeRate);

fromAmountElement.addEventListener("load", getExchangeRate);
