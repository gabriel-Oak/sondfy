const testeInit = () => {
    console.log('Teste Unitário: Versão 0.1');
    
    const removeT = () => {
        console.log('Testando remove()');
        

        //Gerando elementos do teste
        let input = [];
        for(i = 0; i < 9000; i++){
            let item = document.createElement('article');
            item.classList.add('secoes');
            input.push(item);
        }

        //Efetuando teste
        let output = remove(input);

        for(i = 0; i < output.length; i++){
            if(!output[i].classList.contains('offline')){
                return console.log('remove() Não passou no teste! ');
            }
        }
        console.log('remove() Passou no teste. ');
        return console.log('');
    }

    console.log('');

    const unselectT = () =>{
        console.log('Testando unselect()');
        

        //Gerando elementos do teste
        let input = [];
        for(i = 0; i < 9000; i++){
            let item = document.createElement('li');
            item.classList.add('active');
            input.push(item);
        }

        //Efetuando teste
        let output = unselect(input);

        for(i = 0; i < output.length; i++){
            if(output[i].classList.contains('active')){
                return console.log('unselect() Não passou no teste! ');
            }
        }
        console.log('unselect() Passou no teste. ');
        return console.log('');
    }

    const tocarMusicaT = () =>{
        console.log("Iniciando teste de tocarMusica()");

        //Gerando elemento do teste
        let input = document.createElement('li');
        input.setAttribute('name','0');

        //Efetuando teste
        let output = tocarMusica(input);
        if(output != '0'){
            return console.log('tocarMusica() Não passou no teste! ');
        }
    
        console.log('tocarMusica() Passou no teste. ');
        return console.log('');
    }

    const deactiveT = () => {
        console.log('Iniciando teste de deactive()');

        //Gerando elementos do teste
        let input = [];
        for(i = 0; i < 9000; i++){
            let item = document.createElement('li');
            item.classList.add('musica-active');
            input.push(item);
        }

        //Efetuando teste
        let output = deactive(input);

        for(i = 0; i < output.length; i++){
            if(output[i].classList.contains('musica-active')){
                return console.log('unselect() Não passou no teste! ');
            }
        }
        console.log('unselect() Passou no teste. ');
        return console.log('');
    }

    const activeT = () => {
        console.log('Iniciando teste de active()');

        //Gerando elementos do teste
        let input = [];
        for(i = 0; i < 9000; i++){
            let item = document.createElement('li');
            input.push(item);
        }

        //Efetuando teste
        let output = active(input);

        for(i = 0; i < output.length; i++){
            if(!output[i].classList.contains('musica-active')){
                return console.log('active() Não passou no teste! ');
            }
        }
        console.log('active() Passou no teste. ');
        return console.log('');
    }

    const tocarT = () =>{
        console.log('Iniciando teste de tocar()');

        //gerando elemento do teste
        let input = 3;

        //Efetuando teste
        let output = tocar(input);
        if(output != input) return console.log('tocar() Não passou no teste!');
        console.log('tocar() passou no teste');
        return console.log('');
    }

    
    
    removeT();
    unselectT();
    tocarMusicaT();
    unselectT();
    activeT();
    tocarT();
}