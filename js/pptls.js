$(document).ready(function() {

  let armas = ['piedra','papel','tijera','largarto','spock'];

  let gpiedra = ['lagarto','tijera'];               //armas a las que la piedra le gana
  let gpapel = ['piedra','spock'];                  //armas a las que el papel le gana
  let gtijera = ['tijera','lagarto'];               // armas a las que la tijera le gana
  let gspock = ['piedra','tijera'];                 // armas a las que el spock le gana
  let glagarto = ['Spock','papel']                  // armas a las que el lagarto le gana

  PGanadas=0;
  Credito = 100;

  function random() {
    let objeto;
    let element = Math.floor((Math.random() * 4) + 1);  //round redondea los valores del random que va desde 0 a 2

    if ( element === 0){
      objeto = "piedra";
    }else if ( element === 1){
        objeto = "papel";
    }else if (element === 2){
      objeto = "tijera";
    }else if (element === 3){
      objeto = "lagarto";
    }else if (element === 4) {
      objeto = "spock";
    }
    return objeto;
  }

  $("button").on("click",function () {                       //si se toco un boton, traeme el id del boton que se toco
         clicked = $(this).attr("id");
         comprar(clicked);
       });


  function comprar(clicked) {                                               //MEJORAR, SE REPITE MUCHO EL CODIGO Y VERIFICAR FUNCIONAMIENTO
    objetoC = random();
            if (clicked == "piedra") {
                if (jQuery.inArray(objetoC, gpiedra)){
                    $("#Resultado").html("GANO");
                  PGanadas = PGanadas+1;
                  credito += credito + ( $("#apuesta").val() * 2 );
                }else if (objetoC == this) {
                  $("#Resultado").html("EMPATO");
                }else{
                  $("#Resultado").html("PERDIO");
                }
            }
            if (clicked === "papel") {
              if (jQuery.inArray(objetoC, gpapel)){
                  $("#Resultado").html("GANO");
                PGanadas = PGanadas+1;
              }else if (objetoC == this) {
                $("#Resultado").html("EMPATO");
              }else{
                $("#Resultado").html("PERDIO");
            }}
            if (clicked === "tijera") {
              if (jQuery.inArray(objetoC, gtijera)){
                  $("#Resultado").html("GANO");
                PGanadas = PGanadas+1;
              }else if (objetoC == this) {
                $("#Resultado").html("EMPATO");
              }else{
                $("#Resultado").html("PERDIO")
            }}
            if (clicked === "lagarto") {
              if (jQuery.inArray(objetoC, glagarto)){
                  $("#Resultado").html("GANO");
                PGanadas = PGanadas+1;
              }else if (objetoC == this) {
                $("#Resultado").html("EMPATO");
              }else{
                $("#Resultado").html("PERDIO");
            }}
            if (clicked === "spock") {
              if (jQuery.inArray(objetoC, gspock)){
                $("#Resultado").html("GANO");
                PGanadas = PGanadas+1;
              }else if (objetoC == this) {
                $("#Resultado").html("EMPATO");
              }else{
                $("#Resultado").html("PERDIO");
            }}

            $("#PGanadas").html('Partidas Ganadas:'+PGanadas);

    };



  $("#piedra").on("click",function () {

  })


















});
