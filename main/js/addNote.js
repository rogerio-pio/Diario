async function enviarArquivos(files) {
    try {
        const formData = new FormData();

                formData.append('id', 1);

             files.forEach(file => {
            formData.append('file', file);
        });

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token
        };

        const options = {
            method: 'POST',
            headers: headers,
            body: formData
        };

        const response = await fetch('http://localhost:8080/newImgs', options);

        if (!response.ok) {
            throw new Error('Erro ao enviar solicitação');
        }

        const data = await response.json();
        console.log('Resposta do servidor:', data);
    } catch (error) {
        console.error('Erro:', error);
    }
}

