function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function proximaPagina(){
    if(document.getElementById('res1').value.trim()){
        localStorage.setItem('res1', document.getElementById('res1').value.trim());
        window.location.href = 'diario_pagina9.html';
    }else{
        alert("Por favor, preencha o campo abaixo.")
    }
}
function proximaPagina3(){
    if(document.getElementById('res4').value.trim() && document.getElementById('res5').value.trim() && document.getElementById('res6').value.trim()){
        localStorage.setItem('res4', document.getElementById('res4').value.trim());
        localStorage.setItem('res5', document.getElementById('res5').value.trim());
        localStorage.setItem('res6', document.getElementById('res6').value.trim());
        window.location.href = 'diario_pagina6.html';
    }else{
        alert("Por favor, preencha os campos abaixo.")
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    fetch('http://localhost:8080/getNote', requestOptions)
    .then(response => response.json())
    .then(data => {
        const notesContainer = document.getElementById('notes-container');
        notesContainer.innerHTML = '';
        let dataAtualEncontrada = false;
        data.res.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
        if (Array.isArray(data.res)) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            
            data.res.forEach(item => {
                const noteElement = document.createElement('div');

                const creationDate = new Date(Date.parse(item.creation_date));
                const creationYear = creationDate.getFullYear();
                const creationMonth = creationDate.getMonth();
                const creationDay = creationDate.getDate();
                const formattedDate = formatDate(creationDate);
                const diaAtual = creationYear === currentYear && creationMonth === currentMonth && creationDay === currentDay;
  
                if(diaAtual){
                    noteElement.classList.add('newnote');
                    dataAtualEncontrada = true;
                }else{
                    noteElement.classList.add('notes');
                }

                noteElement.dataset.backendId = item.id;
                
                const dateElement = document.createElement('p');
                dateElement.textContent = formattedDate;
                dateElement.id = 'data';

                const divisor = document.createElement('p');
                divisor.id = 'slash';

                const resumeElement = document.createElement('p');
                resumeElement.textContent = item.response1;
                resumeElement.id = 'resume';

                noteElement.appendChild(dateElement);
                noteElement.appendChild(divisor);
                noteElement.appendChild(resumeElement);

                notesContainer.appendChild(noteElement);
            });

            if(data.res.length == 0 || !dataAtualEncontrada){ // Aqui preciso alterar para ele colocar o item como primeiro da lista
                const noteElement = document.createElement('div');
                noteElement.classList.add('newnote');
                const formattedDate = formatDate(currentDate);

                const dateElement = document.createElement('p');
                dateElement.textContent = formattedDate;
                dateElement.id = 'data';
                localStorage.setItem('data', formattedDate);
                const divisor = document.createElement('p');
                divisor.id = 'slash';

                const resumeElement = document.createElement('p');
                resumeElement.textContent = "Adicionar novo dia no seu diário";
                resumeElement.id = 'addnewnote';

                noteElement.appendChild(dateElement);
                noteElement.appendChild(divisor);
                noteElement.appendChild(resumeElement);

                noteElement.addEventListener('click', function() {
                    window.location.href = 'diariopag2.html';
                });

                notesContainer.appendChild(noteElement);
            }
        }
    })
    .catch(error => console.error('Erro ao obter dados do backend:', error));
});

function test(){
    const data = {
        res1: localStorage.getItem('res1'),
        res2: localStorage.getItem('res2'),
        res3: localStorage.getItem('res3'),
        res4: localStorage.getItem('res4'),
        res5: localStorage.getItem('res5'),
        res6: localStorage.getItem('res6'),
        res7: 'null',
        res8: 'null'
    }
    fetch('http://localhost:8080/newNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao enviar requisição para o servidor.');
    })
    .then(function(data) {
        alert("Nota adicionada com sucesso");
        window.location.href = "pagina8.html";
        console.log('Resposta do servidor:', data);
    })
    .catch(function(error) {
        alert("Erro ao cadastrar nota")
        console.error('Erro:', error);
    });
}



