const toggle = document.getElementById('toggle')
const closex = document.getElementById('close')
const openX = document.getElementById('open')
const modal = document.getElementById('modal')

//toggle
toggle.addEventListener('click', (e) =>{
    document.body.classList.toggle('show-nav') 
})

//modal-show
openX.addEventListener('click', ()=> modal.classList.add('show-modal'))
closex.addEventListener('click', () => modal.classList.remove('show-modal'))

//hide modal when clicked outside

window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal'): false)