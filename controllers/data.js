const mjson = [
    {   "id":"0",
        "nome":"Stairway To Heaven",
        "artista":"Led Zepelin",
        "album":"",
        "url":"audios/stairway-to-heaven.mp3",
        "img":"imagens/stairway.jpg"
    },
    {   "id":"1",
        "nome":"Relógio",
        "artista":"Gustavo Mioto",
        "album":"",
        "url":"audios/Relogio.mp3",
        "img":"imagens/relogio.jpg"
    },
    {   "id":"2",
        "artista":"Henrique e Juliano",
        "nome":"Metade Da Estrada",
        "album":"",
        "url":"audios/metade-da-estrada.mp3",
        "img":"imagens/metade.jpg"
    },
    {   "id":"3",
        "nome":"Era Uma Vez",
        "artista":"Kell Smith",
        "album":"",
        "url":"audios/era-uma-vez.mp3",
        "img":"imagens/era-uma-vez.jpg"
    },
    {   "id":"4",
        "nome":"Dancing With a Stranger",
        "artista":"Sam Smith",
        "album":"",
        "url":"audios/Dancing.mp3",
        "img":"imagens/stranger.jpg"
    },
    {
        "id":"5",
        "nome":"Trem Bala",
        "artista":"Ana Vilela",
        "album":"",
        "url":"audios/trem-bala.mp3",
        "img":"imagens/trem-bala.jpg"
    },
    {
        "id":"6",
        "nome":"Um Milhão de Vezes",
        "artista":"Rafinha Acústico",
        "album":"",
        "url":"audios/um-milhao-de-vezes.mp3",
        "img":"imagens/um-milhao-de-vezes.jpg"
    }
];

let playlistsData = [];

function fetchMusicas(){
    return mjson;    
}

function fetchPlaylistsData(){
    Object.keys(localStorage).map(item => playlistsData.push(JSON.parse(localStorage.getItem(item))));    
    return playlistsData;
}