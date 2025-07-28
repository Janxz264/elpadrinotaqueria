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
    $("#ventas").click(function()
    {
        location.href="ventas.html";
    });
    $("#inventario").click(function()
    {
        location.href="inventario.html";
    });
    $("#mensajes").click(function()
    {
        location.href="mensajes.html";
    });
    $("#empleados").click(function()
    {
        location.href="empleados.html";
    });
    $("#gastos").click(function()
    {
        location.href="gastos.html";
    });
    $("#productos").click(function()
    {
        location.href="productos.html";
    });
    $("#change").click(function()
  {
    var contraoriginal=$("#contraoriginal").val();
    var contranueva=$("#contranueva").val();
    var contrarepite=$("#contrarepite").val();
    if(contraoriginal==""||contranueva==""||contrarepite=="")
    {
      $.mobile.changePage('#pageLlenar','pop',true,true);
      return null;
    }
    if(contranueva!=contrarepite)
    {
      $.mobile.changePage('#pageContranoigual','pop',true,true);
      borrarcamposcontrados();
      return null;
    }
    if (contraoriginal==contranueva||contraoriginal==contrarepite)
    {
      $.mobile.changePage('#pageContraIgual','pop',true,true);
      borrarcamposcontra();
      return null;
    }
    $.post("../PHP/cambiacontra.php",{contraoriginal:contraoriginal, contranueva:contranueva},function(respuesta){
            if (respuesta == 2) {
                $.mobile.changePage('#pageContranooriginal','pop',true,true);
            }
           else{
              location.href="../index.html";
           }
  });
    function borrarcamposcontra()
{
    $("#contraoriginal").val("");
    $("#contranueva").val("");
    $("#contrarepite").val("");
}
function borrarcamposcontrados()
{
    $("#contranueva").val("");
    $("#contrarepite").val("");
}
  });
});
