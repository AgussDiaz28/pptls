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

  }

  class Juego {

        constructor(PTorneo) {

          this.gpiedra = ['lagarto','tijera'];               //armas a las que la piedra le gana
          this.gpapel = ['piedra','spock'];                  //armas a las que el papel le gana
          this.gtijera = ['papel','lagarto'];               // armas a las que la tijera le gana
          this.gspock = ['piedra','tijera'];                 // armas a las que el spock le gana
          this.glagarto = ['spock','papel'];                 // armas a las que el lagarto le gana
          this.PTorneo = PTorneo;
          this.PTotales = 0;
          this.PParciales = 0;
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
              if ( (jQuery.inArray(JugadorU.seleccion, arr) ) == 0 ){
                  this.resultado = "Gano";
                  this.PParciales =   this.PParciales + 1;

              }else if (JugadorM.seleccion == JugadorU.seleccion) {
                this.resultado = "Empataron";
              }else{
                this.resultado = "Perdio";
              }

              if (this.PTorneo == this.PParciales ){
                    JugadorU.pierde();   //por apostar pierde el valor de lo que aposto
                    if (this.PParciales <= (this.PTorneo/2)){           //Verificar condicion
                      this.resultado = "Gano el Torneo";

                      JugadorU.recibe();
                    }
                    else {
                      this.resultado = "Usted perdio el Torneo"

                    }
              this.PParciales = 0;
              this.PTorneo = 0;
              this.contadorPartidas();
              }
        }

        GPartidaNormal(JugadorM,arr,JugadorU){
              if ( (jQuery.inArray(JugadorU.seleccion, arr) ) == 0 ){ //VERIFICAR CONDICION DEL ORTO
                  this.resultado = "Gano";
                  JugadorU.recibe();
              }else if (JugadorM.seleccion == JugadorU.seleccion) {
                this.resultado = "Empataron";
              }else{
                this.resultado = "Perdio";
                // JugadorU.pierde();       Como se descuenta cuando apuesta no le tengo que quitar mas
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

  // Defino variables --------------------------

       let John = new JugadorUsuario ();
       John.credito = 100;
       John.name = "John";
       let Mac = new JugadorPC ();
       let JuegoTorneo = new Juego( $("#TorneoRondas").val() );
       let JuegoNormal = new Juego(0);

  // Fin de definicion de variables --------------------------

  $("#coins").on("click",function () {
    John.apuesta(100);
    John.recibe();
  });

  $("#AllIn").on("click",function () {
       $('#apuesta').val(John.credito)
  });

  $("button").on("click",function () {       //Me devuelve el ID del boton clikeado
         John.Seleccionar( $(this).attr("id") );
         John.apuesta( $('#apuesta').val() );

         if (John.seleccion != "AllIn" && (John.seleccion != "coins") ){
             if ( ( John.vapuesta > 0 ) && ( John.credito > 0) ) {   //Si aposto mas de 0 y le queda saldo
               Mac.Seleccionar();
               EmpiezaJuego(John);                                       // empieza el juego
            }
            else{
                      alert("No puede apostar")                     // No empieza el juego
                    }
             }
       });

  function EmpiezaJuego() {
      if ( $("#myCheck").prop('checked') ){
          JuegoTorneo.desicion(true,Mac,John);
          $('#Resultado').html(JuegoTorneo.resultado  + " el Torneo al mejor de " + JuegoTorneo.PTorneo );
      }
    else {
          John.pierde();   //por apostar pierde el valor de lo que aposto
          JuegoNormal.desicion(false,Mac,John);
          $('#ResultadoTorneo').html(JuegoNormal.resultado);
    }

    $("#ObjetoPc").html('La maquina lecciono: ' + Mac.seleccion);
    $('#ObjetoUsuario').html( John.name + ' lecciono: ' + John.seleccion);
    $('#Monedas').html('Las monedas restantes de ' + John.name + ' son: ' + John.credito);
    $("#PTotales").html('Total de partidas Jugadas: ' + JuegoNormal.PTotales );
  }


});
