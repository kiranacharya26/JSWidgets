const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
]
//intialise
let time= 10
let score = 0
let randomWord
//saving value in local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'
//saving the value even after reload
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'
//gen random words from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom(){
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}
addWordToDom()

//text focus
text.focus()

//countdown timer
const timeInterval = setInterval(updateTime, 1000)
//update time
function updateTime(){
   time--
   timeEl.innerHTML = time + 's'
   if(time === 0){
       clearInterval(timeInterval)
       gameOver()
   }
}

//adding fucntion when player loses
function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time Up</h1>
        <p>Score ${score}</p>
        <button onclick = "location.reload()">Reload</button>
    `
    endgameEl.style.display = "flex"
}

//function which updates the score
function updateScore(){
    score++
    scoreEl.innerHTML = score
}


//type
//settings btn 
settingsBtn.addEventListener('click',() =>{
    settings.classList.toggle('hide')
})

//settings select
 settingsForm.addEventListener('change', e =>{
     difficulty = e.target.value
     localStorage.setItem('diffculty',difficulty)
 })

//event listeners
text.addEventListener('input', e=>{
    const insert = e.target.value
    if(insert === randomWord){
        addWordToDom()
        updateScore()
         // to clear the typed input
        e.target.value = ''

       if(difficulty === 'hard'){
           time += 2
       }else if(difficulty === 'medium'){
           time +=4
       }else{
           time +=5
       }

        updateTime()
    }
})