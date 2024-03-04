function formatDate(date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
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

            if(data.res.length == 0 || !dataAtualEncontrada){
                const noteElement = document.createElement('div');
                noteElement.classList.add('newnote');
                const formattedDate = formatDate(currentDate);

                const dateElement = document.createElement('p');
                dateElement.textContent = formattedDate;
                dateElement.id = 'data';

                const divisor = document.createElement('p');
                divisor.id = 'slash';

                const resumeElement = document.createElement('p');
                resumeElement.textContent = "Adicionar novo dia no seu diário";
                resumeElement.id = 'addnewnote';

                noteElement.appendChild(dateElement);
                noteElement.appendChild(divisor);
                noteElement.appendChild(resumeElement);

                notesContainer.appendChild(noteElement);
            }
        }
    })
    .catch(error => console.error('Erro ao obter dados do backend:', error));
});
