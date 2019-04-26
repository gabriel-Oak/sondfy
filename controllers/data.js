const mjson = [
    {   "id":"0",
        "nome":"Stairway To Heaven",
        "artista":"Led Zepelin",
        "url":"audios/stairway-to-heaven.mp3",
        "img":"imagens/stairway.jpg"
    },
    {   "id":"1",
        "nome":"Relógio",
        "artista":"Gustavo Mioto",
        "url":"audios/Relogio.mp3",
        "img":"imagens/relogio.jpg"
    },
    {   "id":"2",
        "artista":"Henrique e Juliano",
        "nome":"Metade Da Estrada",
        "url":"audios/metade-da-estrada.mp3",
        "img":"imagens/metade.jpg"
    },
    {   "id":"3",
        "nome":"Era Uma Vez",
        "artista":"Kell Smith",
        "url":"audios/era-uma-vez.mp3",
        "img":"imagens/era-uma-vez.jpg"
    },
    {   "id":"4",
        "nome":"Dancing With a Stranger",
        "artista":"Sam Smith",
        "url":"audios/Dancing.mp3",
        "img":"imagens/stranger.jpg"
    }
];

function fetchMusicas(){
    return mjson;    
}