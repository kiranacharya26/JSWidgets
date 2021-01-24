const container = document.querySelector('.container')
 const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
populateUI()
let ticketPrice = +movieSelect.value


function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('setMovieIndex', movieIndex)
    localStorage.setItem('setMoviePrice', moviePrice)
}
function updateSelectedCount(){
    const selectedSeat = document.querySelectorAll('.row .seat.selected')
    
    const seatsIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat))
  
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatCount = selectedSeat.length
    count.innerText = selectedSeatCount
    total.innerText = selectedSeatCount * ticketPrice 
}
function populateUI(){
    const selectedSeats =  JSON.parse(localStorage.getItem('selectedSeats'))
   if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
   
   }
   const selectedMovieIndex = localStorage.getItem('slectedMovieIndex1')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
    }

    updateSelectedCount()
}) 

updateSelectedCount()