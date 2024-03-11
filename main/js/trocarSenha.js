document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        if(senha == confirmarSenha){
            var formData = {
                username: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                password: document.getElementById('senha').value
            };
            fetch('http://localhost:8080/editUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(function(response){
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao enviar requisição para o servidor.');
            })
            .then(function(data) {
                var msg = JSON.stringify(data.msg);
                alert(msg.substring(1, msg.length - 1));
                window.location.href = "pagina02.html"
            })
            .catch(function(error) {
                console.error('Erro:', error);
            });
        }else{
            alert("Senhas não correspondem");
        }
    });
});