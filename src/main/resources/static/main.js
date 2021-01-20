$(document).ready(function() {

    //===================================lettura aziende=========

    $("#index").load("benvenuto.html #body-benvenuto") //function getAziende() 
    function getAziende(){
        //chiede ad Alessandro se la mappatura per chiamata get è "aziende"
        $.get("aziende", function(res) {

            for(let i = 0; i < res.length; i++) {
                $(`<tr>
                        <td data-id='${res[i].id}'>${res[i].ragionesociale}</td>
                        <td>${res[i].partitaiva}</td>
                        <td>${res[i].indirizzo}</td>
                        <td>${res[i].email}</td>
                        <td>${res[i].numerotelefono}</td>
                        <td><button class='modifica-azienda' data-id='${res[i].id}'>Modifica</button><td>
                        <td><button class='elimina-azienda' data-id='${res[i].id}'>Elimina</button><td>
                </tr>`).appendTo("#lista-aziende");

            }
        })
    } getAziende();
    //==================================================================================    

    //=================Eliminare azienda=======================================


    $('#lista-aziende').on('click', '.elimina-azienda', function() {
        const id = $(this).attr('data-id')
        eliminaAzienda(id, $(this).parent().parent())
    })

    function eliminaAzienda(id, rigaAzienda) {
        //chiamata personalizzata. controllare la mappatura
        $.ajax({
            url: `azienda/${id}`,
            type:'DELETE',
            success: function() {
                rigaAzienda.remove()
            }
        })
       

    }


    //===============================================================

    //getAziende();



    //==========================aggiungi azienda==================================


    //Controllare queste parte
    $('#apri-aggiungi-azienda').click( function() {
        $('#aggiungi-azienda-modal').css('display', 'block');
     })

     $('#aggiungi-azienda').click(function(){

            const c = { ragionesociale: $('#ragione-sociale').val(), 
                partitaiva: $('#piva').val(),
                indirizzo: $('#indirizzo').val(), 
                email: $('#email').val(),
                numerotelefono: $('#numero-telefono')};

                aggiungiAzienda(c);

                $('#ragione-sociale').val('');
                $('#piva').val('');
                $('#indirizzo').val('');
                $('#email').val('');
                $('#numero-telefono').val('');

                $('#aggiungi-azienda-modal').css('display', 'none');


        })
    

    function aggiungiAzienda(c) {
        $.ajax({

            type: 'POST',
            url: '/aziende',
            data: JSON.stringify(c),
			contentType: 'application/json',
			dataType: 'json',
			success: function(res) {
            },
            statusCode: {
                200: function() {
                    $('#lista-aziende').html('');
                    getAziende();
                }
            }


        })
    }


    $('.close-aggiungi-azienda').click(function(){
		$('#aggiungi-azienda-modal').css('display', 'none');
    })
    

//===========================================================


//=====================modifica azienda=====================

$('#modifica-azienda').load("ajax/modificaazienda.html", function() {

    const id = +$(this).attr('data-id')
    $.get(`/aziende/${id}`, function (res) {
        $('id').val(res.id);
        $('#ragione-sociale').val(res.ragionesociale);
        $('#indirizzo').val(res.indirizzo);
        $('#numero-telefono').val(res.numerotelefono);
        $('#piva').val(res.piva);
        $('#email').val(res.email);
        
    })
})

$('#modifica-azienda').click(function() {
    const c = { ragionesociale: $('#ragione-sociale').val(), 
                indirizzo: $('#indirizzo').val(), 
                numerotelefono: $('#numero-telefono'),
                partitaiva: $('#piva').val(),
                email: $('#email').val(),
                 };

                modificaAzienda();
})

function modificaAzienda() {

    $.ajax({
        type: 'PUT',
        url: '/aziende',
        data: JSON.stringify(),
        contentType: 'application/json',
        dataType: 'json',
        success: function(res) {
        },
        statusCode: {
            200: function() {
                $('#lista-aziende').html('');
                getAziende();

            }
        }

    })

}

$('#chiudi-modifica').click(function()  {
    $('#modifica-azienda').css('display', 'none');
})

})