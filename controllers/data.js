let logado = false;
let userD = null;

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

if(!localStorage.getItem('sondfyUserData')){
    document.getElementById('login-container').style.display = 'flex'; 
} else userD = JSON.parse(localStorage.getItem('sondfyUserData'));

playlistData = [];

function fetchSingin(data){
    fetch('http://api-sondfy.herokuapp.com/user',{
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        (response) => {
            if(response.status == 201){
                console.log('Cadastro efutuado com sucesso');
                fetchLogin(data);
            } else {
                console.log(response.status);
                loading.style.display = "none";
            }
        }
    ).catch(
        (error) => {
            console.error(error);
            loading.style.display = "none";
        }
    );
}

function fetchLogin(data){
    fetch('http://api-sondfy.herokuapp.com/user/'+data.user,{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        (response) => {
            loading.style.display = "none";
            if(response.status == 200){
                console.log('logado com sucesso');                
                return response.json(); 
            } else if(response.status == 403){
                return alert('Sua senha pode estar errada!');
            } else if(response.status == 404){
                return alert('Esse login não foi cadastrado');
            }
        }
    ).then(
        (userData) => {
            let user = {"_id":userData._id,"name":userData.name, "user":userData.user}
            localStorage.setItem('sondfyUserData',JSON.stringify(user));
            return location.reload();
        }
    ).catch(
        (error) => {
            loading.style.display = "none";
            console.error(error);
        }
    );
}

function fetchMusicas(){
    return mjson;    
}

function fetchPlaylistsData(){
    console.log(userD)
    if(userD){
        console.log(userD.playlists);
        return fetch('http://api-sondfy.herokuapp.com/user/'+userD.user).then(
            (response) => {
                if(response.status == 200){
                    return response.json(); 
                }
            }
        ).then(
            (data) => {
                createPlaylists(data.map( playlist => JSON.parse(playlist)));
                pls = data.map( playlist => JSON.parse(playlist));
            }
        ).catch(
            (erro) => console.error(erro)
        );
    }
}

function fetchArtistas(){
    return ajson;
}

function fetchAlbuns(){
    return aljson;
}

function salvarPl(req){
    if(currentList.length > 0){
        let pl = {
            'playlist':{
                'title': req.titulo.value,
                'tracks': currentList
            }
        }
        loading.style.display = "block";
        fetch('http://api-sondfy.herokuapp.com/user/'+userD._id, {
            method: 'put',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pl)
        }).then(
            (response) => {
                loading.style.display = "none";
                if(response.status == 200){
                    alert('Sucesso ao salvar playlist');
                    return location.reload();
                } else {
                    alert('Deu erro com sua playlist :/');
                }
            }
        ).catch((erro) => console.error(erro));
        return false;
    }
}