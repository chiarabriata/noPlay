$(document).ready(function () {
  
  var dataSet=[];
  var aziende=[];
  // var userValidation = "";

  if(localStorage['userValidation'] != 'admin') {
    $("#apri-aggiungi-azienda").css('display', 'none')
  }
  //====Partita iva====

  $(".partitaiva").on("input", function () {

    if ($(this).val() == "")
      $(".partitaiva").css({ backgroundColor: "" });

    else {
      if (checkPartitaIva($(this).val()))
        $(".partitaiva").css({ color: "green" }),
          $("#help-partitaiva").textContent = 'formattazione corretta';

      else
        $(".partitaiva").css({ color: "red" });
      $("#help-partitaiva").textContent = 'formattazione errata';


    }
  })

  var pi;
  function checkPartitaIva(pi) {
    pi = $('.partitaiva').val();
    if (pi == '') return false;
    else if (/^[0-9]{11}$/.test(pi)) return true;
    else return false;
  }

  // ====email

  $(".formattazione-email").on("input", function () {

    if ($(this).val() == "")
      $(".formattazione-email").css({ backgroundColor: "" });

    else {
      if (checkEmail($(this).val()))
        $(".formattazione-email").css({ color: "green" });

      else
        $(".formattazione-email").css({ color: "red" });


    }
  })

  var em;
  function checkEmail(em) {
    em = $('.formattazione-email').val();
    if (em == '') return false;
    else if (/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/.test(em)) return true;
    else return false;
  }





  // =======numero telefono


  $(".formattazione-telefono").on("input", function () {

    if ($(this).val() == "")
      $(".formattazione-telefono").css({ backgroundColor: "" });

    else {
      if (checkNumeroTelefono($(this).val()))
        $(".formattazione-telefono").css({ color: "green" });

      else
        $(".formattazione-telefono").css({ color: "red" });



    }
  })

  var nt;
  function checkNumeroTelefono(nt) {
    nt = $('.formattazione-telefono').val();
    if (nt == '') return false;
    else if (/^[0-9]{6,10}$/.test(nt)) return true;
    else return false;
  }


  //===================================lettura aziende=========

  $(".accesso").click(function(){
    //console.log($(".username-login").val())
    localStorage['userValidation'] = $(".username-login").val();
    console.log(userValidation);

  })

  $(".logout").click(function(){
    console.log("DISCONNESSO")
    window.localStorage.clear()
  })
  
  // $("html").load("sezione.html");
  function getAziende() {
    // var userValidation = document.getElementsByClassName("username-login").valueOf();
    console.log(localStorage['userValidation']);
    $.get("aziende", function (res) {
      for (let i = 0; i < res.length; i++) {
        aziende.push(res[i].ragionesociale)
        aziende.push(res[i].partitaiva)
        aziende.push(res[i].indirizzo)
        aziende.push(res[i].email)
        aziende.push(res[i].ntelefono)
        if(localStorage['userValidation'] != "admin") {
          aziende.push("<p></p>")
        }
        aziende.push(`<button class='apri-modifica-azienda' data-id='${res[i].id}'>Modifica</button>`)
        dataSet.push(aziende)
        aziende=[];
      }
      $('#myTable').DataTable( {
        language: {
          "infoEmpty": "Nessun risultato",
          "paginate": {
             "first": "Primo",
             "last": "Ultimo",
             "next": "Successivo",
             "previous": "Precedente"
          },
          "info": "Visualizzata pagina _PAGE_ di _PAGES_ totali",
          "lengthMenu": "Visualizza _MENU_ risultati",
          "emptyTable": "Nessun dato disponibile",
          "zeroRecords": "Nessun dato disponibile",
          "infoFiltered": "(Filtrati da _MAX_ risultati totali)",
          "search": "Cerca: "
        },
        destroy: true, 
        searching: true,
        data: dataSet,
        columns: [
            { title: "Ragione Sociale" },
            { title: "P.Iva" },
            { title: "Indirizzo" },
            { title: "E-mail" },
            { title: "N.tel" },
            { title: "Azioni" }
          ]
    } );
    dataSet=[];

    });
  }
  getAziende();
  //==================================================================================
  // <td><button class='elimina-azienda' data-id='${res[i].id}'>Elimina</><td> //COMMENTATO L'ELIMINA



  //=================Eliminare azienda=======================================


  $('#lista-aziende').on('click', '.elimina-azienda', function () {
    const id = $(this).attr('data-id')
    eliminaAzienda(id, $(this).parent().parent())
  })

  function eliminaAzienda(id, rigaAzienda) {
    //chiamata personalizzata. controllare la mappatura
    $.ajax({
      url: `aziende/${id}`,
      type: 'DELETE',
      success: function () {
        rigaAzienda.remove()
      }
    })


  }

  //==========================aggiungi azienda==================================
  
  //Controllare queste parte
  $("#apri-aggiungi-azienda").click(function () {
    $("#aggiungi-azienda-modal").css("display", "block");
  });
  
  
  $("#aggiungi-azienda").click(function () {
    // if (c.partitaiva.length == 11) {
    //   $("#piva").css("color", "green")
    // }
    const c = {
      ragionesociale: $("#ragione-sociale").val(),
      partitaiva: $("#piva").val(),
      indirizzo: $("#indirizzo").val(),
      email: $("#email").val(),
      ntelefono: $("#numero-telefono").val(),
    }; //MANCAVA IL .VAL()

    // console.log("Controllo esterno funzione: " + pi)
  
  // function checkPartitaIva(pi) {
  //   // pi = $('#piva').val();
  //   console.log("Controllo interno funzione: " + pi)
  //   if (pi == '') {
  //     return false;
  //   } else if (/^[0-9]{11}$/.test(pi)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   } 
  // }

  // function checkEmail(em) {
  //   // em = $('.formattazione-email').val();
  //   if (em == '') return false;
  //   else if (/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/.test(em)) return true;
  //   else return false;
  // }

  // function checkNumeroTelefono(nt) {
  //   // nt = $('.formattazione-telefono').val();
  //   if (nt == '') return false;
  //   else if (/^[0-9]{6,10}$/.test(nt)) return true;
  //   else return false;
  // }

    // console.log(pi);
    // console.log(em);
    // console.log(nt);

    if (checkPartitaIva(pi) && checkEmail(em) && checkNumeroTelefono(nt)) {
      console.log(pi);

      aggiungiAzienda(c);
      
      $("#ragione-sociale").val("");
      $("#piva").val("");
      $("#indirizzo").val("");
      $("#email").val("");
      $("#numero-telefono").val("");
      
      $("#aggiungi-azienda-modal").css("display", "none");
      console.log("Sono entrato nell'if");
    } else {
      console.log("Non sono entrato nell'if");
    }
    console.log("Sono fuori dal ciclo");
  });

  function aggiungiAzienda(c) {
    $.ajax({
      type: "POST",
      url: "/aziende",
      data: JSON.stringify(c),
      contentType: "application/json",
      dataType: "json",
      success: function (res) { },
      statusCode: {
        200: function () {
          $("#lista-aziende").html("");
          getAziende();
        },
      },
    });
  }

  $(".close-aggiungi-azienda").click(function () {
    $("#aggiungi-azienda-modal").css("display", "none");
    $('.modal').css("display", "none");
  });

  //===========================================================

  $("#lista-aziende").on("click", ".apri-modifica-azienda", function () {
    const id = +$(this).attr("data-id");
    $.get(`/aziende/${id}`, function (res) {
      $("#id-modifica").val(res.id); //AGGIUNTA LETTURA ID DELL'INPUT
      $("#ragione-sociale-modifica").val(res.ragionesociale);
      $("#piva-modifica").val(res.partitaiva);
      // $("#piva-modifica").val();
      $("#indirizzo-modifica").val(res.indirizzo);
      $("#email-modifica").val(res.email);
      $("#numero-telefono-modifica").val(res.ntelefono);
    });
    $("#modifica-azienda-modal").css("display", "block");
  });

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

  $("html").on("click", "#modifica-azienda", function () {
    const c = {
      id: +$("#id-modifica").val(), //AGGIUNTO ID CON IL + DAVANTI
      ragionesociale: $("#ragione-sociale-modifica").val(),
      partitaiva: $("#piva-modifica").val(),
      indirizzo: $("#indirizzo-modifica").val(),
      email: $("#email-modifica").val(),
      ntelefono: $("#numero-telefono-modifica").val(), //MANCAVA IL .VAL()
    };
    console.log(c.partitaiva);
    console.log(c.email);
    console.log(c.ntelefono);
    console.log("================");

    // pi = $('#piva-modifica').val(),
    // em = $('#email-modifica').val(),
    // nt = $('#numero-telefono-modifica').val();

    //MANCAVA IL .VAL()

    var pi1;
    function checkPartitaIva1(pi1) {
      pi1 = c.partitaiva;
      if (/^[0-9]{11}$/.test(pi1)) {
        return true;
      }
    }

    var em1;
    function checkEmail1(em1) {
      em1 = c.email;
      if (/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/.test(em1)) {
        return true;
      }
    }

    var nt1;
    function checkNumeroTelefono1(nt1) {
      nt1 = c.ntelefono;
      if (/^[0-9]{6,10}$/.test(nt1)) {
        return true;
      }
    }

    if (
      checkPartitaIva1(pi1) &&
      checkEmail1(em1) &&
      checkNumeroTelefono1(nt1)
    ) {
      modificaAzienda(c);

      $("#ragione-sociale-modifica").val("");
      $("#piva-modifica").val("");
      $("#indirizzo-modifica").val("");
      $("#email-modifica").val("");
      $("#numero-telefono-modifica").val("");
      $("#modifica-azienda-modal").css("display", "none");
    } else if (
      checkPartitaIva1() &&
      !checkEmail1(em1) &&
      !checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "green" });
      $("#email-modifica").css({ color: "red" });
      $("#numero-telefono-modifica").css({ color: "red" });
    } else if (
      checkPartitaIva1() &&
      checkEmail1(em1) &&
      !checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "green" });
      $("#email-modifica").css({ color: "green" });
      $("#numero-telefono-modifica").css({ color: "red" });
    } else if (
      checkPartitaIva1() &&
      !checkEmail1(em1) &&
      checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "green" });
      $("#email-modifica").css({ color: "red" });
      $("#numero-telefono-modifica").css({ color: "green" });
    } else if (
      !checkPartitaIva1() &&
      checkEmail1(em1) &&
      !checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "red" });
      $("#email-modifica").css({ color: "green" });
      $("#numero-telefono-modifica").css({ color: "red" });
    } else if (
      !checkPartitaIva1() &&
      checkEmail1(em1) &&
      checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "red" });
      $("#email-modifica").css({ color: "green" });
      $("#numero-telefono-modifica").css({ color: "green" });
    } else if (
      !checkPartitaIva1() &&
      !checkEmail1(em1) &&
      checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "red" });
      $("#email-modifica").css({ color: "red" });
      $("#numero-telefono-modifica").css({ color: "green" });
    } else if (
      checkPartitaIva1() &&
      !checkEmail1(em1) &&
      checkNumeroTelefono1(nt1)
    ) {
      $("#piva-modifica").css({ color: "green" });
      $("#email-modifica").css({ color: "red" });
      $("#numero-telefono-modifica").css({ color: "green" });
    } else if (
      !(checkPartitaIva1() && checkEmail1(em1) && checkNumeroTelefono1(nt1))
    ) {
      $("#piva-modifica").css({ color: "red" });
      $("#email-modifica").css({ color: "red" });
      $("#numero-telefono-modifica").css({ color: "red" });
    }

    console.log(c.partitaiva);
    console.log(c.email);
    console.log(c.ntelefono);
    console.log("================");
  });

  //$('#modifica-azienda').click(function(){
  // $('#modifica-azienda-modal').css('display', 'block');
  //})

  function modificaAzienda(c) {
    $.ajax({
      type: "PUT",
      url: "/aziende",
      data: JSON.stringify(c),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-aziende").html("");
          getAziende();
        },
      },
    });
  }

  $(".close-modifica-azienda").click(function () {
    $("#modifica-azienda-modal").css("display", "none");
  });





  

  $("#ricerca-azienda").keyup(function () {
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
  });

  //===================== modali FAQ =====================

  // INDEX.html
  $("#apri-modale-faq-index").click(function () {
    $("#modale-faq-index").modal("display", "block");
  });

  // $("#chiudi-faq-index").click(function () {
  //   $("#modale-faq-index").css("display", "none");
  //   $("#contenuto-modale-faq-index").html("");
  // });

  $(".chiudi-modale-faq-index").click(function () {
    $("#modale-faq-index").css("display", "none");
    $("#contenuto-modale-faq-index").html("");
  });


  
  
  
  
  
  // login.html
  $("#apri-modale-faq-login").click(function () {
    $("#modale-faq-login").modal("display", "block");
  });

  // $("#chiudi-faq-login").click(function () {
  //   $("#modale-faq-login").css("display", "none");
  //   $("#contenuto-modale-faq-login").html("");
  // });

  $(".chiudi-modale-faq-login").click(function () {
    $("#modale-faq-login").css("display", "none");
    $("#contenuto-modale-faq-login").html("");
  });

  
  
  
  
  
  
  
  
  
  //AZIENDE.html
  $("#apri-modale-faq-aziende").click(function () {
    $("#modale-faq-aziende").modal("display", "block");
  });

  
  $(".chiudi-modale-faq-aziende").click(function () {
    $("#modale-faq-aziende").css("display", "none");
    $("#contenuto-modale-faq-aziende").html("");
  });


  //DIPENDENTI.html
  $("#apri-modale-faq-dipendenti").click(function () {
    $("#modale-faq-dipendenti").modal("display", "block");
  });

  $(".chiudi-modale-faq-dipendenti").click(function () {
    $("#modale-faq-dipendenti").css("display", "none");
    $("#contenuto-modale-faq-dipendenti").html("");
  });


  //SEZIONE.html
  // $("#apri-modale-faq-sezione").click(function () {
  //   $(`
  //       <p>FAQ SEZIONE...</p>
  //     `).appendTo("#contenuto-modale-faq-sezione");
  //   $("#modale-faq-sezione").css("display", "block");
  // });

  // $("#chiudi-faq-sezione").click(function () {
  //   $("#modale-faq-sezione").css("display", "none");
  //   $("#contenuto-modale-faq-sezione").html("");
  // });

  // $(".chiudi-modale-faq-sezione").click(function () {
  //   $("#modale-faq-sezione").css("display", "none");
  //   $("#contenuto-modale-faq-sezione").html("");
  // });

});