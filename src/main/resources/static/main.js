$(document).ready(function() {

    //===================================lettura aziende=========

    $("#index").load("benvenuto.html #body-benvenuto")
    function getAziende(){
        $.get("aziende", function(res) {

            for(let i = 0; i < res.length; i++) {
                $(`<tr>
                        <td data-id='${res[i].id}'>${res[i].ragionesociale}</td>
                        <td>${res[i].partitaiva}</td>
                        <td>${res[i].indirizzo}</td>
                        <td>${res[i].email}</td>
                        <td>${res[i].ntelefono}</td>
                        <td><button class='apri-modifica-azienda' data-id='${res[i].id}'>Modifica</button><td>
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
            url: `aziende/${id}`,
            type:'DELETE',
            success: function() {
                rigaAzienda.remove()
            }
        })
       

    }


    //=======================================================================

    


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

$('#lista-aziende').on("click", ".apri-modifica-azienda", function() {
        

    const id = +$(this).attr('data-id')
    $.get(`/aziende/${id}`, function (res) {
        console.log(res);
        //$('id').val(res.id);
        $('#ragione-sociale-modifica').val(res.ragionesociale);
        $('#piva-modifica').val(res.partitaiva);
        $('#indirizzo-modifica').val(res.indirizzo);
        $('#email-modifica').val(res.email);
        $('#numero-telefono-modifica').val(res.ntelefono);
        
    })
    $('#modifica-azienda-modal').css('display', 'block');
})

$('#modifica-azienda').click(function() {
    const c = { ragionesociale: $('#ragione-sociale').val(), 
                partitaiva: $('#piva').val(),
                indirizzo: $('#indirizzo').val(), 
                email: $('#email').val(),
                ntelefono: $('#numero-telefono')
                
                 };

                modificaAzienda(c);

        $('#ragione-sociale').val('');
		$('#piva').val('');
		$('#indirizzo').val('');
		$('#email').val('');
		$('#numero-telefono').val('');
		$('#modifica-azienda-modal').css('display', 'none');	
})

//$('#modifica-azienda').click(function(){
   // $('#modifica-azienda-modal').css('display', 'block');
//})

function modificaAzienda(c) {

    $.ajax({
        type: 'PUT',
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

$('.close-modifica-azienda').click(function()  {
    $('#modifica-azienda-modal').css('display', 'none');
})


// function ricerca() {
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("ricerca-azienda");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("lista-aziende");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//           txtValue = td.textContent || td.innerText;
//           if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             tr[i].style.display = "";
//           } else {
//             tr[i].style.display = "none";
//           }
//         }
//       }       
//     }

$("#ricerca-azienda").keyup(function(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("ricerca-azienda");
    filter = input.value.toUpperCase();
    table = document.getElementById("lista-aziende");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
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



$('#index').on('click', '#pulsante-accedi-homepage', function() {
    console.log("hai premuto accedi")
    $('#body-benvenuto').remove();
    $('#index').load('sezione.html');
})


})