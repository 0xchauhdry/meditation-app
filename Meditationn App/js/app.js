const app = () => {
    const song = document.querySelector('.song'),
        play = document.querySelector('.play'),
        outline = document.querySelector('.moving-outline circle'),
        video = document.querySelector('.vid-container video'),
        // sounds
        sounds = document.querySelectorAll('.sound-picker button'),
        // Time Display
        timeDisplay = document.querySelector('.time-display'),
        // Time select buttons
        timeSelect = document.querySelectorAll('.time-select button')
        // get the length of the outline
        outlineLen = outline.getTotalLength()
    // Duration
    let fakeDuration = 20

    outline.style.strokeDasharray = outlineLen
    outline.style.strokeDashoffset = outlineLen

    // Play Sound now
    play.addEventListener('click', ()=>{
        checkPlay(song)
    })

    // select time duration
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration= this.getAttribute('value')
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
        })
    })

    // Select song
    sounds.forEach(option => {
        option.addEventListener('click', function(){
            song.src=this.getAttribute('data-sound')
            video.src=this.getAttribute('data-video')
            checkPlay(song);
        })
    })

    // a function to stop and play the song
    const checkPlay = song =>{
        if (song.paused){
            song.play()
            video.play()
            play.src = "svg/pause.svg"
        }else {
            song.pause()
            video.pause()
            play.src = "svg/play.svg"
        }
    }

    //lets animate the circle
    song.ontimeupdate =() => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate circle
        let progress = outlineLen-(currentTime/fakeDuration)*outlineLen
        outline.style.strokeDashoffset = progress;
        // Animate the text
        timeDisplay.textContent= `${minutes}:${seconds}`

        if (currentTime >= fakeDuration){
            song.pause()
            song.currentTime = 0;
            play.src = 'svg/play.svg'
            video.pause()
        }
    }
}

app()