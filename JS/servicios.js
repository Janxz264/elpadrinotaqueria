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
  $("#eliminar").click(function()
    {
        $.post("../PHP/eliminagasto.php",{},function(respuesta){
            if (respuesta==1){
                location.href="HTML/../gastos.html";
            }
            else{
                location.href="HTML/../gastos.html";
            }
        })
    });
    var today = new Date();   
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd==1||dd==2||dd==3||dd==4||dd==5||dd==6||dd==7||dd==8||dd==9)
        {
          dd="0"+dd;
        }
        if(mm==1||mm==2||mm==3||mm==4||mm==5||mm==6||mm==7||mm==8||mm==9)
        {
          mm="0"+mm;
        }
        $('#fecha').val(yyyy + '-' + mm + '-' + dd);
    $("#agregarnota").click(function()
    {
      $("#divdeproductos").empty();
      var today = new Date();   
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd==1||dd==2||dd==3||dd==4||dd==5||dd==6||dd==7||dd==8||dd==9)
        {
          dd="0"+dd;
        }
        //Por si el día es menor a 10 se debe agregar un cero
        if(mm==1||mm==2||mm==3||mm==4||mm==5||mm==6||mm==7||mm==8||mm==9)
        {
          mm="0"+mm;
        }
        //Por si el mes es menor a 10 se debe agregar un cero
        $('#fecha').attr("max",yyyy + '-' + mm + '-' + dd);
        $('#fecha').val(yyyy + '-' + mm + '-' + dd);
      $.mobile.changePage('#pageRegistraNota', 'pop', true, true);
        return null;
    });
    $("#registranota").click(function()
    {
      var fecha=$("#fecha").val();
      var nombre=$("#nombregasto").val();
      var cantidad=$("#cantidadgasto").val();
      if(nombre==""||cantidad=="")
      {
        $.mobile.changePage('#pageLlenar', 'pop', true, true);
        return null;
      }
      $.post("../PHP/registragasto.php",{fecha:fecha,nombre:nombre,cantidad:cantidad},function(respuesta){
            if (respuesta==1){
                alert("Registro exitoso");
                location.reload();
            }
            else{
                alert(respuesta);
            }
        })
    });
    $("#verventas").click(function()
    {
      $("#divdeventas").empty();
      $("#divdetalledenota").empty();
      var today = new Date();   
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd==1||dd==2||dd==3||dd==4||dd==5||dd==6||dd==7||dd==8||dd==9)
        {
          dd="0"+dd;
        }
        if(mm==1||mm==2||mm==3||mm==4||mm==5||mm==6||mm==7||mm==8||mm==9)
        {
          mm="0"+mm;
        }
        $('#fechaventa').attr("max",yyyy + '-' + mm + '-' + dd);
        $('#fechaventa').val(yyyy + '-' + mm + '-' + dd);
        var fecha=$("#fechaventa").val();
        $.ajax({
      url: "../PHP/vergastosdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html(v.nombre+"<br><p>$"+v.costo+"</p><p> el día "+v.fecha+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
      $.mobile.changePage('#pageConsultaVentas', 'pop', true, true);
        return null;
    });
    $("#verventaspormes").click(function()
    {
      $("#divdeventaspormes").empty();
      $("#divdetalledenotapormes").empty();
      var today = new Date();   
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        $('#mesventa').val(yyyy + '-' + mm);
        var fecha=$("#mesventa").val();
        $.ajax({
      url: "../PHP/vergastosdelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernotapormes("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
      $.mobile.changePage('#pageConsultaVentasPorMes', 'pop', true, true);
        return null;
    });
    $("#verventasporanio").click(function()
    {
      $("#divdeventasporanio").empty();
      $("#divdetalledenotaporanio").empty();
      var today = new Date();   
        var yyyy = today.getFullYear();
        $('#anioventa').val(yyyy);
        var fecha=$("#anioventa").val();
        $.ajax({
      url: "../PHP/vergastosdelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html(v.nombre+"<br><p>$"+v.costo+"</p><p> el día "+v.fecha+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
      $.mobile.changePage('#pageConsultaVentasPorAnio', 'pop', true, true);
        return null;
    });
});
function atras()
{
    location.href="main.html";
}
function handler(e){
  $("#divdeventas").empty();
  $("#divdetalledenota").empty();
  var fecha=$("#fechaventa").val();
  $.ajax({
      url: "../PHP/vergastosdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html(v.nombre+"<br><p>$"+v.costo+"</p><p> el día "+v.fecha+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
}
function handlermes(e){
  $("#divdeventaspormes").empty();
  $("#divdetalledenotapormes").empty();
  var fecha=$("#mesventa").val();
  $.ajax({
      url: "../PHP/vergastosdelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html(v.nombre+"<br><p>$"+v.costo+"</p><p> el día "+v.fecha+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
}
function handleranio(e){
  $("#divdeventasporanio").empty();
  $("#divdetalledenotaporanio").empty();
  var fecha=$("#anioventa").val();
  $.ajax({
      url: "../PHP/vergastosdelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html(v.nombre+"<br><p>$"+v.costo+"</p><p> el día "+v.fecha+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","elimina("+v.idgastos_servicios+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
}
function elimina(id)
{
  $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        });
  $.mobile.changePage('#seguro', 'pop', true, true);
        return null;
}