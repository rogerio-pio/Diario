document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    title.textContent = localStorage.getItem('data');  
})
function proximaPagina2(){
    if(document.getElementById('res2').value.trim() && document.getElementById('res3').value.trim()){
        localStorage.setItem('res2', document.getElementById('res2').value.trim());
        localStorage.setItem('res3', document.getElementById('res3').value.trim());
        window.location.href = 'diario_pagina4.html';
    }else{
        alert("Por favor, preencha os campos abaixo.")
    }
}
