$(document).ready(function(){
  $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $("#logout").click(function()
    {
        $.post("../PHP/cierrasesion.php",{},function(respuesta){
            if (respuesta==1){
                location.href="../index.html";
            }
            else{
                location.href="../index.html";
            }
        })
    });
    $("#agregarmensaje").click(function()
    {
        $.mobile.changePage('#pageRegistraMensaje', 'pop', true, true);
        return null;
    });

    $("#registramensaje").click(function()
    {
        var titulo_mensaje = $("#titulo_mensaje").val();
        var cuerpo_mensaje = $("#cuerpo_mensaje").val();
    if(titulo_mensaje==""||cuerpo_mensaje=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
    $.post("../PHP/registramensaje.php",{ titulo_mensaje : titulo_mensaje, cuerpo_mensaje:cuerpo_mensaje},function(respuesta){
            if (respuesta == 2) {
                $.mobile.changePage('#pageError', 'pop', true, true);
            }
            if (respuesta == 1){
                $("#cuerpo_mensaje").val("");
                $("#titulo_mensaje").val("");
                $.mobile.changePage('#pageExito', 'pop', true, true);
            }
        });
    });
    $("#vermensajes").click(function()
    {
        $("#consultademensajes").empty();
        $.ajax({
      url: "../PHP/vermensajes.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultademensajes").append( 
            $('<li>').append(
              $('<a>').html(v.titulo).attr("onclick","verinfomensaje("+v.idmensajes+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").append(
              $('<p>').html("Enviado el: "+v.fecha_hora+" a las "+v.hora_fecha).append(
                $('<p>').html("Escrito por: "+v.username)
                )
              )   
            )
          );
        });
        
      },
      error: function(error)
      {
        alert(error, 2);
      }
    });
        $.mobile.changePage('#pageConsultaMensajes', 'pop', true, true);
        return null;
    });
  });
function atras()
{
    location.href="main.html";
}
function verinfomensaje(id)
{
    $.post("../PHP/cambiaavisto.php",{id:id},function(respuesta){
        });
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
         location.href="verinfomensaje.html";
        });
}