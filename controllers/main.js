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