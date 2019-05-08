let musicas = fetchMusicas();
let pls = fetchPlaylistsData();
let artistas = fetchArtistas();
let albuns = fetchAlbuns();
let player = document.getElementById('audio');
let playing = false;
let iconePlayer = document.getElementById('icone-play');
let textoMusica = document.getElementById('musica-atual');
let inPlaylist = false;
let random = false;
let progressBar = document.getElementById('progress-bar');
let progressTimer;
let currentList = [];
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



function tocarMusica(item){
    inPlaylist = false;
    tocar(item.getAttribute('name'));
    return item.getAttribute('name');
}

function deactive(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove('musica-active');
    }
    return elements;
}

function active(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.add('musica-active');
    }
    return elements;
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
    //player.play();
    window.clearInterval(progressTimer);
    setTimeout(progresBar(parseInt(player.currentTime),1010));
    player.setAttribute('playing', nome);
    return player.getAttribute('playing');
}

function canplay(audio){
    audio.play();
}

function playerEnd(){
    playing = false;
    let i = 0;

    if(player.getAttribute('playing')){

        nome = parseInt(player.getAttribute('playing'));

        if( !player.loop && !random ) {
    
            if( inPlaylist ) return listaTracks[0].tracks.map(musica => {
                
                if(musica == nome){
                    if(listaTracks[0].tracks[i+1]) tocar(listaTracks[0].tracks[i+1]);
                    else tocar(listaTracks[0].tracks[0]);
                }
                else i++;
            });
            else if(musicas.filter(musica => musica.id == nome+1).length != 0) return tocar(++nome);
            else return tocar(0);
        
        } else if(random && !player.loop){

            if(inPlaylist){
                return tocar(listaTracks[0].tracks[Math.floor(Math.random() * parseFloat(listaTracks[0].tracks.length - 0.1))]); 
            } 
            else return tocar(Math.floor(Math.random() * parseFloat(musicas.length - 0.1)));

        } else if(player.loop) return tocar(nome)

        return false;
    } 
}

function pausePlay(){
    if(player.getAttribute('playing')){
        if(playing){
        
            playing = false;
            iconePlayer.classList.replace('fa-pause','fa-caret-right');
            window.clearInterval(progressTimer);
            return player.pause();
    
        } else{
    
            playing = true;
            iconePlayer.classList.replace('fa-caret-right','fa-pause');
            progresBar();
            return player.play();
    
        }
    }
}

function progresBar(){

    if(playing){
        progressTimer = setTimeout(()=>{
            let tempo = document.getElementById('tempo');
            let total = player.duration;
            let current = player.currentTime;
            let percent = parseFloat(current/(total/100));
            let min = parseInt((player.duration - player.currentTime) % 60);
            if(min < 10) min = '0' + min;
            progressBar.style.width = percent+'%';
            tempo.innerText = '-' + parseInt((player.duration - player.currentTime) / 60) + ':' + min;
            progresBar();
        },500);
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
 
function cadastrar(form){
    loading.style.display = "block";
    if(form.password.value == form.repassword.value){
        let user = {
            "name": form.name.value,
            "user": form.user.value,
            "password": form.password.value
        }
        fetchSingin(user);
    } else{
        alert('Por favor redigite a senha');
        form.repassword.value = "";
    }
    
    return false;
}

function logar(form){
    loading.style.display = "block";
    let user = {
        "user": form.user.value,
        "password": form.password.value
    };
    fetchLogin(user);
    return false;
}

createAlbuns(albuns);
createArtistas(artistas);
createLista(musicas);
