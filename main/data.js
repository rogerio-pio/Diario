document.addEventListener("DOMContentLoaded", function() {
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = meses[dataAtual.getMonth()];
    var dataFormatada = dia + " de " + mes;
    
    var elementoData = document.getElementById("dataAtual");
    elementoData.textContent = dataFormatada;
});