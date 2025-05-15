
let player;

function checkLogin() {
  const user = localStorage.getItem("username");
  if (!user) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '300',
    width: '500',
    videoId: '',
    playerVars: { autoplay: 1 },
  });
}

function playVideo(videoId) {
  if (player && player.loadVideoById) {
    player.loadVideoById(videoId);
  }
}

const searchInput = document.getElementById("searchInput");
const musicList = document.getElementById("musicList");
const songs = musicList.getElementsByTagName("li");

searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  Array.from(songs).forEach(function (song) {
    const title = song.querySelector(".song-title").textContent.toLowerCase();
    song.style.display = title.includes(filter) ? "" : "none";
  });
});
