document.addEventListener('DOMContentLoaded', () => {
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    console.log(data); 
    var title = document.querySelector('#title')
    console.log(title);
    const meses = ["Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"]
    title.textContent = `${data.day} de ${meses[data.month - 1]}`
    
      
})
