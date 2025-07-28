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
        $.post("../PHP/eliminanota.php",{},function(respuesta){
            if (respuesta==1){
                location.href="HTML/../ventas.html";
            }
            else{
                location.href="HTML/../ventas.html";
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
      $("#divdetotal").empty();
      $("#efectivo").val("");
      $("#tarjeta").val("");
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
    $("#agregarproducto").click(function()
    {
      $("#consultatodoslosproductos").empty();
        $.ajax({
      url: "../PHP/vertodoslosproductos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultatodoslosproductos").append( 
            $('<p>').append(
              $('<a>').html(v.categoria+" de "+v.producto).attr("onclick","agregarproducto("+v.idproductos+",'"+v.categoria+" de "+v.producto+"',"+v.precio+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
            )
          );
        });
        
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
        $.mobile.changePage('#pageConsultaProductos', 'pop', true, true);
        return null;
    });
    $("#registranota").click(function()
    {
      var efectivo=$("#efectivo").val();
      var tarjeta=$("#tarjeta").val();
      var fecha=$("#fecha").val();
      if(efectivo==""&&tarjeta=="")
      {
        alert("Debe ingresar un valor en el campo de tarjeta o efectivo");
        return null;
      }
      $.post("../PHP/registranota.php",{efectivo:efectivo,tarjeta:tarjeta,fecha:fecha,productocantidad:productocantidad},function(respuesta){
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
      url: "../PHP/vernotasdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernota("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
      url: "../PHP/vernotasdelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernotapormes("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
      url: "../PHP/vernotasdelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernotaporanio("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
var productocantidad=[];
var contador=0;
var total=0;
function agregarproducto(id,nombre,precio)
{
  var x = window.prompt("Por favor ingrese la cantidad:","1");
  if(x==null||x==0||x<1||x=="")
  {
    alert("Favor de ingresar un valor numérico mayor a 0 y número entero");
    return null;
  }
  if(isNaN(x))
  {
    alert("Ingrese un valor numérico");
    return null;
  }
  productocantidad.push(id,x);
  console.log(productocantidad);
  $("#divdeproductos").append(
    $("<p>").html(x+"x "+nombre+" ($"+precio+" C/U)")
    );
  if(contador==0){
    total=x*precio;
    $("#divdetotal").empty();
    $("#divdetotal").append(
    $("<p>").html(x*precio)
    );
  contador++;
  return null;
  }
  if(contador>0){
    $("#divdetotal").empty();
    $("#divdetotal").append(
    $("<p>").html(x*precio+total)
    );
    total=x*precio+total;
    contador++;
  }
}
function handler(e){
  $("#divdeventas").empty();
  $("#divdetalledenota").empty();
  var fecha=$("#fechaventa").val();
  $.ajax({
      url: "../PHP/vernotasdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernota("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function vernota(id){
  $("#divdetalledenota").empty();
  $("#divdetalledenota").html('<b>Nota '+id);
  var efectivo;
  var tarjeta;
  $.ajax({
      url: "../PHP/verventasdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          efectivo=v.efectivo;
          tarjeta=v.tarjeta;
          $("#divdetalledenota").append( 
            $('<p>').html(v.cantidad+"x "+v.nombrecategoria+" de "+v.nombreproducto)
          );
        });
        var total=0;
        total=parseInt(efectivo)+parseInt(tarjeta);
        $("#divdetalledenota").append($('<a>').html("Eliminar nota").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
        $("#divdetalledenotapormes").append($('<b>').html("<br>Efectivo: $"+efectivo+ "<br> Tarjeta: $"+tarjeta+"<br>TOTAL: $"+total));
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
      url: "../PHP/vernotasdelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernotapormes("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function vernotapormes(id){
  $("#divdetalledenotapormes").empty();
  $("#divdetalledenotapormes").html('<b>Nota '+id);
  var efectivo;
  var tarjeta;
  $.ajax({
      url: "../PHP/verventasdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          efectivo=v.efectivo;
          tarjeta=v.tarjeta;
          $("#divdetalledenotapormes").append( 
            $('<p>').html(v.cantidad+"x "+v.nombrecategoria+" de "+v.nombreproducto)
          );
        });
        total=parseInt(efectivo)+parseInt(tarjeta);
        $("#divdetalledenota").append($('<a>').html("Eliminar nota").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
        $("#divdetalledenotapormes").append($('<b>').html("<br>Efectivo: $"+efectivo+ "<br> Tarjeta: $"+tarjeta+"<br>TOTAL: $"+total));
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
      url: "../PHP/vernotasdelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html("Nota "+v.idnotas).attr("onclick","vernotaporanio("+v.idnotas+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function vernotaporanio(id){
  $("#divdetalledenotaporanio").empty();
  $("#divdetalledenotaporanio").html('<b>Nota '+id);
  var efectivo;
  var tarjeta;
  $.ajax({
      url: "../PHP/verventasdeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          efectivo=v.efectivo;
          tarjeta=v.tarjeta;
          $("#divdetalledenotaporanio").append( 
            $('<p>').html(v.cantidad+"x "+v.nombrecategoria+" de "+v.nombreproducto)
          );
        });
        total=parseInt(efectivo)+parseInt(tarjeta);
        $("#divdetalledenota").append($('<a>').html("Eliminar nota").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
        $("#divdetalledenotapormes").append($('<b>').html("<br>Efectivo: $"+efectivo+ "<br> Tarjeta: $"+tarjeta+"<br>TOTAL: $"+total));
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