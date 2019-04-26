
let musicas = fetchMusicas();


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
        dados.map(musica => {
            let item = document.createElement('li');
            item.classList.add('item-musica');
            item.setAttribute('name',musica.id);
            item.innerText = musica.nome;
            item.setAttribute('onclick','tocarMusica(this.getAttribute("name"))')
            lista.appendChild(item);
        });
    }
}

function tocarMusica(item){
    console.log(item);
}

createLista(musicas);
