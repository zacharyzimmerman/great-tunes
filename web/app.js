// Great Tunes â€” Curated Barbershop Song Browser

const $ = GreatApp.$;

// -- Sort options -------------------------
const sortFns = {
  year:    (a, b) => a.year - b.year || a.title.localeCompare(b.title),
  title:   (a, b) => a.title.localeCompare(b.title),
  quartet: (a, b) => a.quartet.localeCompare(b.quartet) || a.year - b.year,
  rank:    (a, b) => a.rank - b.rank || a.year - b.year,
};

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function rankClass(n) {
  if (n === 1) return "rank-gold";
  if (n === 2) return "rank-silver";
  if (n <= 5) return "rank-bronze";
  return "";
}

// -- Song Data ----------------------------
const songs = [
  { id: "side-by-side", title: "Side By Side", quartet: "Air Fours", year: 1955, rank: 4, audioUrl: "audio/side-by-side.mp3" },
  { id: "bye-bye-blues", title: "Bye Bye Blues", quartet: "GayNotes", year: 1957, rank: 3, audioUrl: "audio/bye-bye-blues.mp3" },
  { id: "ro-ro-rolling", title: "Ro-Ro-Rolling", quartet: "Lads Of Enchantment", year: 1957, rank: 1, audioUrl: "audio/ro-ro-rolling.mp3" },
  { id: "aint-she-sweet", title: "Ain't She Sweet", quartet: "Saints", year: 1960, rank: 5, audioUrl: "audio/aint-she-sweet.mp3" },
  { id: "them-there-eyes", title: "Them There Eyes", quartet: "Four-Do-Matics", year: 1963, rank: 7, audioUrl: "audio/them-there-eyes.mp3" },
  { id: "for-me-and-my-gal", title: "For Me And My Gal", quartet: "Sidewinders", year: 1963, rank: 3, audioUrl: "audio/for-me-and-my-gal.mp3" },
  { id: "back-in-those-days-gone-by", title: "Back In Those Days Gone By", quartet: "Golden Staters", year: 1966, rank: 4, audioUrl: "audio/back-in-those-days-gone-by.mp3" },
  { id: "sing-me-a-baby-song", title: "Sing Me A Baby Song", quartet: "Sundowners", year: 1967, rank: 4, audioUrl: "audio/sing-me-a-baby-song.mp3" },
  { id: "when-you-were-a-baby-and-i-was-the-kid-next-door", title: "When You Were A Baby And I Was The Kid Next Door", quartet: "Avant Garde", year: 1968, rank: 5, audioUrl: "audio/when-you-were-a-baby-and-i-was-the-kid-next-door.mp3" },
  { id: "mary-youre-a-little-bit-old-fashioned", title: "Mary You're A Little Bit Old Fashioned", quartet: "Golden Staters", year: 1968, rank: 3, audioUrl: "audio/mary-youre-a-little-bit-old-fashioned.mp3" },
  { id: "them-was-the-good-old-days", title: "Them Was The Good Old Days", quartet: "Sundowners", year: 1969, rank: 3, audioUrl: "audio/them-was-the-good-old-days.mp3" },
];

let activeSongId = null;

// -- Rendering ----------------------------
function getFilteredSongs() {
  const query = $("#search").value.toLowerCase().trim();
  const quartetFilter = $("#quartet-filter").value;
  const sortKey = $("#sort-by").value;

  const filtered = songs.filter((s) => {
    if (quartetFilter && s.quartet !== quartetFilter) return false;
    if (query) {
      const haystack = [s.title, s.quartet, String(s.year)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    }
    return true;
  });

  return filtered.sort(sortFns[sortKey] || sortFns.year);
}

function renderSongList(filtered) {
  const container = $("#song-list");
  container.innerHTML = "";

  for (const song of filtered) {
    const row = document.createElement("div");
    row.className = "item-row";
    row.dataset.id = song.id;

    // Year badge
    const year = document.createElement("div");
    year.className = "year-badge";
    year.textContent = song.year;
    row.appendChild(year);

    // Info
    const info = document.createElement("div");
    info.className = "item-info";

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = song.title;
    info.appendChild(title);

    const sub = document.createElement("span");
    sub.className = "item-sub";
    const rank = document.createElement("span");
    rank.className = "rank-text " + rankClass(song.rank);
    rank.textContent = ordinal(song.rank);
    sub.appendChild(rank);
    const quartetText = document.createElement("span");
    quartetText.textContent = " · " + song.quartet;
    sub.appendChild(quartetText);
    info.appendChild(sub);

    row.appendChild(info);

    // Play button (from framework)
    if (song.audioUrl) {
      row.appendChild(GreatApp.createPlayButton(song.id, song.audioUrl));
    }

    row.addEventListener("click", () => selectSong(song.id));
    container.appendChild(row);
  }

  $("#song-count").textContent = `${filtered.length} tune${filtered.length !== 1 ? "s" : ""}`;
}

function refreshList() {
  renderSongList(getFilteredSongs());
}

// -- Navigation ---------------------------
function selectSong(id, { pushHistory = true, autoPlay = false } = {}) {
  activeSongId = id;
  const song = songs.find((s) => s.id === id);
  if (!song) return;

  if (pushHistory) {
    history.pushState({ songId: id }, "", "#" + id);
  }

  // Populate detail view
  $("#song-title").textContent = song.title;
  $("#song-quartet").textContent = song.quartet;
  $("#song-year").textContent = song.year ? String(song.year) : "";
  const rankEl = $("#song-rank");
  rankEl.textContent = ordinal(song.rank) + " place";
  rankEl.className = "pill-accent " + rankClass(song.rank);

  // Audio player
  const audioSection = $("#audio-section");
  const audioPlayer = $("#audio-player");
  if (song.audioUrl) {
    audioPlayer.src = song.audioUrl;
    audioSection.hidden = false;
    if (autoPlay) audioPlayer.play();
  } else {
    audioPlayer.removeAttribute("src");
    audioPlayer.load();
    audioSection.hidden = true;
  }

  // Auto-play next from detail view
  audioPlayer.onended = () => {
    const list = getFilteredSongs();
    const idx = list.findIndex((s) => s.id === id);
    const next = list[idx + 1];
    if (next) selectSong(next.id, { autoPlay: true });
  };

  GreatApp.showView("#detail-view");
}

function showListView() {
  // Pause detail audio player when leaving detail view
  const audioPlayer = $("#audio-player");
  if (audioPlayer && !audioPlayer.paused) {
    audioPlayer.pause();
  }

  activeSongId = null;
  GreatApp.showView("#list-view");
  refreshList();
}

// -- Service Worker -----------------------
GreatApp.registerSW("sw.js");

// -- Auto-play next tune ------------------
let lastListPlayingId = null;
GreatApp.listAudio.addEventListener("play", () => {
  lastListPlayingId = GreatApp.listPlayingId;
});
GreatApp.listAudio.addEventListener("ended", () => {
  const currentId = lastListPlayingId;
  if (!currentId) return;
  const list = getFilteredSongs();
  const idx = list.findIndex((s) => s.id === currentId);
  const next = list[idx + 1];
  if (next && next.audioUrl) {
    GreatApp.togglePlay(next.id, next.audioUrl);
  }
});

// -- Init ---------------------------------
function init() {
  refreshList();

  $("#search").addEventListener("input", refreshList);
  $("#quartet-filter").addEventListener("change", refreshList);
  $("#sort-by").addEventListener("change", refreshList);
  $("#back-btn").addEventListener("click", () => history.back());

  // Search toggle (framework helper)
  GreatApp.initSearchToggle("#search-toggle", "#search-bar", "#search");

  // Keyboard shortcuts (framework helper)
  GreatApp.initKeyboard({ searchSel: "#search", detailViewSel: "#detail-view" });

  // Browser back/forward
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.songId) {
      selectSong(e.state.songId, { pushHistory: false });
    } else {
      showListView();
    }
  });

  // Deep link from URL hash
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    if (songs.find((s) => s.id === id)) {
      selectSong(id, { pushHistory: false });
      history.replaceState({ songId: id }, "", "#" + id);
    }
  }
}

init();
