const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [ 
//     {id:1, text:"phone", amount: -30},
//     {id:1, text:"ball", amount: 30},
//     {id:1, text:"Salary", amount: 3000},
//     {id:1, text:"bottle", amount: -70}
//  ]

const localStorageValues = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageValues : []

function addTranscationDom(transaction){
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs (transaction.amount)}</span>
        <button class="delete-btn" onclick = "removeBtn(${transaction.id})">x</button>        
    `
    list.appendChild(item)

}

//add transaction details to the dom

function addTranscation(e){
    e.preventDefault()

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add relevent data')
    }
    else{
        const transaction = {
            id:randomIDGen(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTranscationDom(transaction)

        updateValue()
        addLocalStorage()

        text.value = ''
        amount.value = ''
    }
}

//random id generator
function randomIDGen(){
    return Math.floor(Math.random() * 100)
}

function updateValue(){
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item)=> (acc += item),0).toFixed(2)
    
    const income = amounts.filter(item => item > 0)
                            .reduce((acc, item) => (acc += item),0).toFixed(2)
    const expense = (amounts.filter(item =>item < 0)
                    .reduce((acc,item) =>(acc += item),0) * -1).toFixed()
    balance.innerText = `Rs ${total}`
    moneyPlus.innerText = `Rs ${income}`
    moneyMinus.innerText = `Rs ${expense}`
}
//remove the transaction usingg btn
function removeBtn(id){
    transactions = transactions.filter(transaction => transaction.id !== id)
    addLocalStorage() 
    init()
}

//local storage
function addLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

//add
function init(){
    list.innerHTML = ''
    transactions.forEach(addTranscationDom)
    updateValue()
}
init()
form.addEventListener('submit', addTranscation)