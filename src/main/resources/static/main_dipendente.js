$(document).ready(function () {



  // =========================== lettura dipendenti ====================================
  function getListaDipendenti() {
    $.get("dipendenti", function (res) {
      for (let i = 0; i < res.length; i++) {
        $(`
                <tr class="item">
                        <td data-id='${res[i].id}'>${res[i].nome}</td>
                        <td>${res[i].cognome}</td>
                        <td>${res[i].ruolo}</td>
                        <td><button class='dettaglio-dipendente' data-id='${res[i].id}'>Dettaglio</button></a><span> </span><button class='apri-modifica-dipendente' data-id='${res[i].id}'>Modifica</button></td>
                        </tr>
                        `).appendTo("#lista-dipendenti");
      }
    });
  }

  getListaDipendenti();

  // <td><button class='elimina-dipendente' data-id='${res[i].id}'>Elimina</button><td>

  // =========================== dettaglio dipendente ====================================

  $("html").on("click", ".dettaglio-dipendente", function () {
    //console.log("DETTAGLIO")
    const id = +$(this).attr("data-id");
    //console.log(id)
    //window.location.href = 'dettagliodipendente.html'
    //$('html').remove('html')

    //$('#body-dettaglio-dipendente').html('');
    getDettaglioDipendente(id);
  });

  function getDettaglioDipendente(id) {
    $("html").load("dettagliodipendente.html #dettaglio-dipendente");

    $.get(`dipendenti/${id}`, function (res) {
      $(` 
            <h1>Dettaglio di ${res.nome} ${res.cognome}</h1>
            </span><a href="dipendenti.html"><button type="button" name="indietro">Indietro</button></a><span>
                </span><a href="benvenuto.html"><button type="button" name="logout">Logout</button></a>
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
    

    //============================= ricerca ===========================================

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


  // =========================== modale aggiungi dipendente ====================================

  $("#apri-aggiungi-dipendente").click(function () {
    $("#aggiungi-dipendente-modal").css("display", "block");
    $("#azienda-dipendente").html("");
    getAziendaDipendente();
  });

  // CREAZIONE VARIABILI PER FORMATTAZIONE DIPENDENTI
  var today = new Date();
  var annocorrente = today.getFullYear();

  var ddn_dipendente_x;
  var anno_dipendente_x;
  var zzz; // validità età dipendente
  var data_assunzione_dipendente_x;
  var anno_assunzione_dipendente_x;
  var yyy; // validità anno assunzione dipendente

  $("#aggiungi-dipendente").click(function () {
    const c = {
      nome: $("#nome").val(),
      cognome: $("#cognome").val(),
      ddn: $("#ddn").val(),
      stipendio: $("#stipendio").val(),
      dataassunzione: $("#data-assunzione").val(),
      ruolo: $("#ruolo").val(),
      azienda: {
        id: $("#azienda-dipendente").val(),
        ragionesociale: "",
        indirizzo: "",
        numerotelefono: "",
        partitaiva: "",
        email: "",
      },
    };

    ddn_dipendente_x = new Date(c.ddn);
    anno_dipendente_x = ddn_dipendente_x.getFullYear();
    zzz = annocorrente - anno_dipendente_x;

    data_assunzione_dipendente_x = new Date(c.dataassunzione);
    anno_assunzione_dipendente_x = data_assunzione_dipendente_x.getFullYear();
    yyy = anno_dipendente_x + 18;

    function XXX() {
      if (zzz >= 18) {
        return true;
      }
    }

    function YYY() {
      if (
        anno_assunzione_dipendente_x <= annocorrente &&
        anno_assunzione_dipendente_x >= yyy
      ) {
        return true;
      }
    }

    // FORMATTAZIONE DATE AGGIUNGI DIPENDENTE
    if (XXX() && YYY()) {
      aggiungiDipendente(c);

      $("#nome").val("");
      $("#cognome").val("");
      $("#ddn").val("");
      $("#stipendio").val("");
      $("#data-assunzione").val("");
      $("#ruolo").val("");
      $("#azienda-dipendente").val("");

      $("#aggiungi-dipendente-modal").css("display", "none");
    } else if (!XXX() && YYY()) {
      alert("Inserire una data di nascita valida");
      $(".formattazione-ddn").css({ color: "red" });
      $(".formattazione-data-assunzione").css({ color: "green" });
      $("#ddn").val("");
    } else if (!YYY() && XXX()) {
      alert("Inserire una data di assunzione valida");
      $(".formattazione-data-assunzione").css({ color: "red" });
      $(".formattazione-ddn").css({ color: "green" });
      $("#data-assunzione").val("");
    }
    else if(!(XXX() && (anno_assunzione_dipendente_x > annocorrente))) {
      alert('Inserire una data di nascita e una data di assunzione valida');
      $(".formattazione-data-assunzione").css({ color: "red" });
      $(".formattazione-ddn").css({ color: "red" });
      $('#ddn').val('');
      $('#data-assunzione').val('');
    }
  });

  function getAziendaDipendente() {
    $.get("aziende", function (res) {
      for (let i = 0; i < res.length; i++) {
        $(
          `<option class='azienda-modale' value='${res[i].id}'>${res[i].ragionesociale}</option>`
        ).appendTo("#azienda-dipendente");
      }
    });
  }

  function aggiungiDipendente(c) {
    $.ajax({
      type: "POST",
      url: "/dipendenti",
      data: JSON.stringify(c),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-dipendenti").html("");
          getListaDipendenti();
        },
      },
    });
  }

  $(".close-aggiungi-dipendente").click(function () {
    $("#aggiungi-dipendente-modal").css("display", "none");
  });

  //=========================== modifica dipendente ===========================================

  function getAziendaDipendenteModifica() {
    $.get("aziende", function (res) {
      for (let i = 0; i < res.length; i++) {
        $(
          `<option class='azienda-modale-modifica' value='${res[i].id}'>${res[i].ragionesociale}</option>`
        ).appendTo("#azienda-dipendente-modifica");
      }
    });
  }

  $("#lista-dipendenti").on("click", ".apri-modifica-dipendente", function () {
    //SISTEMATO L'EVENTO
    getAziendaDipendenteModifica();
    const id = +$(this).attr("data-id");
    $.get(`/dipendenti/${id}`, function (res) {
      console.log(res);
      $("#id-modifica").val(res.id); //AGGIUNTO ID
      $("#nome-modifica").val(res.nome);
      $("#cognome-modifica").val(res.cognome);
      $("#ddn-modifica").val(res.ddn);
      $("#stipendio-modifica").val(res.stipendio);
      $("#data-assunzione-modifica").val(res.dataassunzione);
      $("#ruolo-modifica").val(res.ruolo);

      $("#azienda-dipendente-modifica").val(res.azienda); //AGGIUNTA SELEZIONE AZIENDA
    });
    $("#modifica-dipendente-modal").css("display", "block");
  });

  $("html").on("click", "#modifica-dipendente", function () {
    //Era selezionata la classe quando era invece da utilizzare l'ID
    const c = {
      id: $("#id-modifica").val(),
      nome: $("#nome-modifica").val(),
      cognome: $("#cognome-modifica").val(),
      ddn: $("#ddn-modifica").val(),
      stipendio: $("#stipendio-modifica").val(),
      dataassunzione: $("#data-assunzione-modifica").val(),
      ruolo: $("#ruolo-modifica").val(),
      azienda: {
        id: $("#azienda-dipendente-modifica").val(), //CANCELLATA LA PARTE CHE NON SERVIVA E CAUSAVA ERRORE
      },
    };

    // FORMATTAZIONE DATE MODIFICA DIPENDENTE

    var ddn_dipendente_x2;
    var anno_dipendente_x2;
    var zzz2; // validità età dipendente
    var data_assunzione_dipendente_x2;
    var anno_assunzione_dipendente_x2;
    var yyy2; // validità anno assunzione dipendente

    ddn_dipendente_x2 = new Date(c.ddn);
    anno_dipendente_x2 = ddn_dipendente_x2.getFullYear();
    zzz2 = annocorrente - anno_dipendente_x2;

    data_assunzione_dipendente_x2 = new Date(c.dataassunzione);
    anno_assunzione_dipendente_x2 = data_assunzione_dipendente_x2.getFullYear();
    yyy2 = anno_dipendente_x2 + 18;

    function XXX2() {
      if (zzz2 >= 18) {
        return true;
      }
    }

    function YYY2() {
      if (
        anno_assunzione_dipendente_x2 <= annocorrente &&
        anno_assunzione_dipendente_x2 >= yyy2
      ) {
        return true;
      }
    }

    if (XXX2() && YYY2()) {
      modificaDipendente(c);

      $("#nome-modifica").val("");
      $("#cognome-modifica").val("");
      $("#ddn-modifica").val("");
      $("#stipendio-modifica").val("");
      $("#data-assunzione-modifica").val("");
      $("#ruolo-modifica").val("");
      $("#azienda-dipendente-modifica").val(""); //RIMASTO UN PEZZO DI CATEGORIA
      $("#modifica-dipendente-modal").css("display", "none");
    } else if (!XXX2() && YYY2()) {
      alert("Inserire una data di nascita valida");
      $(".formattazione-ddn").css({ color: "red" });
      $(".formattazione-data-assunzione").css({ color: "green" });
      $("#ddn-modifica").val("");
    } else if (!YYY2() && XXX2()) {
      alert("Inserire una data di assunzione valida");
      $(".formattazione-data-assunzione").css({ color: "red" });
      $(".formattazione-ddn").css({ color: "green" });
      $("#data-assunzione-modifica").val("");
    }
    else if(!(XXX2() && (anno_assunzione_dipendente_x2 > annocorrente))) {
      alert('Inserire una data di nascita e una data di assunzione valida');
      $(".formattazione-data-assunzione").css({ color: "red" });
      $(".formattazione-ddn").css({ color: "red" });
      $('#ddn-modifica').val('');
      $('#data-assunzione-modifica').val('');
    }
  });

  function modificaDipendente(c) {
    $.ajax({
      type: "PUT",
      url: "/dipendenti",
      data: JSON.stringify(c),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-dipendenti").html("");
          getListaDipendenti();
          $("#modifica-dipendente-modal").css("display", "none");
        },
      },
    });
  }

  $(".close-modifica-dipendente").click(function () {
    //RICHIAMA UNA CLASSE
    $("#modifica-dipendente-modal").css("display", "none");
  });

  // =========================== ricerca dipendente ====================================

  $("#ricerca-dipendente").keyup(function () {
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
  });


});
