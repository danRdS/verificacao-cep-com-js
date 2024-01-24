const form = document.getElementById('form');
const loader = document.getElementById('loader');

const verificarCep = async(cep) => {
    try {
        mostrarOcultarLoader();
        const resultado = await fetch(`//viacep.com.br/ws/${cep}/json`);
        const dadosEndereco = await resultado.json();
        if(dadosEndereco && !('erro' in dadosEndereco)) {
            mostrarOcultarLoader();
            Object.values(form).forEach(elemento => {
                const chave = elemento.getAttribute('id');
                elemento.value = dadosEndereco[chave];
            })
        } else {
            mostrarOcultarLoader();
            resetarCamposEndereco();
            textoDialog.textContent = 'CEP não encontrado';
            abrirDialog();
        }
    } catch (erro) {
        mostrarOcultarLoader();
        console.error(`Error: ${erro.message}`);
        alert('Não foi possivel completar a busca. Erro: ' + erro.message);
    }
}

const resetarCamposEndereco = () => {
    Object.values(form).forEach(elemento => {
        const chave = elemento.getAttribute('id');
        chave !== 'cep' ? elemento.value = '' : null;                
    })
}

function mostrarOcultarLoader() {
    loader.classList.toggle('ocultar-loader');
}

function validarCep(valorCep) {
    const cep = valorCep.replace(/\D/g, '');
    if(cep !== '') {
        const validaCep = /^[0-9]{8}$/;
        if(validaCep.test(cep)) {
            verificarCep(cep);
        } else {
            mostrarOcultarLoader();
            setTimeout(() => {
                mostrarOcultarLoader();
                textoDialog.textContent = 'Formato de cep inválido';
                abrirDialog();
                resetarCamposEndereco();
            }, 300);
        }
    } else {
        resetarCamposEndereco();
    }
}

const dialog = document.querySelector('dialog');
const textoDialog = document.querySelector('dialog span');

const abrirDialog = () => {
    dialog.classList.add('visivel');
    dialog.showModal();
}

const fecharDialog = () => {
    dialog.close();
    dialog.classList.remove('visivel');
}