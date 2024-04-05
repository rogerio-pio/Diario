document.addEventListener('DOMContentLoaded', function () {
        fetch('http://srv493893.hstgr.cloud:8080/getUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao enviar requisição para o servidor.');
        })
        .then(function(data) {
            document.getElementById('Nome').textContent = data.res.username;
            document.getElementById('E-mail').textContent = data.res.email;
            document.getElementById('Senha').textContent = data.res.password;
        })
        .catch(function(error) {
            console.error('Erro:', error);
        });
});