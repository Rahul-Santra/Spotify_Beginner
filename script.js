console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressbar");
let mastersongname = document.getElementById("mastersongname");
let songitem = Array.from(document.getElementsByClassName("songitem"));

let songs = [
  {
    songname: "On My Way",
    filepath: "songs/1.mp3",
    coverpath: "covers/1.jpg",
  },
  {
    songname: "Doraemon",
    filepath: "songs/2.mp3",
    coverpath: "covers/2.jpg",
  },
  {
    songname: "Chale-Aana",
    filepath: "songs/3.mp3",
    coverpath: "covers/3.jpg",
  },
  {
    songname: "Saudebaazi",
    filepath: "songs/4.mp3",
    coverpath: "covers/4.jpg",
  },
  {
    songname: "Doraemon",
    filepath: "songs/5.mp3",
    coverpath: "covers/1.jpg",
  },
  {
    songname: "Chale-Aana",
    filepath: "songs/6.mp3",
    coverpath: "covers/2.jpg",
  },
];
songitem.forEach((element , i) => {
  // console.log(element);
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});

// audioelement.play();

//Handle play/pause clicks
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
  }
});
// Listen to events
audioElement.addEventListener("timeupdate", () => {
  //   console.log("timeupdate");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myprogressbar.value = progress;
});

myprogressbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressbar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songitemplay")).forEach(
    (element) => {
      element.classList.add("fa-play");
      element.classList.add("fa-pause");
    }
  );
};
Array.from(document.getElementsByClassName("songitemplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      mastersongname.innerText = songs[songIndex].songname;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  mastersongname.innerText = songs[songIndex].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  mastersongname.innerText = songs[songIndex].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
