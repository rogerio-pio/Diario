function enviarArquivosParaBackend() {
    // Cria uma instância do objeto FormData
    var formData = new FormData();

    // Adiciona os arquivos selecionados ao objeto FormData
    arquivosSelecionados.forEach(function(arquivo) {
        formData.append('file', arquivo);
    });

    // Faz a requisição para o backend usando fetch API
    fetch('/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Arquivos enviados com sucesso!');
        } else {
            console.error('Erro ao enviar arquivos.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar arquivos:', error);
    });

    // Limpa a lista de arquivos selecionados
    arquivosSelecionados = [];
}
