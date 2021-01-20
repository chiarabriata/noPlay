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



	$('#lista-prodotti').on('click', '.open-update-prodotto', function() {
		const id = +$(this).attr('data-id')
		$.get(`/dipendenti/${id}`, function(res){
		$('#nome-modifica').val(res.nome);
        $('#cognome-modifica').val(res.cognome);
        $('#ddn-modifica').val(res.ddn);
        $('#stipendio-modifica').val(res.stipendio);
        $('#data-assunzione-modifica').val(res.dataassunzione);
        $('#ruolo-modifica').val(res.ruolo);
		$('#azienda-dipendente-modifica').val(res.azienda);
		
		})
		//
		$('#modifica-dipendente-modal').css('display', 'block');
		getAziendaDipendenteModifica();
	})


	$('.modifica-dipendente').click(function(){
        const c = { nome: $('#nome-modifica').val(), 
        cognome: $('#cognome-modifica').val(), 
        ddn: $('#ddn-modifica').val(), 
        stipendio: $('#stipendio-modifica').val(), 
        dataassunzione: $('#data-assunzione-modifica').val(), 
        ruolo: $('#ruolo-modifica').val(), 
        categoria: {
			id: $('#azienda-dipendente-modifica').val(),
            ragionesociale: "",
            partitaiva: "",
            indirizzo: "",
            email: "",
            ntelefono: ""
		}
	 };
		
		modificaDipendente(c);
		
		$('#nome-modifica').val('');
        $('#cognome-modifica').val('');
        $('#ddn-modifica').val('');
        $('#stipendio-modifica').val('');
        $('#data-assunzione-modifica').val('');
        $('#ruolo-modifica').val('');
		$('#categoria-modal').val('');
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

	$('#close-modifica-dipendente').click(function() {
		$('#modifica-dipendente-modal').css('display', 'none');
	})




})