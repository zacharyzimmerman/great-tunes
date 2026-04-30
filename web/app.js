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
    id: "lida-rose",
    title: "Lida Rose",
    composer: "Meredith Willson",
    year: 1957,
    category: "classic",
    tags: ["classic", "show-tune", "contest"],
    notes: "From 'The Music Man,' this is perhaps the most iconic barbershop moment in musical theater. The quartet sings it as a serenade, and it has become a staple of barbershop repertoire worldwide. Beautiful melodic lines that sit perfectly in four-part harmony."
  },
  {
    id: "heart-of-my-heart",
    title: "Heart of My Heart",
    composer: "Ben Ryan",
    year: 1926,
    category: "classic",
    tags: ["classic", "ballad", "standard"],
    notes: "A nostalgic favorite that evokes the golden age of barbershop. The simple, singable melody and sentimental lyrics make it a natural fit for four-part harmony. Nearly every barbershop singer knows this one."
  },
  {
    id: "hello-mary-lou",
    title: "Hello Mary Lou",
    composer: "Gene Pitney",
    year: 1961,
    category: "uptune",
    tags: ["uptune", "rock-era", "crowd-pleaser"],
    notes: "Originally a hit for Ricky Nelson, this uptune has been adopted by barbershop quartets for its infectious energy and singable melody. A guaranteed crowd-pleaser at any afterglow."
  },
  {
    id: "wait-till-the-sun-shines-nellie",
    title: "Wait Till the Sun Shines, Nellie",
    composer: "Harry Von Tilzer",
    year: 1905,
    category: "uptune",
    tags: ["uptune", "classic", "tin-pan-alley"],
    notes: "A Tin Pan Alley gem that has been a barbershop standard for over a century. The bright, optimistic melody practically begs for four-part harmony treatment. One of the earliest songs associated with the barbershop style."
  },
  {
    id: "my-wild-irish-rose",
    title: "My Wild Irish Rose",
    composer: "Chauncey Olcott",
    year: 1899,
    category: "ballad",
    tags: ["ballad", "classic", "irish"],
    notes: "A timeless Irish ballad that has been a barbershop staple since the earliest days of organized singing. The flowing melody and romantic lyrics create gorgeous harmonic opportunities, especially in the sustained phrases."
  },
  {
    id: "down-our-way",
    title: "Down Our Way",
    composer: "Traditional arr.",
    year: 1950,
    category: "classic",
    tags: ["classic", "contest", "standard"],
    notes: "A beloved contest classic in the barbershop repertoire. Known for its rich chord progressions and the way it showcases all four voice parts. Many championship quartets have performed this arrangement."
  },
  {
    id: "coney-island-baby",
    title: "Coney Island Baby",
    composer: "Les Groff",
    year: 1924,
    category: "classic",
    tags: ["classic", "standard", "closing-song"],
    notes: "One of the most beloved songs in all of barbershop. Traditionally used as a closing number, its tender melody and nostalgic lyrics create an emotional experience that resonates with audiences and singers alike."
  },
  {
    id: "youre-nobody-till-somebody-loves-you",
    title: "You're Nobody Till Somebody Loves You",
    composer: "Russ Morgan, Larry Stock, James Cavanaugh",
    year: 1944,
    category: "ballad",
    tags: ["ballad", "standard", "great-american-songbook"],
    notes: "A classic from the Great American Songbook that translates beautifully to barbershop. The message is universal, the melody is memorable, and the harmonic structure provides rich opportunities for four-part singing."
  },
  {
    id: "java-jive",
    title: "Java Jive",
    composer: "Milton Drake, Ben Oakland",
    year: 1940,
    category: "novelty",
    tags: ["uptune", "novelty", "fun"],
    notes: "A playful novelty number about the love of coffee. The rhythmic, bouncy melody and humorous lyrics make it a fantastic uptune for barbershop quartets looking to entertain. Always gets laughs and smiles."
  },
  {
    id: "carolina-in-the-morning",
    title: "Carolina in the Morning",
    composer: "Walter Donaldson, Gus Kahn",
    year: 1922,
    category: "uptune",
    tags: ["uptune", "classic", "tin-pan-alley"],
    notes: "A sunny, optimistic uptune from the Roaring Twenties that has become a barbershop perennial. The jaunty melody and cheerful lyrics make it a natural choice for quartet performances. Great energy builder in any set."
  },
  {
    id: "the-sunshine-of-your-smile",
    title: "The Sunshine of Your Smile",
    composer: "Lilian Ray, Leonard Cooke",
    year: 1913,
    category: "ballad",
    tags: ["ballad", "classic", "romantic"],
    notes: "An Edwardian ballad with a soaring melody that showcases the warmth of barbershop harmony. The sustained phrases and emotional arc make it a favorite for quartets who want to move their audience."
  },
  {
    id: "well-meet-again",
    title: "We'll Meet Again",
    composer: "Ross Parker, Hughie Charles",
    year: 1939,
    category: "classic",
    tags: ["classic", "wartime", "sentimental"],
    notes: "Made famous by Vera Lynn during WWII, this song carries deep emotional weight. The hopeful melody and bittersweet lyrics translate powerfully to barbershop harmony, creating an unforgettable performance moment."
  },
  {
    id: "danny-boy",
    title: "Danny Boy",
    composer: "Frederic Weatherly (melody: Londonderry Air)",
    year: 1913,
    category: "ballad",
    tags: ["ballad", "irish", "folk"],
    notes: "Perhaps the most famous Irish song ever written, and a stunning showcase for barbershop harmony. The wide melodic range and emotional dynamics allow quartets to demonstrate their full expressive capabilities."
  },
  {
    id: "shenandoah",
    title: "Shenandoah",
    composer: "Traditional",
    year: 1820,
    category: "ballad",
    tags: ["ballad", "folk", "americana"],
    notes: "An American folk classic with a haunting, wide-ranging melody. Barbershop arrangements of this song are known for their lush harmonies and the way the four voices weave together to create a rich tapestry of sound."
  },
  {
    id: "bright-was-the-night",
    title: "Bright Was the Night",
    composer: "Traditional arr.",
    year: 1960,
    category: "classic",
    tags: ["classic", "contest", "ballad"],
    notes: "A beloved contest ballad that has been performed by many championship quartets. Known for its beautiful chord changes and emotional depth. The arrangement showcases the best of what barbershop harmony can achieve."
  },
  {
    id: "if-i-loved-you",
    title: "If I Loved You",
    composer: "Richard Rodgers, Oscar Hammerstein II",
    year: 1945,
    category: "ballad",
    tags: ["ballad", "show-tune", "romantic"],
    notes: "From 'Carousel,' this Rodgers & Hammerstein masterpiece is one of the most beautiful ballads in the American songbook. The conditional lyric and sweeping melody create a deeply moving barbershop performance."
  },
  {
    id: "georgia-on-my-mind",
    title: "Georgia on My Mind",
    composer: "Hoagy Carmichael, Stuart Gorrell",
    year: 1930,
    category: "ballad",
    tags: ["ballad", "jazz", "standard"],
    notes: "A jazz-inflected ballad that brings a sophisticated harmonic palette to barbershop. The bluesy melody and heartfelt lyrics allow quartets to show off their interpretive skills and blend."
  },
  {
    id: "the-old-songs",
    title: "The Old Songs",
    composer: "David Pomeranz",
    year: 1981,
    category: "ballad",
    tags: ["ballad", "classic", "sentimental"],
    notes: "A modern classic that has become one of the most requested songs in barbershop. Its theme of music bringing people together resonates deeply with barbershop singers. A perfect closing number."
  },
  {
    id: "somebody-stole-my-gal",
    title: "Somebody Stole My Gal",
    composer: "Leo Wood",
    year: 1918,
    category: "uptune",
    tags: ["uptune", "classic", "dixieland"],
    notes: "A high-energy uptune that has been a barbershop favorite for decades. The driving rhythm and catchy melody make it impossible not to tap your feet. Quartets love it for its performance energy."
  },
  {
    id: "when-i-lost-you",
    title: "When I Lost You",
    composer: "Irving Berlin",
    year: 1912,
    category: "ballad",
    tags: ["ballad", "tin-pan-alley", "emotional"],
    notes: "Irving Berlin wrote this after the death of his first wife, and the raw emotion comes through in every note. The simple, heartfelt melody is perfectly suited to the intimate sound of a barbershop quartet."
  },
  {
    id: "side-by-side",
    title: "Side by Side",
    composer: "Harry Woods",
    year: 1927,
    category: "uptune",
    tags: ["uptune", "standard", "crowd-pleaser"],
    notes: "An irresistibly cheerful uptune about friendship and togetherness. The bouncy melody and positive lyrics make it a natural fit for barbershop, and audiences always sing along."
  },
  {
    id: "under-the-boardwalk",
    title: "Under the Boardwalk",
    composer: "Kenny Young, Arthur Resnick",
    year: 1964,
    category: "uptune",
    tags: ["uptune", "doo-wop", "summer"],
    notes: "Originally by The Drifters, this song bridges the gap between doo-wop and barbershop perfectly. The laid-back groove and memorable melody have made it a modern barbershop favorite."
  },
  {
    id: "bye-bye-blues",
    title: "Bye Bye Blues",
    composer: "Fred Hamm, Dave Bennett, Bert Lown, Chauncey Gray",
    year: 1930,
    category: "uptune",
    tags: ["uptune", "jazz", "swing"],
    notes: "A swinging uptune that brings jazz energy to barbershop. The upbeat tempo and catchy melody make it a perfect opener or set energizer. Great for quartets who like to add some jazz flair to their performances."
  },
  {
    id: "sweet-adeline",
    title: "Sweet Adeline",
    composer: "Richard Gerard, Harry Armstrong",
    year: 1903,
    category: "classic",
    tags: ["classic", "foundational", "iconic"],
    notes: "THE quintessential barbershop song. So iconic that the women's barbershop organization is named after it. If there is one song that defines the barbershop style, this is it. Every barbershop singer should know it."
  },
  {
    id: "let-me-call-you-sweetheart",
    title: "Let Me Call You Sweetheart",
    composer: "Leo Friedman, Beth Slater Whitson",
    year: 1910,
    category: "classic",
    tags: ["classic", "ballad", "waltz"],
    notes: "A waltz-time classic that has been a barbershop standard for over a century. The gentle, swaying melody and romantic lyrics create beautiful harmonic moments. One of the most universally known barbershop songs."
  },
  {
    id: "after-youve-gone",
    title: "After You've Gone",
    composer: "Turner Layton, Henry Creamer",
    year: 1918,
    category: "uptune",
    tags: ["uptune", "jazz", "standard"],
    notes: "A jazz-age standard with a driving melody that translates wonderfully to barbershop. The rhythmic energy and harmonic sophistication make it a favorite for quartets who want to show off their chops."
  },
  {
    id: "aint-misbehavin",
    title: "Ain't Misbehavin'",
    composer: "Fats Waller, Harry Brooks, Andy Razaf",
    year: 1929,
    category: "uptune",
    tags: ["uptune", "jazz", "swing"],
    notes: "Fats Waller's signature tune brings irresistible swing to barbershop. The playful melody and cheeky lyrics are a perfect match for quartets who like to entertain. A jazz standard that feels right at home in four-part harmony."
  },
  {
    id: "alexanders-ragtime-band",
    title: "Alexander's Ragtime Band",
    composer: "Irving Berlin",
    year: 1911,
    category: "uptune",
    tags: ["uptune", "classic", "ragtime"],
    notes: "Irving Berlin's breakthrough hit that helped launch the ragtime craze. The infectious energy and call-and-response structure make it a natural for barbershop performance. A timeless crowd-pleaser."
  },
  {
    id: "blue-moon",
    title: "Blue Moon",
    composer: "Richard Rodgers, Lorenz Hart",
    year: 1934,
    category: "ballad",
    tags: ["ballad", "jazz", "standard"],
    notes: "One of the most covered songs in history, and for good reason. The dreamy melody and classic chord progression create a perfect vehicle for barbershop harmony. The doo-wop connection makes it even more natural for the style."
  },
  {
    id: "for-me-and-my-gal",
    title: "For Me and My Gal",
    composer: "George W. Meyer, Edgar Leslie, E. Ray Goetz",
    year: 1917,
    category: "uptune",
    tags: ["uptune", "classic", "tin-pan-alley"],
    notes: "A WWI-era classic that remains one of the most performed songs in barbershop. The march-like rhythm and patriotic spirit make it an energetic and uplifting performance piece."
  },
  {
    id: "im-sitting-on-top-of-the-world",
    title: "I'm Sitting on Top of the World",
    composer: "Ray Henderson, Sam Lewis, Joe Young",
    year: 1925,
    category: "uptune",
    tags: ["uptune", "jazz", "crowd-pleaser"],
    notes: "Pure optimism in song form. The buoyant melody and carefree lyrics make this one of the most uplifting uptunes in the barbershop repertoire. Audiences can not help but smile when a quartet nails this one."
  },
  {
    id: "it-had-to-be-you",
    title: "It Had to Be You",
    composer: "Isham Jones, Gus Kahn",
    year: 1924,
    category: "ballad",
    tags: ["ballad", "jazz", "romantic"],
    notes: "A timeless romantic standard that has been covered by everyone from Frank Sinatra to Harry Connick Jr. The sophisticated melody and clever lyrics make it a perfect barbershop ballad for quartets with a jazzy sensibility."
  },
  {
    id: "lazy-river",
    title: "Lazy River",
    composer: "Hoagy Carmichael, Sidney Arodin",
    year: 1931,
    category: "uptune",
    tags: ["uptune", "jazz", "relaxed"],
    notes: "Hoagy Carmichael's easygoing ode to leisure. The lazy, rolling melody and carefree vibe translate beautifully to barbershop. A great change of pace in any set list."
  },
  {
    id: "moonlight-bay",
    title: "Moonlight Bay",
    composer: "Percy Wenrich, Edward Madden",
    year: 1912,
    category: "uptune",
    tags: ["uptune", "classic", "singalong"],
    notes: "One of the most recognizable barbershop songs ever written. The gentle, swaying melody evokes summer evenings by the water. Nearly every barbershop singer can jump in on this one from memory."
  },
  {
    id: "paper-moon",
    title: "It's Only a Paper Moon",
    composer: "Harold Arlen, Yip Harburg, Billy Rose",
    year: 1933,
    category: "uptune",
    tags: ["uptune", "jazz", "standard"],
    notes: "A charming, philosophical little song about love making everything seem real. The jazzy melody and whimsical lyrics are a perfect match for barbershop quartets who enjoy sophisticated material."
  },
  {
    id: "story-of-the-rose",
    title: "Story of the Rose (Heart of My Heart)",
    composer: "Andrew Mack, Alice Tigh",
    year: 1899,
    category: "classic",
    tags: ["classic", "ballad", "victorian"],
    notes: "Not to be confused with the better-known 'Heart of My Heart,' this Victorian ballad is a barbershop classic in its own right. The ornate melody and sentimental lyrics are quintessentially barbershop."
  }
];

let activeSongId = null;

// -- Rendering ----------------------------
function getFilteredSongs() {
  const query = $("#search").value.toLowerCase().trim();
  const categoryFilter = $("#category-filter").value;

  return songs.filter((s) => {
    if (categoryFilter && s.category !== categoryFilter) return false;
    if (query) {
      const haystack = [
        s.title,
        s.composer,
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
    const parts = [song.composer];
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
  composerEl.textContent = song.composer;

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
