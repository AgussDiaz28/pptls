$(document).ready(function() {

  let armas = ['piedra','papel','tijera','largarto','spock'];

  let gpiedra = ['lagarto','tijera'];               //armas a las que la piedra le gana
  let gpapel = ['piedra','spock'];                  //armas a las que el papel le gana
  let gtijera = ['tijera','lagarto'];               // armas a las que la tijera le gana
  let gspock = ['piedra','tijera'];                 // armas a las que el spock le gana
  let glagarto = ['spock','papel']                  // armas a las que el lagarto le gana

  PGanadas=0;
  Credito = 100;
  PTotales = 0;
  PParciales = 0;
  UserW = 0;
  ComputerW = 0;

  $("#AllIn").on("click",function () {
    $("#apuesta").val(Credito);
  });

  $("#coins").on("click",function () {
    Credito = 100;
  })

  function random() {                     //Me devuelve el valor de la maquina


    let element = Math.floor((Math.random() * 4) + 1);  //round redondea los valores del random que va desde 0 a 2

    if ( element === 1){
      element = "piedra";
    }else if ( element === 2){
        element = "papel";
    }else if (element === 3){
      element = "tijera";
    }else if (element === 4){
      element = "lagarto";
    }else if (element === 5) {
      element = "spock";
    }
    return element;
  }

  $("button").on("click",function () {       //Me devuelve el ID del boton clikeado
         clicked = $(this).attr("id");
         $('#ObjetoUsuario').html('El usuario se lecciono: ' + clicked)
         if (clicked != "AllIn"){
           if ( ( $('#apuesta').val() != 0 ) && (Credito > 0) ) {
              comparar(clicked);
          }
          else{
                    alert("No puede apostar")
                  }
           }

       });

  function comparar(clicked) {               

    objetoC = random();
    $('#ObjetoPc').html('El objeto que elijio la computadora es: ' + objetoC)

    if ( $("#myCheck").prop('checked') ){
          $('#myCheck').hide();
      };

        if (clicked == "piedra"){

                if ( $("#myCheck").prop('checked') ){
                    torneo (objetoC,gpiedra,clicked);
                    $('#myCheck').hide();
                }else {
                    resultado (objetoC,gpiedra,clicked);
                }
        }
        if (clicked == "papel"){

                if ($("#myCheck").prop('checked')){
                    torneo (objetoC,gpapel,clicked);
                }else{
                    resultado (objetoC,gpapel,clicked);
                }
        }
        if (clicked == "tijera") {

                if ($("#myCheck").prop('checked')){
                  torneo (objetoC,gtijera,clicked);
                }else{
                  resultado (objetoC,gtijera,clicked);
                }
        }
        if (clicked == "lagarto"){

                if ($("#myCheck").prop('checked')){
                  torneo (objetoC,glagarto,clicked);
                }else{
                    resultado (objetoC,glagarto,clicked);
                }
        }
        if (clicked == "spock"){

                if ($("#myCheck").prop('checked')){
                  torneo (objetoC,gspock,clicked);
                }else{
                  resultado (objetoC,gspock,clicked);
                }
        }

    };

  function resultado(objetoC,arr,clicked) {

        if ( (jQuery.inArray(objetoC, arr)) == 0 ){
            $("#Resultado").html("GANO");
            PGanadas = PGanadas+1;
            Credito = Credito + ( parseInt( $("#apuesta").val() * 2 ) );
        }else if (objetoC == clicked) {
          $("#Resultado").html("EMPATO");
        }else{
          $("#Resultado").html("PERDIO");
          Credito = Credito - ( parseInt( $("#apuesta").val() ) );
        }

       PTotales = PTotales + 1;
       $("#PGanadas").html('Partidas Ganadas: ' + PGanadas);
       $("#Monedas").html('Monedas Restantes: ' + Credito);
       $("#PTotales").html('Total Partidas Jugadas: ' + PTotales);

  };

  function torneo(objetoC,arr,clicked) {
    if ( (jQuery.inArray(objetoC, arr)) == 0 ){
        $("#Resultado").html("GANO");
        PGanadas = PGanadas+1;
        UserW = UserW +1;
    }else if (objetoC == clicked) {
      $("#Resultado").html("EMPATO");
    }else{
      $("#Resultado").html("PERDIO");
      ComputerW = ComputerW +1;
    }

    PParciales = PParciales + 1;
    if ( PParciales == $("#TorneoRondas").val() ){
      if (ComputerW > UserW){
          $("#ResultadoTorneo").html("USTED PERDIO EL TORNEO " + ComputerW + ' A ' + UserW );
          Credito = Credito - ( parseInt( $("#apuesta").val() ) * 2 );
      }
      else {
        $("#ResultadoTorneo").html("USTED GANO EL TORNEO " + UserW + " A " + ComputerW );
        Credito = Credito + ( parseInt( $("#apuesta").val() * 5 ) );

      }

      PParciales = 0;
      ComputerW =0;
      UserW = 0;
      $('#myCheck').show();

    }

  }






});
