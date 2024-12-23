albums = [
    { "artist": "abriction", "title": "Banshee", "genres": "Blackgaze / Electronicore", "spotify": "https://open.spotify.com/album/2YVc2mTKtA1OzGa67Mf2Q9", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_krkhhTmaGvNBpqvRLfpbQLz36LCMUIRo0", "apple": "https://music.apple.com/album/banshee/1730261287" },
    { "artist": "Amaro Freitas", "title": "Y'Y", "genres": "Post-Minimalism / Third Stream", "spotify": "https://open.spotify.com/album/6uau7dao159A94pxtGIoMj", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_kH3PNcSXGAjk0_iZfUS8CwsDP4h3XzpMc", "apple": "https://music.apple.com/album/yy/1715517603" },
    { "artist": "AURORA", "title": "What Happened to the Heart?", "genres": "Alt-Pop / Art Pop", "spotify": "https://open.spotify.com/album/6TVgUkZ0mlosNNcJYsgTeV", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_mxNRPmikSTxTaAySjEvpCEp6G3d6lDsOo", "apple": "https://music.apple.com/album/what-happened-to-the-heart/1738500759" },
    { "artist": "Beth Gibbons", "title": "Lives Outgrown", "genres": "Chamber Folk / Singer-Songwriter", "spotify": "https://open.spotify.com/album/0YC5MWwUmsTpJrRumtBdZA", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_n2hXsNjakwGfeALnT9ix5GWMqgc59U2Ok", "apple": "https://music.apple.com/album/lives-outgrown/1728144209" },
    { "artist": "Hélène Vogelsinger", "title": "Ethereal Dissolution", "genres": "Progressive Electronic", "spotify": "https://open.spotify.com/album/4G4VqlxsL1o2myqtTfhgHl", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_n0hjryApoBDntvHJMvHcCFrnTU3OIZOfQ", "apple": "https://music.apple.com/album/ethereal-dissolution/1755382672" },
    { "artist": "Irène Drésel", "title": "Rose Fluo", "genres": "Electronic / Minimal Techno", "spotify": "https://open.spotify.com/album/3bJCVLsrm2Vr0c7ZopVdm8", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_lcQkI9QXWvgtWaGz-AhwS3OAVskMq_qyg", "apple": "https://music.apple.com/album/rose-fluo/1716101912" },
    { "artist": "Justice", "title": "Hyperdrama", "genres": "French Electro / Synthwave", "spotify": "https://open.spotify.com/album/6ooBxhsOVedpX4zPTCyL86", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_kg7hY36Mn-AesdoHUMjx_PtF-YWM17tHc", "apple": "https://music.apple.com/album/hyperdrama/1724935208" },
    { "artist": "Manu Delago", "title": "Snow From Yesterday", "genres": "Art Pop / Ambient Pop", "spotify": "https://open.spotify.com/album/2hr3rjYZADa18xKrxP8NK1", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_k2HknJDiccb4mOIQDfKn8l6aXsqPveA2s", "apple": "https://music.apple.com/album/snow-from-yesterday-feat-mad-about-lemon/1710811091" },
    { "artist": "MEUTE", "title": "Empor", "genres": "Progressive House / Marching Band", "spotify": "https://open.spotify.com/album/2SFhSsts2lgdhN5e6AzTKW", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_lxvpIMS1HP2ZgNqvh8TuZZyvPjklVZfoM", "apple": "https://music.apple.com/album/empor/1709190472" },
    { "artist": "The Cure", "title": "Songs of a Lost World", "genres": "Gothic Rock / Alternative Rock", "spotify": "https://open.spotify.com/album/4wjxmqXnSQvBZWL3IbYngX", "youtube": "https://music.youtube.com/playlist?list=OLAK5uy_n7eTmrI03h2nSoSVAzmgc67OejkmvEn1M", "apple": "https://music.apple.com/album/songs-of-a-lost-world/1768728131" }
];

function getCover(artist, title) {
    return (artist + title)
        .toLowerCase() // Minuscule
        .normalize("NFD") // Décompose les caractères accentués
        .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
        .replace(/[^a-z0-9]/g, ""); // Supprime les caractères spéciaux
}

function addAlbum(album) {

    var clone = document.getElementById('album-prototype').cloneNode(true);
    clone.removeAttribute('id');

    var coverElement = clone.querySelector('.cover');
    coverElement.src = `./img/covers/${getCover(album.artist, album.title)}.webp`;
    coverElement.alt = `${album.artist} - ${album.title}`;

    clone.querySelector('.artist').textContent = album.artist;
    clone.querySelector('.title').textContent = album.title;
    clone.querySelector('.genres').innerHTML = album.genres.replaceAll("/","<br/>");

    var streamingLinks = clone.querySelectorAll('.streaming a');
    streamingLinks[0].href = album.spotify;
    streamingLinks[1].href = album.youtube;
    streamingLinks[2].href = album.apple;

    var streamingLinks = clone.querySelectorAll('.streaming img');
    streamingLinks[0].alt = `Écouter ${album.title} de ${album.artist} sur Spotify`;
    streamingLinks[1].alt = `Écouter ${album.title} de ${album.artist} sur Youtube Music`;
    streamingLinks[2].alt = `Écouter ${album.title} de ${album.artist} sur Apple Music`;

    document.getElementById("albums-container").appendChild(clone);
}

albums.forEach(album => addAlbum(album));
document.getElementById('album-prototype').remove();

const isHoverSupported = window.matchMedia('(hover: hover)').matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

const nodes = document.querySelectorAll('.album');
const [eventType, eventHandler] = isHoverSupported ? ['mouseenter', handleHover] : ['click', handleClick];

function handleHover(event) {
    event.target.classList.add('active');
}

function handleHoverExit(event) {
    event.target.classList.remove('active');
}

function handleClick(event) {
    const clickedAlbum = event.currentTarget;
    nodes.forEach(album => album !== clickedAlbum && album.classList.remove('active'));
    clickedAlbum.classList.toggle('active');
}

nodes.forEach(album => {
    album.addEventListener(eventType, eventHandler);
    album.addEventListener('mouseleave', handleHoverExit);
});