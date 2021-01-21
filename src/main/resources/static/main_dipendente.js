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
                        <td><button class='dettaglio-dipendente' data-id='${res[i].id}'>Dettaglio</button></a><td>
                        <td><button class='apri-modifica-dipendente' data-id='${res[i].id}'>Modifica</button><td>
                        </tr>
                        `).appendTo("#lista-dipendenti");

            }
        })
        }

    getListaDipendenti();

    // <td><button class='elimina-dipendente' data-id='${res[i].id}'>Elimina</button><td>

    // =========================== dettaglio dipendente ====================================

    $('html').on('click', '.dettaglio-dipendente', function() {
        console.log("DETTAGLIO")
        const id = +$(this).attr('data-id');
        console.log(id)
        //window.location.href = 'dettagliodipendente.html'
        //$('#body-dettaglio-dipendente').html('');
        getDettaglioDipendente(id)
    })

    function getDettaglioDipendente(id) {
        
        $('html').load('dettagliodipendente.html')

       

        $.get(`dipendenti/${id}`, function(res) {
			$(`
				<p>Nome: ${res.nome}</p>
                <p>Cognome: ${res.cognome}</p>
                <p>Data di nascita: ${res.ddn}</p>
                <p>Stipendio: ${res.stipendio} Euro</p>
                <p>Data di assunzione: ${res.dataassunzione}</p>
                <p>Nome: ${res.ruolo}</p>
                <p>Azienda: ${res.azienda.ragionesociale}</p>
            `).appendTo('#dettaglio-dipendente');
            $(`<p>Dettaglio di ${res.nome} ${res.cognome}</p>`).appendTo('#titolo-dettaglio-dipendente');
        })
    }
    


    $('#lista-dipendenti').on('click', '.dettaglio-dipendente', function() {
		const id = +$(this).attr('data-id');
		getDettaglioDipendente(id);
	})
	
	
	

    // =========================== modale aggiungi dipendente ====================================


    $('#apri-aggiungi-dipendente').click( function() {
        $('#aggiungi-dipendente-modal').css('display', 'block');
        $('#azienda-dipendente').html('');
        getAziendaDipendente();
     })


     $('#aggiungi-dipendente').click(function(){
        const c = { nome: $('#nome').val(), 
                cognome: $('#cognome').val(),
                ddn: $('#ddn').val(), 
                stipendio: $('#stipendio').val(),
                dataassunzione: $('#data-assunzione').val(),
                ruolo: $('#ruolo').val(),
                azienda: {
                    id: $('#azienda-dipendente').val(),
                    ragionesociale: "",
                    indirizzo: "",
                    numerotelefono: "",
                    partitaiva: "",
                    email: ""
                }
            };

                aggiungiDipendente(c);

                $('#nome').val('');
                $('#cognome').val('');
                $('#ddn').val('');
                $('#stipendio').val('');
                $('#data-assunzione').val('');
                $('#ruolo').val('');
                $('#azienda-dipendente').val('');

                $('#aggiungi-dipendente-modal').css('display', 'none');
    })

    function getAziendaDipendente() {
		$.get("aziende", function(res) {
			for(let i = 0; i < res.length; i++) {
				$(`<option class='azienda-modale' value='${res[i].id}'>${res[i].ragionesociale}</option>`).appendTo("#azienda-dipendente");
			}
		})
    }
    
    
    
    function aggiungiDipendente(c) {
        $.ajax({
            type: 'POST',
            url: '/dipendenti',
            data: JSON.stringify(c),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res) {
            },
            statusCode: {
                200: function() {
                    $('#lista-dipendenti').html('');
                    getListaDipendenti();
                }
            }
        })
    }
    
    
    $('.close-aggiungi-dipendente').click(function(){
        $('#aggiungi-dipendente-modal').css('display', 'none');
    })
    
    
    // =========================== modale modifica dipendente ====================================    
    
    
    function getAziendaDipendenteModifica() {
        $.get("aziende", function(res) {
            for(let i = 0; i < res.length; i++) {
                $(`<option class='azienda-modale-modifica' value='${res[i].id}'>${res[i].ragionesociale}</option>`).appendTo("#azienda-dipendente-modifica");
            }
        })
    }
    
	$('#lista-dipendenti').on('click', '.apri-modifica-dipendente', function() { //SISTEMATO L'EVENTO
    getAziendaDipendenteModifica();
    const id = +$(this).attr('data-id')
    $.get(`/dipendenti/${id}`, function(res){
        console.log(res)
        $('#id-modifica').val(res.id); //AGGIUNTO ID
        $('#nome-modifica').val(res.nome);
        $('#cognome-modifica').val(res.cognome);
        $('#ddn-modifica').val(res.ddn);
        $('#stipendio-modifica').val(res.stipendio);
        $('#data-assunzione-modifica').val(res.dataassunzione);
        $('#ruolo-modifica').val(res.ruolo);
        
        $('#azienda-dipendente-modifica').val(res.azienda);//AGGIUNTA SELEZIONE AZIENDA
        
    })
    $('#modifica-dipendente-modal').css('display', 'block');
	})


	$('html').on('click', '#modifica-dipendente', function(){ //Era selezionata la classe quando era invece da utilizzare l'ID
            const c = { 
            id: $('#id-modifica').val(),
        nome: $('#nome-modifica').val(), 
        cognome: $('#cognome-modifica').val(), 
        ddn: $('#ddn-modifica').val(), 
        stipendio: $('#stipendio-modifica').val(), 
        dataassunzione: $('#data-assunzione-modifica').val(), 
        ruolo: $('#ruolo-modifica').val(), 
        azienda: {
			id: $('#azienda-dipendente-modifica').val() //CANCELLATA LA PARTE CHE NON SERVIVA E CAUSAVA ERRORE
		}
     };

     
        // $.ajax({
        //     type: 'PUT',
        //     url: '/dipendenti',
        //     data: JSON.stringify(c),
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     success: function(res) {
        //     },
        //     statusCode: {
        //         200: function() {
        //             $('#lista-dipendenti').html('');
        //             getListaDipendenti();
        //             $('#modifica-dipendente-modal').css('display', 'none');
        //         }
        //     }
        // })
		
		modificaDipendente(c);
		
		$('#nome-modifica').val('');
        $('#cognome-modifica').val('');
        $('#ddn-modifica').val('');
        $('#stipendio-modifica').val('');
        $('#data-assunzione-modifica').val('');
        $('#ruolo-modifica').val('');
		$('#azienda-dipendente-modifica').val(''); //RIMASTO UN PEZZO DI CATEGORIA
		$('#modifica-dipendente-modal').css('display', 'none');	
	})

	function modificaDipendente(c) {
		$.ajax({
			type: 'PUT',
			url: '/dipendenti',
			data: JSON.stringify(c),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res) {
			},
			statusCode: {
    			200: function() {
                    $('#lista-dipendenti').html('');
                    getListaDipendenti();
					$('#modifica-dipendente-modal').css('display', 'none');
    			}
  			}
		})
	}

	$('.close-modifica-dipendente').click(function() { //RICHIAMA UNA CLASSE
		$('#modifica-dipendente-modal').css('display', 'none');
	})


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