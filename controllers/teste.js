const testeInit = () => {
    console.log('Teste Unitário: Versão 0.1');

    
    const removeT = () => {
        console.log('Remoção de Containers da tela');
        let input = document.getElementsByClassName('secoes');
        let output = remove(input);
        for(i = 0; i< output.lenght; i++){
            if(output[i].classList.lenght != 2){
                return console.log('remove() Não passou no teste!');
            }
        }
        return console.log('remove() Passou no teste.');
    }



    removeT();
}