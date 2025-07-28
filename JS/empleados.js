$(document).ready(function(){
    $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $("#agregarempleado").click(function()
    {
        $.mobile.changePage('#pageRegistraEmpleado', 'pop', true, true);
        return null;
    });
    $("#registraempleado").click(function()
    {
        var nombre = $("#nombreempleado").val();
        var paterno = $("#paternoempleado").val();
        var materno = $("#maternoempleado").val();
        var fechaingreso = $("#fechaingreso").val();
        var salario = $("#salario").val();
    if(nombre==""||paterno==""||materno=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
    $.post("../PHP/registraempleado.php",{ nombre : nombre, paterno : paterno, materno : materno, fechaingreso : fechaingreso, salario : salario},function(respuesta){
            if (respuesta == 2) {
                $("#nombreempleado").val("");
                $("#paternoempleado").val("");
                $("#maternoempleado").val("");
                $("#salario").val("");
                $("#fechaingreso").val("");
                $.mobile.changePage('#pageError', 'pop', true, true);
            }
            if (respuesta == 1){
                $("#nombreempleado").val("");
                $("#paternoempleado").val("");
                $("#maternoempleado").val("");
                $("#salario").val("");
                $("#fechaingreso").val("");
                $.mobile.changePage('#pageExito', 'pop', true, true);
            }
            else{alert("ERROR");}
        });
    });
    $("#verempleados").click(function()
    {
        $("#consultadeempleados").empty();
        $.ajax({
      url: "../PHP/verempleados.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadeempleados").append( 
            $('<li>').append(
              $('<a>').html(v.nombre+" "+v.paterno+" "+v.materno).attr("onclick","verinfoempleado("+v.idempleados+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
            )
          );
        });
        
      },
      error: function(error)
      {
        alert(error, 2);
      }
    });
        $.mobile.changePage('#pageConsultaEmpleados', 'pop', true, true);
        return null;
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
});
function atras()
{
    location.href="main.html";
}
function verinfoempleado(id)
{
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        
         location.href="verinfoempleado.html";
        });
}