
function criaTabuleiro(colunas,linhas){
    
   
    let tr = "";
    let td = "";
    var table = document.createElement('table');
    //var tbody = document.createElement('tbody');

    for(let i=0;i<linhas;i++){

        tr = document.createElement('tr');
        table.appendChild(tr);
        for(let x=0;x<colunas;x++){
            td = document.createElement('td');
            table.appendChild(td);
        }
    }
    //table.appendChild(tbody);

    document.body.appendChild(table);
}

function teste(){


}
