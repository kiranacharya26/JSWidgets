const postContainer = document.querySelector('.post-container')
const loader = document.querySelector('.loader')
const filter = document.getElementById('filter')

let page = 1
let limit = 5

async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    return data
}
//show post on DOM

async function showPost(){
    const posts = await getPost()

    posts.forEach(post =>{
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
        
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
                ${post.body}
            </p>
        </div>
   
        `
        postContainer.appendChild(postEl)
    })

}
// show loading posts afterscroll
function showLoading(){
    loader.classList.add('show')

    setTimeout(() =>{
        loader.classList.remove('show')

        setTimeout(() =>{
            page++
            showPost()
        },100)
    },500)
} 
//filter input 
function filterInput(e){
    const term = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')
    
    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex'

        }else{
            post.style.display = 'none'
        }
    })  
}
//show posts
showPost()

window.addEventListener('scroll',()=>{
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight -5)
    showLoading()

})

filter.addEventListener('input', filterInput)


