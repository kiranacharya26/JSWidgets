const currencyOne = document.getElementById('currency-one')
const currencyTwo = document.getElementById('currency-two')
const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')
const swapBtn = document.querySelector('.btn')
const rateEl = document.getElementById('rate')


function calculate(){
 
    const curOne = currencyOne.value
    const curTwo = currencyTwo.value

    fetch(`https://v6.exchangerate-api.com/v6/5323907687669b13b2ea7892/latest/${curOne}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            
            const rate = data.conversion_rates[curTwo]
            rateEl.innerHTML = `1 ${currencyOne} = ${rate} ${currencyTwo}`
            amountTwo.value = ((amountOne.value *rate)).toFixed(2)
        })
}

//event listeners
currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
amountTwo.addEventListener('input', calculate)
swapBtn.addEventListener('click',() => {
    const temp = currencyOne.value
    currencyOne.value = currencyTwo.value
    currencyTwo.value = temp
    calculate()
})

calculate()
