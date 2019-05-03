const mjson = [
    {   "id":"0",
        "nome":"Stairway To Heaven",
        "artista":"Led Zepelin",
        "album":"Coletania Sondfy",
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
        "album":"Coletania Sondfy",
        "url":"audios/metade-da-estrada.mp3",
        "img":"imagens/metade.jpg"
    },
    {   "id":"3",
        "nome":"Era Uma Vez",
        "artista":"Kell Smith",
        "album":"Coletania Sondfy",
        "url":"audios/era-uma-vez.mp3",
        "img":"imagens/era-uma-vez.jpg"
    },
    {   "id":"4",
        "nome":"Dancing With a Stranger",
        "artista":"Sam Smith",
        "album":"Coletania Sondfy",
        "url":"audios/Dancing.mp3",
        "img":"imagens/stranger.jpg"
    },
    {
        "id":"5",
        "nome":"Trem Bala",
        "artista":"Ana Vilela",
        "album":"Coletania Sondfy",
        "url":"audios/trem-bala.mp3",
        "img":"imagens/trem-bala.jpg"
    },
    {
        "id":"6",
        "nome":"Um Milhão de Vezes",
        "artista":"Rafinha Acústico",
        "album":"Acusticos",
        "url":"audios/um-milhao-de-vezes.mp3",
        "img":"imagens/um-milhao-de-vezes.jpg"
    }
];

const ajson = [
    {
        "nome":"Led Zepelin",
        "img":"imagens/stairway.jpg"
    },
    {
        "nome":"Gustavo Mioto",
        "img":"imagens/relogio.jpg"
    },
    {
        "nome":"Henrique e Juliano",
        "img":"imagens/metade.jpg"
    },
    {
        "nome":"Kell Smith",
        "img":"imagens/era-uma-vez.jpg"
    },
    {
        "nome":"Sam Smith",
        "img":"imagens/stranger.jpg"
    },
    {
        "nome":"Ana Vilela",
        "img":"imagens/trem-bala.jpg"
    },
    {
        "nome":"Rafinha Acústico",
        "img":"imagens/um-milhao-de-vezes.jpg"
    }
];

const aljson = [
    {
        "nome":"Coletania Sondfy",
        "img":"imagens/capa.jpg"
    },
    {
        "nome":"Acusticos",
        "img":"imagens/um-milhao-de-vezes.jpg"
    }
];

let playlistsData = [];

function fetchMusicas(){
    return mjson;    
}

function fetchPlaylistsData(){
    Object.keys(localStorage).map(item =>{ if(item[0] == '▒')playlistsData.push(JSON.parse(localStorage.getItem(item)))});    
    return playlistsData;
}

function fetchArtistas(){
    return ajson;
}

function fetchAlbuns(){
    return aljson;
}