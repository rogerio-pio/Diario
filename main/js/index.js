function proximaPagina(){
    window.location.href = '../pagina02.html';
}
function diario(){
    window.location.href = '../pagina04.html';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('senha').value,
        };
        fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            alert("Email e/ou senha inválidos");
            throw new Error('Erro ao enviar requisição para o servidor.');
        })
        .then(function(data) {
            alert("Login bem sucedido")
            localStorage.setItem('token', data.token);
            window.location.href = '../pagina03.html';
        })
        .catch(function(error) {
            console.error('Erro:', error);
        });
    });
});



