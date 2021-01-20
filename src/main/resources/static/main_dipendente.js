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










    


    








})