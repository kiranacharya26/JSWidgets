const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionairesBtn = document.getElementById('Millionaires')
const sort = document.getElementById('sort')
const calcWealth = document.getElementById('cal-wealth')

let data=[]


randomUserGen()
randomUserGen()
randomUserGen()
 

async function randomUserGen(){
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()
    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 100000000),
    }
    addData(newUser)
}
//double money
function doubleMoney(){
    data = data.map(user =>{
        return{...user, money:user.money *2}
    })
    updateDOM()
}
//sort by richest
function sorrtByRichest(){
    data.sort((a,b) => b.money - a.money)

    updateDOM()
}
//show miilionaires
function showMillionaires(){
    data = data.filter(user => user.money > 100000000)

    updateDOM()
}
//calculate total amount of the existing users in the dom
function totalWealth(){
    const wealth = data.reduce((acc,user) =>(acc += user.money),0)

    const wealthEL = document.createElement('div')
    wealthEL.innerHTML = `<h3>Total wealth: <strong>${formatNumber(wealth)}</strong></h3>`
    main.appendChild(wealthEL)
  
}

//add new obj to data arr
function addData(obj){
    data.push(obj)
   
    updateDOM()
}

function updateDOM(providedData = data){
    main.innerHTML = ' <h2><strong>Person</strong>Wealth</h2>'

    providedData.forEach(item =>{
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>${formatNumber(item.money)}`
        main.appendChild(element)
    })
}

function formatNumber(number){
    return 'Rs '+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}
//event listeners
addUser.addEventListener('click', randomUserGen)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sorrtByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calcWealth.addEventListener('click', totalWealth)


