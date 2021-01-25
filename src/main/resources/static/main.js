$(document).ready(function() {



    //==============================formattazione campi html==============

//     //====Partita iva====

//     $(".partitaiva").on("input", function() {

//         if($(this).val() == "")
//         $(".partitaiva").css({backgroundColor:""});

//         else {
//             if (checkPartitaIva($(this).val()))
//                 $(".partitaiva").css({color:"green"}),
//                 $("#help-partitaiva").textContent='formattazione corretta';
               
//             else 
//                 $(".partitaiva").css({color:"red"});
//                 $("#help-partitaiva").textContent='formattazione errata';
                
                
//         }
//     })

//          var pi;
//     function checkPartitaIva(pi) {
//         pi = $('.partitaiva').val();
//         if (pi == '') return false;
//         else if (/^[0-9]{11}$/.test(pi)) return true;
//         else return false;
//       }

// //====email

//     $(".formattazione-email").on("input", function() {

//         if($(this).val() == "")
//         $(".formattazione-email").css({backgroundColor:""});

//         else {
//             if (checkEmail($(this).val()))
//                 $(".formattazione-email").css({color:"green"});
            
//             else 
//                 $(".formattazione-email").css({color:"red"});
                
                
//         }
//     })

//     var em;
//     function checkEmail(em) {
//         em = $('.formattazione-email').val();
//         if (em == '') return false;
//         else if (/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/.test(em)) return true;
//         else return false;
//     }


// //=======numero telefono


//     $(".formattazione-telefono").on("input", function() {

//         if($(this).val() == "")
//         $(".formattazione-telefono").css({backgroundColor:""});

//         else {
//             if (checkNumeroTelefono($(this).val()))
//                 $(".formattazione-telefono").css({color:"green"});
            
//             else 
//                 $(".formattazione-telefono").css({color:"red"});
               
                
                
//         }
//     })

//     var nt;
//     function checkNumeroTelefono(nt) {
//         nt = $('.formattazione-telefono').val();
//         if (nt == '') return false;
//         else if (/^[0-9]{6,10}$/.test(nt)) return true;
//         else return false;
//     }



// //=====





    //===================================lettura aziende=========

    $("#index").load("benvenuto.html #body-benvenuto")
    function getAziende(){
        $.get("aziende", function(res) {

            for(let i = 0; i < res.length; i++) {
                $(`<tr class="item">
                        <td data-id='${res[i].id}'>${res[i].ragionesociale}</td>
                        <td>${res[i].partitaiva}</td>
                        <td>${res[i].indirizzo}</td>
                        <td>${res[i].email}</td>
                        <td>${res[i].ntelefono}</td>
                        <td><button class='apri-modifica-azienda' data-id='${res[i].id}'>Modifica</button></td>
                        </tr>`).appendTo("#lista-aziende");

            }
        })
    } getAziende();
    //==================================================================================    
    // <td><button class='elimina-azienda' data-id='${res[i].id}'>Elimina</><td> //COMMENTATO L'ELIMINA

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


    // ho cambiato css con modal 
    //Controllare queste parte
    $('#apri-aggiungi-azienda').click( function() {
        $('#aggiungi-azienda-modal').modal('display', 'block');
     })
     $('#aggiungi-azienda').click(function(){
            

            

            const c = { ragionesociale: $('#ragione-sociale').val(), 
                partitaiva: $('#piva').val(),
                indirizzo: $('#indirizzo').val(), 
                email: $('#email').val(),
                ntelefono: $('#numero-telefono').val()}; //MANCAVA IL .VAL()


                // if(checkPartitaIva(pi) && checkEmail(em) && checkNumeroTelefono(nt)){
                //     console.log(pi);
                    

                
                aggiungiAzienda(c);

                $('#ragione-sociale').val('');
                $('#piva').val('');
                $('#indirizzo').val('');
                $('#email').val('');
                $('#numero-telefono').val('');

                $('#aggiungi-azienda-modal').modal('display', 'none');

                // }
                console.log("aggiunta non effettuata")
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
        $('.modal').css('display', 'none');
    })
    

//===========================================================


// ho cambiato .css con .modal
//=====================modifica azienda=====================

$('#lista-aziende').on("click", ".apri-modifica-azienda", function() {
        

    const id = +$(this).attr('data-id')
    $.get(`/aziende/${id}`, function (res) {
        $('#id-modifica').val(res.id); //AGGIUNTA LETTURA ID DELL'INPUT
        $('#ragione-sociale-modifica').val(res.ragionesociale);
        $('#piva-modifica').val(res.partitaiva);
        $('#indirizzo-modifica').val(res.indirizzo);
        $('#email-modifica').val(res.email);
        $('#numero-telefono-modifica').val(res.ntelefono);
        
    })
    $('#modifica-azienda-modal').modal('display', 'block');
})

// $('#modifica-azienda').click(function() {
//     const c = { ragionesociale: $('#ragione-sociale-modifica').val(), 
//                 partitaiva: $('#piva-modifica').val(),
//                 indirizzo: $('#indirizzo-modifica').val(), 
//                 email: $('#email-modifica').val(),
//                 ntelefono: $('#numero-telefono-modifica').val() //MANCAVA IL .VAL()
                
//                  };
//                 console.log(c);
//                 modificaAzienda(c);

//         $('#ragione-sociale').val('');
// 		$('#piva').val('');
// 		$('#indirizzo').val('');
// 		$('#email').val('');
// 		$('#numero-telefono').val('');
// 		$('#modifica-azienda-modal').css('display', 'none');	
// })

$('html').on('click', '#modifica-azienda', function() {

    

    const c = { id: +$('#id-modifica').val(),   //AGGIUNTO ID CON IL + DAVANTI
                ragionesociale: $('#ragione-sociale-modifica').val(), 
                partitaiva: $('#piva-modifica').val(),
                indirizzo: $('#indirizzo-modifica').val(), 
                email: $('#email-modifica').val(),
                ntelefono: $('#numero-telefono-modifica').val() //MANCAVA IL .VAL()
                
                 };

                
                // pi = $('#piva-modifica').val(),
                // em = $('#email-modifica').val(),
                // nt = $('#numero-telefono-modifica').val();

                
                

                 //MANCAVA IL .VAL()
                 
                   
        
                modificaAzienda(c); 
                

                    $('#ragione-sociale-modifica').val('');
                    $('#piva-modifica').val('');
                    $('#indirizzo-modifica').val('');
                    $('#email-modifica').val('');
                    $('#numero-telefono-modifica').val('');
                    $('#modifica-azienda-modal').modal('display', 'none');	
                 
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

})