
let musicas = fetchMusicas();
let player = document.getElementById('audio');
let playing = false;
let iconePlayer = document.getElementById('icone-play');
let textoMusica = document.getElementById('musica-atual');
let inPlaylist = false;
let random = false;
let progressBar = document.getElementById('progress-bar');

player.addEventListener('ended', playerEnd());

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
    
    playing = true;
    player.play();
    progresBar(parseInt());
    return player.setAttribute('playing', nome);
}

function playerEnd(){
    
    if(player.getAttribute('playing')){

        nome = parseInt(player.getAttribute('playing'));

        if( !player.loop && !random ) {
    
            if( inPlaylist ) return console.log('proximo da playlist');
            else if(musicas.filter(musica => musica.id == nome+1).length != 0) return tocar(++nome);
            else return tocar(0);
        
        } else if(random){

            if(inPlaylist){
                return console.log('Item Aleatorio da playlist');
            } else return tocar(Math.floor(Math.random() * parseFloat(musicas.length - 0.1)));

        }

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
        return player.play();

    }
}

function progresBar(){

    setTimeout(function(){
        let total = player.duration;
        let current = player.currentTime;
        let percent = parseFloat(current/(total/100));
        console.log(percent+"%");
        progressBar.style.width = percent+'%';
        progresBar()
    },1000);

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
    return player.currentTime = player.duration;
}



createLista(musicas);
