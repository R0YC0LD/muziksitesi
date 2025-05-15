
let player;
let playerReady = false;

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
    events: {
      'onReady': () => {
        playerReady = true;
      }
    }
  });
}

function playVideo(videoId) {
  if (playerReady && player && typeof player.loadVideoById === "function") {
    player.loadVideoById(videoId);
  } else {
    const interval = setInterval(() => {
      if (playerReady && player && typeof player.loadVideoById === "function") {
        clearInterval(interval);
        player.loadVideoById(videoId);
      }
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const musicList = document.getElementById("musicList");
  const songs = musicList.getElementsByTagName("li");

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      Array.from(songs).forEach(function (song) {
        const title = song.querySelector(".song-title").textContent.toLowerCase();
        song.style.display = title.includes(filter) ? "" : "none";
      });
    });
  }
});
