
const API_KEY = "AIzaSyCrC4r9P2xZOZGqyjw72hyuJFDlNYK2GO8";
let currentVideoId = null;

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

async function searchAndPlaySong(query) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${API_KEY}`
    );
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      currentVideoId = videoId;
      playInvisibleAudio(videoId);
    } else {
      alert("Şarkı bulunamadı.");
    }
  } catch (error) {
    console.error("Arama hatası:", error);
    alert("Şarkı aranırken bir hata oluştu.");
  }
}

function playInvisibleAudio(videoId) {
  const hiddenPlayer = document.getElementById("hiddenPlayer");
  hiddenPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

document.addEventListener("DOMContentLoaded", () => {
  checkLogin();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const song = this.value;
        searchAndPlaySong(song);
      }
    });
  }
});
