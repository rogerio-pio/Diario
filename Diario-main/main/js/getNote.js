document.addEventListener('DOMContentLoaded', function () {
    const formData = {
        creation_date: localStorage.getItem('noteDate')
    }
        fetch('http://srv493893.hstgr.cloud:8080/getImgs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
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
        for(const key in data.msg){
            if (key.startsWith("img") && data.msg[key] !== null) {
                const imgElement = document.getElementById(key);
                const imagePath = `./Mydiary-Backend/uploads/${data.msg[key]}`;
                imgElement.src = imagePath;
            }else if(key.startsWith("img") && data.msg[key] === null){
                console.log("Sem imagens")
            }
        }
        fetch('http://srv493893.hstgr.cloud:8080/getNote', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Erro ao enviar requisição para o servidor.');
    })
    .then(function(data){
        data.res.forEach(item => {
            if(item.creation_date.slice(0, 10) == localStorage.getItem('noteDate')){
                for(const key in item){
                    if(key.startsWith("response")) {
                        const resElement = document.getElementById(key);
                        resElement.textContent = item[key];
                    }
                }
            }
        });
    }
    )
    })
    .catch(function(error) {
        console.error('Erro:', error);
    });
    
});

