// Great Tunes — Curated Barbershop Song Browser

const $ = (sel) => document.querySelector(sel);

// -- Sort options -------------------------
const sortFns = {
  year:    (a, b) => a.year - b.year || a.title.localeCompare(b.title),
  title:   (a, b) => a.title.localeCompare(b.title),
  quartet: (a, b) => a.quartet.localeCompare(b.quartet) || a.year - b.year,
};

// -- Song Data ----------------------------
const songs = [
  { id: "side-by-side", title: "Side By Side", quartet: "Air Fours", year: 1955 },
  { id: "bye-bye-blues", title: "Bye Bye Blues", quartet: "GayNotes", year: 1957 },
  { id: "ro-ro-rolling", title: "Ro-Ro-Rolling", quartet: "Lads Of Enchantment", year: 1957 },
  { id: "aint-she-sweet", title: "Ain't She Sweet", quartet: "Saints", year: 1960 },
  { id: "them-there-eyes", title: "Them There Eyes", quartet: "Four-Do-Matics", year: 1960 },
  { id: "for-me-and-my-gal", title: "For Me And My Gal", quartet: "Sidewinders", year: 1963 },
  { id: "back-in-those-days-gone-by", title: "Back In Those Days Gone By", quartet: "Golden Staters", year: 1966 },
  { id: "sing-me-a-baby-song", title: "Sing Me A Baby Song", quartet: "Sundowners", year: 1967 },
  { id: "when-you-were-a-baby-and-i-was-the-kid-next-door", title: "When You Were A Baby And I Was The Kid Next Door", quartet: "Avant Garde", year: 1968 },
  { id: "mary-youre-a-little-bit-old-fashioned", title: "Mary You're A Little Bit Old Fashioned", quartet: "Golden Staters", year: 1968 },
  { id: "them-was-the-good-old-days", title: "Them Was The Good Old Days", quartet: "Sundowners", year: 1969 },
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
    row.className = "song-row";
    row.dataset.id = song.id;

    // Year badge
    const year = document.createElement("div");
    year.className = "song-year-badge";
    year.textContent = song.year;
    row.appendChild(year);

    // Info
    const info = document.createElement("div");
    info.className = "song-info";

    const title = document.createElement("span");
    title.className = "song-title";
    title.textContent = song.title;
    info.appendChild(title);

    const sub = document.createElement("span");
    sub.className = "song-sub";
    sub.textContent = song.quartet;
    info.appendChild(sub);

    row.appendChild(info);

    row.addEventListener("click", () => selectSong(song.id));
    container.appendChild(row);
  }

  $("#song-count").textContent = `${filtered.length} tune${filtered.length !== 1 ? "s" : ""}`;
}

function refreshList() {
  renderSongList(getFilteredSongs());
}

// -- Navigation ---------------------------
function showDetailView() {
  $("#list-view").hidden = true;
  $("#detail-view").hidden = false;
}

function showListView() {
  activeSongId = null;
  $("#detail-view").hidden = true;
  $("#list-view").hidden = false;
  refreshList();
}

function selectSong(id, { pushHistory = true } = {}) {
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

  showDetailView();
}

// -- Keyboard Navigation ------------------
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement !== $("#search"))) {
    e.preventDefault();
    const searchBar = $("#search-bar");
    if (searchBar.hidden) searchBar.hidden = false;
    $("#search").focus();
    $("#search").select();
    return;
  }

  if (e.key === "Escape" && !$("#detail-view").hidden) {
    history.back();
  }
});

// -- Unregister old service workers -------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const r of regs) r.unregister();
  });
}

// -- Init ---------------------------------
function init() {
  refreshList();

  $("#search").addEventListener("input", refreshList);
  $("#quartet-filter").addEventListener("change", refreshList);
  $("#sort-by").addEventListener("change", refreshList);
  $("#back-btn").addEventListener("click", () => history.back());

  // Search toggle
  $("#search-toggle").addEventListener("click", () => {
    const bar = $("#search-bar");
    bar.hidden = !bar.hidden;
    if (!bar.hidden) {
      $("#search").focus();
    }
  });

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
