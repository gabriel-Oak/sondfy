
let musicas = fetchMusicas();
let player = document.getElementById('audio');
let playing = false;
let iconePlayer = document.getElementById('icone-play');
let textoMusica = document.getElementById('musica-atual');
let inPlaylist = false;
let random = false;
let progressBar = document.getElementById('progress-bar');
let currentList = [];
let pls = fetchPlaylistsData();
let listaTracks;

player.addEventListener('ended', playerEnd());



function remove(items){
    for(let i = 0; i < items.length; i++){
        items[i].classList.add('offline');
    }
    return items;
}

function unselect(items){
    for(let i = 0; i < items.length; i++){
        items[i].classList.remove('active');
    }
    return items;
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
    if( window.innerWidth > 1199){
        let volume = document.getElementById('volume-container');
        volume.style.display = 'block';
    }
}

function createLista(dados){
    let lista = document.getElementById('lista-default');
    let repositorio = document.getElementById('lista-playlist');
    if(dados.length > -1){

        dados.map(musica => {
            let item = document.createElement('li');
            item.classList.add('item-musica', musica.id, 'color-pink-purple');
            item.setAttribute('name',musica.id);
            item.innerHTML ='<i class="fas fa-music"></i> ' + musica.nome;
            item.setAttribute('onclick','tocarMusica(this)')
            lista.appendChild(item);
        });

        return dados.map(musica => {
            let item = document.createElement('li');
            item.classList.add('item-musica', musica.id, 'color-pink-purple');
            item.setAttribute('name',musica.id);
            item.innerHTML ='<i class="fas fa-music"></i> ' + musica.nome;
            item.setAttribute('onclick','addToPl(this)');
            repositorio.appendChild(item);
        })

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
    let i = 0;

    if(player.getAttribute('playing')){

        nome = parseInt(player.getAttribute('playing'));

        if( !player.loop && !random ) {
    
            if( inPlaylist ) return listaTracks[0].tracks.map(musica => {
                
                if(musica == nome){
                    if(listaTracks[0].tracks[i+1]) setTimeout(tocar(listaTracks[0].tracks[i+1]),1000);
                    else setTimeout(tocar(listaTracks[0].tracks[0]),1000);
                }
                else i++;
            });
            else if(musicas.filter(musica => musica.id == nome+1).length != 0) return setTimeout(tocar(++nome),1010);
            else return setTimeout(tocar(0),1000);
        
        } else if(random && !player.loop){

            if(inPlaylist){
                return setTimeout(tocar(listaTracks[0].tracks[Math.floor(Math.random() * parseFloat(listaTracks[0].tracks.length - 0.1))]),1010); 
            } 
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
            let min = parseInt((player.duration - player.currentTime) % 60);
            if(min < 10) min = '0' + min;
            progressBar.style.width = percent+'%';
            tempo.innerText = '-' + parseInt((player.duration - player.currentTime) / 60) + ':' + min;
            progresBar(parseInt(player.currentTime));
        },1000);
    } 
}

document.getElementById('progress-captor').addEventListener('mousedown', (event) => {
    let click = event.layerX;
    let total = event.srcElement.clientWidth;
    let percent = parseFloat(click/(total/100));
    if(player.getAttribute('playing') != null){
        let tempo = player.duration;
        player.currentTime = tempo * (percent / 100);
        if(!playing) pausePlay();
        return percent;
    }
    return false;
})

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

function toggleVolume(){
    let volume = document.getElementById('volume-container');
    if(window.innerWidth < 1200){
        if(volume.style.display == 'none' || volume.style.display == '') return volume.style.display = 'block';
        else return volume.style.display = 'none'
    } 
    return false;
}

document.getElementById('volume-captor').addEventListener('mousedown', (event) => {
    let click = event.layerX;
    let total = event.srcElement.clientWidth;
    let percent = parseFloat(click/(total/100));
    let volume = player.volume;
    player.volume = 1 * (percent / 100);
    document.getElementById('volume-bar').style.width = percent + '%';

    return player.volume;
    
});

function prev(){
    if(player.getAttribute('playing')) return tocar(parseInt(player.getAttribute('playing')-1));
}

function next(){
    return playerEnd();
}

function newPlaylist(){
    return document.getElementById('form-container-playlist').style.display = 'block';
}

function resetFomr(){
    document.getElementById('input-name').value = '';
    return currentList = [];
}

function canselarPlaylist(){
    resetFomr();
    return document.getElementById('form-container-playlist').style.display = 'none';
}

function addToPl(item){
    id = item.getAttribute('name');
    if(currentList.filter(item => item == id) < 1) currentList.push(id); 
    return currentList;
}

function salvarPl(req){
    if(currentList.length > 0){
        let res = {
            'title': req.titulo.value,
            'tracks': currentList
        }
        localStorage.setItem(res.title, JSON.stringify(res));
    }
}

function playP(playlist){
    listaTracks = pls.filter(pl => playlist.getAttribute('name') == pl.title);
    inPlaylist = true;
    tocar(listaTracks[0].tracks[0]);
    return(listaTracks);
}

function createPlaylists(data){
    let container = document.getElementById('secao-de-playlist');
    data.map(item => {
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        div.classList.add('playlist')
        div.setAttribute('onclick','playP(this)');
        div.setAttribute('name',item.title);
        h1.innerText = item.title;
        div.appendChild(h1);
        container.appendChild(div);
        
    });
}


createPlaylists(pls);
createLista(musicas);
