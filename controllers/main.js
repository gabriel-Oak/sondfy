
let musicas = fetchMusicas();
let player = document.getElementById('audio');
let playing = false;
let iconePlayer = document.getElementById('icone-play');
let textoMusica = document.getElementById('musica-atual');
let inPlaylist = false;
let random = false;
let progressBar = document.getElementById('progress-bar');

player.addEventListener('ended', playerEnd());

function remove(items){
    for(let i = 0; i < items.length; i++){
        items[i].classList.add('offline');
    }
}

 function unselect(items){
    for(let i = 0; i < items.length; i++){
        items[i].classList.remove('active');
    }
}

function router(link){
    let containers = document.getElementsByClassName('secoes');
    let links = document.getElementsByClassName('links');

    unselect(links);
    remove(containers);
    
    if(link.id == 'musicas-link'){
        document.getElementById('container-musicas').classList.remove('offline');
        document.getElementById('musicas-link').classList.add('active');
    } else if(link.id == 'playlists-link'){
        document.getElementById('container-playlists').classList.remove('offline');
        document.getElementById('playlists-link').classList.add('active');
    } else if(link.id == 'artistas-link'){
        document.getElementById('container-artistas').classList.remove('offline');
        document.getElementById('artistas-link').classList.add('active');
    } else{
        document.getElementById('container-albuns').classList.remove('offline');
        document.getElementById('albuns-link').classList.add('active');
    }
}

function toggleMenu(){
    let menu = document.getElementById('navigator');
    if(window.innerWidth < 768){
        if(!menu.classList.contains('no-nav')) {

            menu.classList.add('side-nav', 'no-nav');
            setTimeout(() => menu.style.display = 'none', 400);
    
        }
        else {
    
            menu.style.display = 'block';
            menu.classList.replace('no-nav', 'side-nav');
    
        }
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
            item.classList.add('item-musica', musica.id);
            item.setAttribute('name',musica.id);
            item.innerHTML ='<i class="fas fa-music"></i> ' + musica.nome;
            item.setAttribute('onclick','tocarMusica(this)')
            lista.appendChild(item);
        });

    }
}

function tocarMusica(item){
    inPlaylist = false;
    return tocar(item.getAttribute('name'));
}

function deactive(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove('musica-active');
    }
}

function active(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.add('musica-active');
    }
}

function tocar(nome){
    if(nome < 0) return false;
    let htmlElements = document.getElementsByClassName('musica-active');
    deactive(htmlElements);

    let htmlElement = document.getElementsByName(nome);
    active(htmlElement);

    let dadosMusica = musicas.filter(item => item.id == nome);
    player.src = dadosMusica[0].url;
    iconePlayer.classList.replace('fa-caret-right','fa-pause');
    textoMusica.childNodes[1].innerHTML = dadosMusica[0].nome;
    textoMusica.childNodes[3].innerHTML = dadosMusica[0].artista;
    document.getElementById('capa').src = dadosMusica[0].img;

    playing = true;
    player.play();
    setTimeout(progresBar(parseInt(player.currentTime),1010));
    return player.setAttribute('playing', nome);
}

function playerEnd(){
    playing = false;
    if(player.getAttribute('playing')){

        nome = parseInt(player.getAttribute('playing'));

        if( !player.loop && !random ) {
    
            if( inPlaylist ) return console.log('proximo da playlist');
            else if(musicas.filter(musica => musica.id == nome+1).length != 0) return setTimeout(tocar(++nome),1010);
            else return setTimeout(tocar(0),1000);
        
        } else if(random && !player.loop){

            if(inPlaylist) return console.log('Item Aleatorio da playlist');
            else return setTimeout(tocar(Math.floor(Math.random() * parseFloat(musicas.length - 0.1))),1010);

        } else if(player.loop) return setTimeout(tocar(nome),1010);

        return false;
    } 
}

function pausePlay(){
    if(playing){
        
        playing = false;
        iconePlayer.classList.replace('fa-pause','fa-caret-right');
        return player.pause();

    } else{

        playing = true;
        iconePlayer.classList.replace('fa-caret-right','fa-pause');
        progresBar();
        return player.play();

    }
}

function progresBar(){

    if(playing){
        setTimeout(function(){
            let tempo = document.getElementById('tempo');
            let total = player.duration;
            let current = player.currentTime;
            let percent = parseFloat(current/(total/100));
            progressBar.style.width = percent+'%';
            tempo.innerText = '-' + parseInt((player.duration - player.currentTime) / 60) + ':' + parseInt((player.duration - player.currentTime) % 60)
            progresBar(parseInt(player.currentTime));
        },1000);
    } 
}

function toggleRepeat(){
    
    let button = document.getElementById('repeat');
    player.loop = !player.loop;;
    if(player.loop) return button.classList.add('active');
    else return button.classList.remove('active');

}

function toggleRandom(){
    
    let button = document.getElementById('random');
    random = !random;
    if(random) return button.classList.add('active');
    else return button.classList.remove('active');

}

function prev(){
    if(player.getAttribute('playing')) return tocar(parseInt(player.getAttribute('playing')-1));
}

function next(){
    return playerEnd();
}



createLista(musicas);
