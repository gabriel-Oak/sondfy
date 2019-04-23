const mjson = [
    {   "id":"0",
        "nome":"Stairway To Heaven",
        "url":"audios/stairway-to-heaven.mp3",
        "img":"imagens/stairway.jpg"
    },
    {   "id":"1",
        "nome":"Relógio",
        "url":"audios/Relogio.mp3",
        "img":"imagens/relogio.jpg"
    },
    {   "id":"2",
        "nome":"Metade Da Estrada",
        "url":"audios/metade-da-estrada.mp3",
        "img":"imagens/metade.jpg"
    },
    {   "id":"3",
        "nome":"Era Uma Vez",
        "url":"audios/era-uma-vez.mp3",
        "img":"imagens/era-uma-vez.jpg"
    },
    {   "id":"4",
        "nome":"Dancing With a Stranger",
        "url":"audios/Dancing.mp3",
        "img":"imagens/stranger.jpg"
    }
];

let imagem = $('.figure-player img')[0];
let playlist = [];
//gera a lista
mjson.map( musica => { 
    let lista = $('#lista-default')[0];
    let item = document.createElement('li');
    let innerItem = document.createElement('a');
    innerItem.setAttribute('class','arquivo-musica');
    innerItem.setAttribute('href', musica.url);
    innerItem.setAttribute('id',musica.id);
    innerItem.innerText = musica.nome;
    item.appendChild(innerItem);
    lista.appendChild(item);
});

$('.add').click(criarPlaylist);
$('#lista-default li a').click(function(e){e.preventDefault(); play(this)});
let player = $('#audio-player')[0];

function play(musica){
    let dadosMusica = mjson.filter(item => item.id == musica.id);
    imagem.setAttribute('src', dadosMusica[0].img);
    player.src = musica.href;
    player.play();
}

function criarPlaylist(){
    let div = $('.criar-container')[0];
    let lista = $('.selecao')[0];
    
    div.style.display = 'block';
    lista.innerHtml = '';

    mjson.map(musica => {
        let teste = true;
        playlist.map(item => {
            if(musica == item){
                teste = false;
            }
        });
        if(teste){
            let item = document.createElement('li');
            
        }
        
    });

}

/*
if(teste){
            playlist.push(musica);
        }
        console.log(playlist);
        div.style.display = 'none';*/