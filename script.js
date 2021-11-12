
function mostrarMenu() {
    const mostrarMenu = document.querySelector(".menu")
    mostrarMenu.classList.add('mostrar-menu')

    const mostrarFundo = document.querySelector(".fundo-escuro")
    mostrarFundo.classList.add('mostrar-fundo')  
}

function esconderMenu() {
    const esconderMenu = document.querySelector(".menu")
    esconderMenu.classList.remove('mostrar-menu')

    const esconderFundo = document.querySelector(".fundo-escuro")
    esconderFundo.classList.remove('mostrar-fundo')  
}

function esconderTelaEntrada() {
    const esconderEntrada = document.querySelector(".tela-de-entrada")
    esconderEntrada.classList.add('esconder-tela-entrada')

    
}

function selecionarContato(mudarCheckContato) {

    const checkContato = document.querySelector(".mostrar-check-contato")

    if(checkContato !== null) {
    checkContato.classList.remove("mostrar-check-contato")
    }

    const addCheck = mudarCheckContato.querySelector(".check-contato")
    addCheck.classList.add("mostrar-check-contato")
}

function selecionarVisibilidade(mudarCheckVisibilidade) {

    const checkVisibilidade = document.querySelector(".mostrar-check-visibilidade")

    console.log(checkVisibilidade)

    if(checkVisibilidade !== null) {
    checkVisibilidade.classList.remove("mostrar-check-visibilidade")
    }

    const addCheck = mudarCheckVisibilidade.querySelector(".check-visibilidade")
    addCheck.classList.add("mostrar-check-visibilidade")
}



