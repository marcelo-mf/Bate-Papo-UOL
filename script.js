
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

let NomeUsuario

function entrarNaSala() {
    

    const nomeUser = document.querySelector(".input-usuario").value;
    NomeUsuario = {name: nomeUser}

    const entrar = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', NomeUsuario)
    entrar.then(esconderTelaInicio)

    function esconderTelaInicio(resposta) {    
        if(resposta.status === 200) {
        const esconderEntrada = document.querySelector(".tela-de-entrada")
        esconderEntrada.classList.add('esconder-tela-entrada')
        } else if (resposta.status !== 200) {
            alert("Insira um nome válido")
        }
    }

    setInterval(manterConexao, 4800)
}

    function manterConexao() {
    const manterConexao = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', NomeUsuario)
    }
    
   

function enviarMensagens() {

    const nomeEnviar = document.querySelector(".input-usuario").value;

    const selectContatoSelecionado = document.querySelector(".mostrar-check-contato");
    const DivContatoSelecionado = selectContatoSelecionado.parentNode;
    const NomeContatoEnviar = DivContatoSelecionado.innerText;

    const mensagemEnviar = document.querySelector(".input-mensagem").value;
    
    let typeMensagem 
    const selectVisibilidadeSelecionada = document.querySelector(".mostrar-check-visibilidade");
    const DivVisibilidadeSelecionada = selectVisibilidadeSelecionada.parentNode;
    const NomeVisibilidadeEnviar = DivVisibilidadeSelecionada.innerText;

    if(NomeVisibilidadeEnviar === "Público") {
        typeMensagem = "message"
    } else if (NomeVisibilidadeEnviar === "Reservadamente"){
        typeMensagem = "private_message"
    }
    
    const elementosMensagem = {from: nomeEnviar, to: NomeContatoEnviar, text: mensagemEnviar, type: typeMensagem}

    const enviarMensagem = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', elementosMensagem)
    enviarMensagem.then(limparInput)

    function limparInput() {
        
       document.querySelector(".input-mensagem").value = "";
    }


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

    if(checkVisibilidade !== null) {
    checkVisibilidade.classList.remove("mostrar-check-visibilidade")
    }

    const addCheck = mudarCheckVisibilidade.querySelector(".check-visibilidade")
    addCheck.classList.add("mostrar-check-visibilidade")
}



function atualizarMensagens() {

    const mensagens = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    mensagens.then(buscarMensagens)



function buscarMensagens (resposta) {

    const caixaDeMensagens = document.querySelector(".caixa-de-mensagens")

    caixaDeMensagens.innerHTML = ``;
    
    for (let i = 0; i < resposta.data.length; i++) {
        if(resposta.data[i].type === 'status') {
            caixaDeMensagens.innerHTML += `<div class="mensagem mensagem-status" data-identifier="message">
            <p><time>(${resposta.data[i].time})   </time><strong>     ${resposta.data[i].from}</strong> ${resposta.data[i].text}</p>
        </div>`
        }
        else if (resposta.data[i].to === 'Todos') {
            caixaDeMensagens.innerHTML +=  `<div class="mensagem mensagem-normal" data-identifier="message">
            <p><time>(${resposta.data[i].time})  </time><strong>     ${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</p>
        </div>`
        }
        else if (resposta.data[i].to !== 'Todos') {
            caixaDeMensagens.innerHTML += `<div class="mensagem mensagem-reservada" data-identifier="message">
            <p><time>(${resposta.data[i].time})  </time><strong>     ${resposta.data[i].from}</strong> reservadamente para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</p>
        </div>`
        }
    }
}
}

function atualizarmsg() {
    setInterval(atualizarMensagens, 3000);
}


function usuariosAtivos () {

    const mensagens = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
    mensagens.then(usuariosNaTela)

    function usuariosNaTela(usuarios) {

        const users = document.querySelector(".escolher-contato");

        for (let i = 0; i < usuarios.data.length; i++) {
            users.innerHTML += `<div class="contatos-visibilidade" onclick="selecionarContato(this)">
            <div>
                <ion-icon name="person-circle"></ion-icon>
                <p>${usuarios.data[i].name}</p>
            </div>
            <ion-icon class="check-contato" name="checkmark-sharp"></ion-icon>
        </div>`
        }
    }
}


atualizarmsg()
usuariosAtivos ();
repetirConexao();




