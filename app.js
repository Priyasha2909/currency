//API for currency values
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
})

// To insert values into dropdowns of 'From' and 'To' we have created a new variable called newOption
// to append the values which are being iterated over

for (let select of dropdowns){
    for(currCode in countryList){
         
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption) 
    }
    
    //On selecting/changing value from dropdowns , corresponding flags are getting displayed

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });

   
 const updateFlag = (element) => {
       let currCode = element.value;               // To extract the value from <select> element i.e cuurencyCode  
       let countryCode = countryList[currCode];   //To extract country code respective to currency code
       let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

       let img1 = element.parentElement.querySelector("img");
       img1.src = newSrc;
    }
}

//To get the exchange rate on clicking this button

btn.addEventListener("click", (evt) => {

    evt.preventDefault();
    updateExchangeRate();
})


const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let value = amount.value;
    if(value === "" || value <1){
        value = 1;
        amount.value = "1"
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data)
    let rate = data[toCurr.value.toLowerCase()]
    console.log(rate);

    let final = value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${final} ${toCurr.value}`
}
