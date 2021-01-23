const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const cpassword = document.getElementById('cpassword')

function showError(input , message){
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}
function showSuccess(input){
    const formControl = input.parentElement
    formControl.className = 'form-control sucess'
    
}

function checkRequired(inputArray){
    inputArray.forEach((input) =>{
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
        }else{
            showSuccess(input)
        }
    })
}
function checkLenght(input,min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else{
        showSuccess(input)
    }
}
function checkPasswordLenght(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, 'password doesnot match')
    }
}
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    checkRequired([username,email,password,cpassword])
    checkLenght(password,6,24)
    checkLenght(username,6,26)
    checkPasswordLenght(password,cpassword)
})