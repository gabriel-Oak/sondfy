const testeInit = () => {
    console.log('Teste Unitário: Versão 0.1');

    
    const removeT = () => {
        console.log('Testando remove()');
        
        //Gerando elementos do teste
        let input = [];
        for(i = 0; i < 5; i++){
            let item = document.createElement('article');
            item.classList.add('secoes');
            input.push(item);
        }

        //Efetuando teste
        let output = remove(input);

        for(i = 0; i < output.length; i++){
            if(!output[i].classList.contains('offline')){
                return console.log('remove() Não passou no teste!');
            }
        }
        return console.log('remove() Passou no teste.');
    }



    removeT();
}