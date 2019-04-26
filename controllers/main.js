
let musicas = fetchMusicas();
let player = document.getElementById('audio');
let playing = false;
let iconePlayer = document.getElementById('icone-play');
let textoMusica = document.getElementById('musica-atual');

function toggleMenu(){
    let menu = document.getElementById('navigator');
    if(!menu.classList.contains('no-nav')) {
        menu.classList.add('side-nav', 'no-nav');
        setTimeout(() => menu.style.display = 'none', 400);
    }
    else {
        menu.style.display = 'block';
        menu.classList.replace('no-nav', 'side-nav');
    }
}

function conserta(){
    if(window.innerWidth > 768 ){
        let menu = document.getElementById('navigator');
        menu.style.display = 'block';
        menu.classList.replace('no-nav', 'side-nav');
    }
}

function createLista(dados){
    let lista = document.getElementById('lista-default');
    if(dados.length > -1){
        return dados.map(musica => {
            let item = document.createElement('li');
            item.classList.add('item-musica');
            item.setAttribute('id',musica.id);
            item.innerHTML ='<i class="fas fa-music"></i> ' + musica.nome;
            item.setAttribute('onclick','tocarMusica(this)')
            lista.appendChild(item);
        });
    }
}

function tocarMusica(item){
    console.log(item);
    return tocar(item.id);
}

function tocar(id){
    let dadosMusica = musicas.filter(item => item.id == id);
    player.src = dadosMusica[0].url;
    iconePlayer.classList.replace('fa-caret-right','fa-pause');
    textoMusica.childNodes[1].innerHTML = dadosMusica[0].nome;
    textoMusica.childNodes[3].innerHTML = dadosMusica[0].artista;
    console.log(dadosMusica.nome);
    playing = true;
    return player.play();
}

function pausePlay(){
    if(playing){
        playing = false;
        iconePlayer.classList.replace('fa-pause','fa-caret-right');
        return player.pause();
    } else{
        playing = true;
        iconePlayer.classList.replace('fa-caret-right','fa-pause');
        return player.play();
    }
}

createLista(musicas);
