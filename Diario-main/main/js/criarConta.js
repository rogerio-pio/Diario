document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        if(document.getElementById('senha').value === document.getElementById('confirmar-senha').value){
            var formData = {
                username: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                password: document.getElementById('senha').value
            };
            fetch('http://srv493893.hstgr.cloud:8080/signup', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao enviar requisição para o servidor.');
        })
        .then(function(data) {
            alert("Cadastro bem-sucedido");
            window.location.href = "pagina03.html";
            console.log('Resposta do servidor:', data);
        })
        .catch(function(error) {
            alert("Email já cadastrado")
            console.error('Erro:', error);
        });
        }else{
            alert("Senhas não correspondem")
        }
    });
});

