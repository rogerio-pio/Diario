function addNewNote(arquivos) {
    arquivos.forEach(arquivo => {
        var formData = new FormData();
        formData.append('file', arquivo);

        fetch('http://localhost:8080/newImgs', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao enviar arquivo para o servidor');
        })
        .then(data => {
            alert('Arquivo enviado com sucesso:', data);
        })
        .catch(error => {
            alert('Erro:', error);
        });
    });
}
