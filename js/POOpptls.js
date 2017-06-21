$(document).ready(function(){

  class JugadorPC {

        constructor() {
        }

        Seleccionar(){
          this.seleccion = random();
        }

  }

  class JugadorUsuario {

      constructor(monedas,name) {
        this.credito = monedas;
        this.nombre = name;
        this.VJugador = 0;
      }

      Seleccionar( arma ){
        this.seleccion = arma;
      }

      apuesta(Vapuesta){
        this.vapuesta = Vapuesta;
      }

      recibe(){
        this.credito = this.credito + (2 * this.vapuesta) ;
      }

      pierde(){
        this.credito =  this.credito - this.vapuesta;
      }

      contadorVictorias(){
        this.VJugador = this.VJugador + 1;
      }


  }

  class Juego {

        constructor(PTorneo) {

          this.gpiedra = ['lagarto','tijera'];               //armas a las que la piedra le gana
          this.gpapel = ['piedra','spock'];                  //armas a las que el papel le gana
          this.gtijera = ['papel','lagarto'];               // armas a las que la tijera le gana
          this.glagarto = ['spock','papel'];                 // armas a las que el lagarto le gana
          this.gspock = ['piedra','tijera'];                 // armas a las que el spock le gana
          this.PTorneo = PTorneo;
          this.PTotales = 0;
          this.PParciales = 0;
          this.resultadoT = "Estamos en Modo Torneo";
          this.resultadoN = 0;
          this.VJugador = 0 ;

        }

        contadorPartidas(){
          this.PTotales = this.PTotales +1;
        }

        desicion(checkbox,JugadorM,JugadorU){

              if (JugadorU.seleccion == "piedra"){

                      if ( checkbox == true ){
                          this.GPartidaTorneo (JugadorM,this.gpiedra,JugadorU);

                      }else {
                          this.GPartidaNormal (JugadorM,this.gpiedra,JugadorU);
                      }
              };
              if (JugadorU.seleccion == "papel"){

                      if (checkbox == true){
                          this.GPartidaTorneo (JugadorM,this.gpapel,JugadorU);
                      }else{
                          this.GPartidaNormal (JugadorM,this.gpapel,JugadorU);
                      }
              };
              if (JugadorU.seleccion == "tijera") {

                      if (checkbox == true){
                        this.GPartidaTorneo (JugadorM,this.gtijera,JugadorU);
                      }else{
                        this.GPartidaNormal (JugadorM,this.gtijera,JugadorU);
                      }
              };
              if (JugadorU.seleccion == "lagarto"){

                      if (checkbox == true){
                        this.GPartidaTorneo (JugadorM,this.glagarto,JugadorU);
                      }else{
                          this.GPartidaNormal (JugadorM,this.glagarto,JugadorU);
                      }
              };
              if (JugadorU.seleccion == "spock"){

                      if (checkbox == true){
                        this.GPartidaTorneo (JugadorM,this.gspock,JugadorU);
                      }else{
                        this.GPartidaNormal (JugadorM,this.gspock,JugadorU);
                      }
              };

        }

        GPartidaTorneo(JugadorM,arr,JugadorU){
          if ( ( JugadorM.seleccion == arr[0] ) || (JugadorM.seleccion == arr[1]) ){
                  this.resultadoN = "Gano";
                  this.VJugador = this.VJugador +1;
              }else if (JugadorM.seleccion == JugadorU.seleccion) {
                this.resultadoN = "Empato";
              }else{
                this.resultadoN = "Perdio";
              }

              this.PParciales =   this.PParciales + 1;

            if (this.PTorneo  ==  this.PParciales ){
                  JugadorU.pierde();                                  //por apostar pierde el valor de lo que aposto
                  if (this.VJugador >= (this.PTorneo/2) ){           //Verificar condicion
                    this.resultadoT = "Gano el Torneo habiendo ganado " + this.VJugador + ' Partidas';
                    JugadorU.recibe();
                    JugadorU.contadorVictorias();
                  }
                  else {
                    this.resultadoT = 'Usted perdio el Torneo, solo gano ' + this.VJugador + ' partidas de ' + this.PTorneo;
                  }
                  this.VJugador = 0;
                  this.contadorPartidas();
            }

        }

        GPartidaNormal(JugadorM,arr,JugadorU){
              if ( ( JugadorM.seleccion == arr[0] ) || (JugadorM.seleccion == arr[1]) ){
                  this.resultadoN = "Gano";
                  JugadorU.contadorVictorias();
                  JugadorU.recibe();
              }else if (JugadorM.seleccion == JugadorU.seleccion) {
                this.resultadoN = "Empato";
              }else{
                this.resultadoN = "Perdio";
              }
          this.contadorPartidas();
        }
  }

  function random() {      //Me devuelve el valor de la seleccion de la maquina

    let element = Math.floor((Math.random() * 5) + 1);  //round redondea los valores del random que va desde 0 a 2

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

  function print(SeleccionU,SeleccionM) {
      $("#ObjetoUsuario").attr('src',  "images/" + SeleccionU + ".png" );
      $("#ObjetoPc").attr('src',  "images/" + SeleccionM + ".png" );
  }

  // Defino variables --------------------------

       let John = new JugadorUsuario ();
       John.credito = 100;
       John.name = "John";
       let Mac = new JugadorPC ();
       let NumeroRondas = $("#TorneoRondas").val() ;
       let JuegoTorneo = new Juego( NumeroRondas );
       let JuegoNormal = new Juego(0);
      $("#TorneoRondas").on("change",function () {
         NumeroRondas = $("#TorneoRondas").val() ;
        JuegoTorneo = new Juego( NumeroRondas );
      });
      $(".resultados").hide();

  // Fin de definicion de variables --------------------------

    $("#AllIn").on("click",function () {
       $('#apuesta').val(John.credito)
    });

   $("img").on("click",function () {       //Me devuelve el ID del boton clikeado
         John.Seleccionar( $(this).attr("id") );
         John.apuesta( $('#apuesta').val() );
         if (John.seleccion != "ObjetoUsuario" && (John.seleccion != "ObjetoPc") ){
             if ( ( John.vapuesta > 0 ) && ( John.credito > 0) ) {   //Si aposto mas de 0 y le queda saldo
               Mac.Seleccionar();
               EmpiezaJuego(John);                                  // empieza el juego
            }
            else{
                      alert("No puede apostar")                     // No empieza el juego
                    }
             }
       });

  function EmpiezaJuego() {
      if ( $("#myCheck").prop('checked') ){
            $("#myCheck").hide();
            $("#TorneoRondas").prop('disabled', true);
            JuegoTorneo.desicion(true,Mac,John);
                if (JuegoTorneo.PParciales == NumeroRondas ){
                    $("#myCheck").show();
                    $("#TorneoRondas").prop('disabled', false);
                    JuegoTorneo.PParciales = 0;

                };
            $('#ResultadoTorneo').html(JuegoTorneo.resultadoT);
            $(".resultados").show();
            $('#Resultado').html("Resultado del ultimo enfrentamiento: " + JuegoTorneo.resultadoN);

      }
    else {
          John.pierde();                                                                      //por apostar pierde el valor de lo que aposto
          JuegoNormal.desicion(false,Mac,John);
          $(".resultados").show();
          $('#Resultado').html(JuegoNormal.resultadoN);
    }

    let TotalPartidas = (parseInt(JuegoNormal.PTotales) + parseInt(JuegoTorneo.PTotales));
    print(John.seleccion,Mac.seleccion);                                                      //Imprime por pantalla el los objetos que fueron elegidos para la ronda.
    $('#Monedas').html('MONEDAS RESTANTES: ' + John.credito);
    $("#PTotales").html('PARTIDAS JUGADAS: ' + TotalPartidas );
    $("#TGanadas").html('TOTAL DE PARTIDAS GANADAS POR EL USUARIO ' + John.VJugador );
  }


});
