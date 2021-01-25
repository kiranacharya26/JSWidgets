const video = document.getElementById('video')
const play = document.getElementById('play')
const stops = document.getElementById('stop')
const progress = document.getElementById('progress')
const timeStamp = document.getElementById('timeStamp')

//play and pause
function toggleVideoStatus(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

//play/pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fas fa-play "></i>'
    }else{
        play.innerHTML = '<i class="fas fa-pause "></i>'
    }
}
//update progress and timestamo
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100

      //mins
      let mins = Math.floor(video.currentTime / 60)
      if(mins < 10)
         { mins = '0' + String(mins)}
      
      //seconds
      let secs = Math.floor(video.currentTime % 60)
      if(secs < 10)
       {   secs = '0' + String(secs)}
  
      timeStamp.innerHTML = `${mins}:${secs}`
    
}

//video time to progress
function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration) / 100
  
}
//stop vidoe
function stopVideo(){
    video.currentTime =  0
    video.pause()
}

video.addEventListener('click',toggleVideoStatus)
video.addEventListener('pause',updatePlayIcon)
video.addEventListener('play',updatePlayIcon)
video.addEventListener('timeupdate',updateProgress)

play.addEventListener('click',toggleVideoStatus)
progress.addEventListener('change', setVideoProgress)
stops.addEventListener('click',stopVideo)
