// Great Tunes — Curated Barbershop Song Browser

const $ = (sel) => document.querySelector(sel);

// -- Category icons (emoji shorthand) -----
const categoryIcons = {
  uptune: "\u{1F3B5}",
  ballad: "\u{1F3B6}",
  classic: "\u{2B50}",
  jazz: "\u{1F3B7}",
  novelty: "\u{1F389}",
  folk: "\u{1F33F}",
};

// -- Song Data ----------------------------
const songs = [
  {
    id: "side-by-side",
    title: "Side By Side",
    quartet: "Air Fours",
    year: 1955,
    category: "uptune",
    tags: ["uptune", "classic", "crowd-pleaser"],
    notes: ""
  },
  {
    id: "bye-bye-blues",
    title: "Bye Bye Blues",
    quartet: "GayNotes",
    year: 1957,
    category: "uptune",
    tags: ["uptune", "contest", "crowd-pleaser"],
    notes: ""
  },
  {
    id: "ro-ro-rolling",
    title: "Ro-Ro-Rolling",
    quartet: "Lads Of Enchantment",
    year: 1957,
    category: "novelty",
    tags: ["novelty", "uptune", "crowd-pleaser"],
    notes: ""
  },
  {
    id: "aint-she-sweet",
    title: "Ain't She Sweet",
    quartet: "Saints",
    year: 1960,
    category: "uptune",
    tags: ["uptune", "classic", "standard"],
    notes: ""
  },
  {
    id: "them-there-eyes",
    title: "Them There Eyes",
    quartet: "Four-Do-Matics",
    year: 1960,
    category: "jazz",
    tags: ["uptune", "jazz", "standard"],
    notes: ""
  },
  {
    id: "for-me-and-my-gal",
    title: "For Me And My Gal",
    quartet: "Sidewinders",
    year: 1963,
    category: "uptune",
    tags: ["uptune", "classic", "contest"],
    notes: ""
  },
  {
    id: "back-in-those-days-gone-by",
    title: "Back In Those Days Gone By",
    quartet: "Golden Staters",
    year: 1966,
    category: "ballad",
    tags: ["ballad", "classic", "contest"],
    notes: ""
  },
  {
    id: "sing-me-a-baby-song",
    title: "Sing Me A Baby Song",
    quartet: "Sundowners",
    year: 1967,
    category: "novelty",
    tags: ["novelty", "uptune", "crowd-pleaser"],
    notes: ""
  },
  {
    id: "when-you-were-a-baby-and-i-was-the-kid-next-door",
    title: "When You Were A Baby And I Was The Kid Next Door",
    quartet: "Avant Garde",
    year: 1968,
    category: "ballad",
    tags: ["ballad", "classic", "contest"],
    notes: ""
  },
  {
    id: "mary-youre-a-little-bit-old-fashioned",
    title: "Mary You're A Little Bit Old Fashioned",
    quartet: "Golden Staters",
    year: 1968,
    category: "classic",
    tags: ["classic", "ballad", "standard"],
    notes: ""
  },
  {
    id: "them-was-the-good-old-days",
    title: "Them Was The Good Old Days",
    quartet: "Sundowners",
    year: 1969,
    category: "classic",
    tags: ["classic", "uptune", "crowd-pleaser"],
    notes: ""
  },
];

let activeSongId = null;

// -- Rendering ----------------------------
function getFilteredSongs() {
  const query = $("#search").value.toLowerCase().trim();
  const categoryFilter = $("#category-filter").value;
  const quartetFilter = $("#quartet-filter").value;

  return songs.filter((s) => {
    if (categoryFilter && s.category !== categoryFilter) return false;
    if (quartetFilter && s.quartet !== quartetFilter) return false;
    if (query) {
      const haystack = [
        s.title,
        s.quartet,
        s.category,
        ...s.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    }
    return true;
  });
}

function renderSongList(filtered) {
  const container = $("#song-list");
  container.innerHTML = "";

  for (const song of filtered) {
    const row = document.createElement("div");
    row.className = "song-row";
    row.dataset.id = song.id;

    // Icon
    const icon = document.createElement("div");
    icon.className = "song-icon";
    icon.textContent = categoryIcons[song.category] || categoryIcons.classic;
    row.appendChild(icon);

    // Info
    const info = document.createElement("div");
    info.className = "song-info";

    const titleRow = document.createElement("div");
    titleRow.className = "song-title-row";

    const title = document.createElement("span");
    title.className = "song-title";
    title.textContent = song.title;
    titleRow.appendChild(title);

    info.appendChild(titleRow);

    const sub = document.createElement("span");
    sub.className = "song-sub";
    const parts = [song.quartet];
    if (song.year) parts.push(song.year);
    sub.textContent = parts.join(" \u00B7 ");
    info.appendChild(sub);

    row.appendChild(info);

    // Category pill
    const pill = document.createElement("span");
    pill.className = "song-category-pill";
    pill.dataset.category = song.category;
    pill.textContent = song.category;
    row.appendChild(pill);

    row.addEventListener("click", () => selectSong(song.id));
    container.appendChild(row);
  }

  $("#song-count").textContent = `${filtered.length} song${filtered.length !== 1 ? "s" : ""}`;
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
  $("#song-category").textContent = song.category;

  const composerEl = $("#song-composer");
  composerEl.textContent = song.quartet;

  const yearEl = $("#song-year");
  yearEl.textContent = song.year ? String(song.year) : "";

  // Tags
  const tagsContainer = $("#song-tags");
  tagsContainer.innerHTML = "";
  for (const tag of song.tags) {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = tag;
    tagsContainer.appendChild(pill);
  }

  // Notes
  const notesSection = $("#notes-section");
  const notesEl = $("#song-notes");
  if (song.notes) {
    notesEl.textContent = song.notes;
    notesSection.hidden = false;
  } else {
    notesSection.hidden = true;
  }

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
  songs.sort((a, b) => a.title.localeCompare(b.title));
  refreshList();

  $("#search").addEventListener("input", refreshList);
  $("#category-filter").addEventListener("change", refreshList);
  $("#quartet-filter").addEventListener("change", refreshList);
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
