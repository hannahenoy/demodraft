// profile photo
let trash = document.getElementsByClassName("fa fa-pencil");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    fetch('trash', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': element.id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// music player
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs =
[
  'One Two By Sister Nancy',
  'Beautiful Girls by Sean Kingston',
  'Come and Get Your Love by Redbone',
  'Electric Slide by by Marcia Griffiths',
  'Good Kisser by Lake Street Drive',
  'Candy Rain by Soul 4 Real',
  'Coming Home by Leon Bridges',
  'Here And Now by Luther Vandross',
  'Hold On, We\'re Going Home by Drake',
  'Juicy by Notorious B.I.G',
  'Strictly Reserved for You by Charles Bradley',
  'Tennessee Whiskey by Chris Stapleton',
  'This Will Be (An Everlasting Love) by Natalie Cole',
  'Valerie by Amy Winehouse ft. Mark Ronson',
  'Walking On Sunshine by by Katrina And The Waves',
  'You And I by Stevie Wonder'
];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  console.log(song)
  title.innerText = `Alexa, play ${song}`;
  audio.src = `/public/music/${song}.mp3`;
  cover.src = `/public/images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);


// countdown
dayjs.extend(dayjs_plugin_duration);

function activateCountdown(date) {
  const targetDate = dayjs(date);

  document.getElementById("myCountdown").querySelector(".until__event").textContent = `Counting down until ${ targetDate.format("YYYY MM DD")}`;

  setInterval(() => {
    const now = dayjs();
    const duration = dayjs.duration(targetDate.diff(now));

    if (duration.asMilliseconds() <= 0) return;

    document.getElementById("myCountdown").querySelector(".until__numeric--seconds").textContent = duration.seconds().toString().padStart(2, "0");
    document.getElementById("myCountdown").querySelector(".until__numeric--minutes").textContent = duration.minutes().toString().padStart(2, "0");
    document.getElementById("myCountdown").querySelector(".until__numeric--hours").textContent = duration.hours().toString().padStart(2, "0");
    document.getElementById("myCountdown").querySelector(".until__numeric--days").textContent = duration.asDays().toFixed(0).toString().padStart(2, "0");
  }, 250);
}

document.querySelector("form")
  .addEventListener('submit', function(event) {
    event.preventDefault();
    activateCountdown(document.getElementById("input__time").value);
  })