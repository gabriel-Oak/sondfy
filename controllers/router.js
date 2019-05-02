
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

function createPlaylists(data){
    let container = document.getElementById('secao-de-playlist');
    data.map(item => {
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let img = document.createElement('img');
        img.src = musicas[item.tracks[0]].img
        div.classList.add('playlist', 'thumbnail');
        div.setAttribute('onclick','playP(this)');
        div.setAttribute('name',item.title);
        h1.innerText = item.title;
        div.appendChild(h1);
        div.appendChild(img);
        container.appendChild(div);
        
    });
}

function createArtistas(data){
    let container = document.getElementById('secao-de-artistas');
    data.map(item =>{
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let img = document.createElement('img');
        img.src = item.img;
        div.classList.add('playlist', 'thumbnail');
        div.setAttribute('onclick','playArt(this)');
        div.setAttribute('name',item.nome);
        h1.innerText = item.nome;
        div.appendChild(h1);
        div.appendChild(img);
        container.appendChild(div);
    });
}

function createAlbuns(data){
    let container = document.getElementById('secao-de-albuns');
    data.map(item =>{
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let img = document.createElement('img');
        img.src = item.img;
        div.classList.add('playlist', 'thumbnail');
        div.setAttribute('onclick','playAlb(this)');
        div.setAttribute('name',item.nome);
        h1.innerText = item.nome;
        div.appendChild(h1);
        div.appendChild(img);
        container.appendChild(div);
    });
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

function removePls(items){
    for(i = 0; i < items.length; i++){
        items[i].classList.remove('playlist-active');
    }
    return items;
}

function playP(playlist){
    let ps = document.getElementsByClassName('thumbnail');
    removePls(ps);

    listaTracks = pls.filter(pl => playlist.getAttribute('name') == pl.title);
    inPlaylist = true;
    tocar(listaTracks[0].tracks[0]);
    playlist.classList.add('playlist-active');
    return(listaTracks);
}

function playArt(artista){
    let ps = document.getElementsByClassName('thumbnail');
    removePls(ps);
    tracks = [];
    listaTracks = [{tracks}];
    musicas.filter(musica => musica.artista === artista.getAttribute('name')).map(item => {
        listaTracks[0].tracks.push(item.id);
    });
    inPlaylist = true;
    tocar(listaTracks[0].tracks[0]);
    artista.classList.add('playlist-active');
    return(listaTracks);
}

function playAlb(album){
    let ps = document.getElementsByClassName('thumbnail');
    removePls(ps);
    tracks = [];
    listaTracks = [{tracks}];
    musicas.filter(musica => musica.album === album.getAttribute('name')).map(item => {
        listaTracks[0].tracks.push(item.id);
    });
    inPlaylist = true;
    tocar(listaTracks[0].tracks[0]);
    album.classList.add('playlist-active');
    return(listaTracks);
}