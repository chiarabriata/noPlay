$(document).ready(function() {



    // =========================== lettura dipendenti ====================================
    function getListaDipendenti() {
        
        $.get("dipendenti", function(res) {

            for(let i = 0; i < res.length; i++) {
                $(`
                <tr>
                        <td data-id='${res[i].id}'>${res[i].nome}</td>
                        <td>${res[i].cognome}</td>
                        <td>${res[i].ruolo}</td>
                        <td><button class='dettaglio-dipendente' data-id='${res[i].id}'>Dettaglio</button><td>
                        <td><button class='modifica-dipendente' data-id='${res[i].id}'>Modifica</button><td>
                        <td><button class='elimina-dipendente' data-id='${res[i].id}'>Elimina</button><td>
                </tr>
                `).appendTo("#lista-dipendenti");

            }
        })
        }

    getListaDipendenti();


    // =========================== dettaglio dipendente ====================================














    // =========================== modale aggiungi dipendente ====================================


    $('#apri-aggiungi-dipendente').click( function() {
        $('#aggiungi-dipendente-modal').css('display', 'block');
     })

     $('#aggiungi-dipendente').click(function(){
        const c = { nome: $('#nome').val(), 
                cognome: $('#cognome').val(),
                ddn: $('#ddn').val(), 
                stipendio: $('#stipendio').val(),
                dataassunzione: $('#data-assunzione').val(),
                ruolo: $('#ruolo').val()};

                // aggiungiDipendente(c);

                $('#nome').val('');
                $('#cognome').val('');
                $('#ddn').val('');
                $('#stipendio').val('');
                $('#data-assunzione').val('');
                $('#ruolo').val('');

                $('#aggiungi-dipendente-modal').css('display', 'none');
    })


    function aggiungiDipendente(c) {
        // FARE CHIAMATA POST
    }
    

    $('.close-aggiungi-dipendente').click(function(){
		$('#aggiungi-dipendente-modal').css('display', 'none');
    })


    // =========================== modale modifica dipendente ====================================    





    $("#ricerca-dipendente").keyup(function(){
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("ricerca-dipendente");
        filter = input.value.toUpperCase();
        table = document.getElementById("lista-dipendenti");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }
          }      
    })




    


    








})