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
        $.post("../PHP/eliminainventario.php",{},function(respuesta){
            if (respuesta==1){
                location.href="HTML/../inventario.html";
            }
            else{
                location.href="HTML/../inventario.html";
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
        $('#fecha').val(yyyy + '-' + mm + '-' + dd);
    $("#agregarnota").click(function()
    {
      $("#divdeproductos").empty();
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
$("#agregararticulo").click(function()
    {
      $("#consultatodoslosproductos").empty();
        $.ajax({
      url: "../PHP/verarticulos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultatodoslosproductos").append( 
            $('<li>').append(
              $('<a>').html(v.nombre).addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","agregarproducto("+v.idarticulo+",'"+v.nombre+"',"+v.precio+");")
            )
          );
        });
        
      },
      error: function(error)
      {
        alert(error, 2);
      }
    });
        $.mobile.changePage('#pageConsultaProductos', 'pop', true, true);
        return null;
    });
$("#registraproducto").click(function()
    {
        var producto = $("#nombreproducto").val();
        var precio = $("#precioproducto").val();
    if(producto==""||precio=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
    $.post("../PHP/registraarticulo.php",{producto: producto, precio:precio},function(respuesta){
            if (respuesta == 2) {
                $("#nombreproducto").val("");
                $("#precioproducto").val("");
                $.mobile.changePage('#pageError', 'pop', true, true);
            }
            if (respuesta == 1){
                $("#nombreproducto").val("");
                $("#precioproducto").val("");
                $.mobile.changePage('#pageExito', 'pop', true, true);
            }
        });
    });
$("#agregarproducto").click(function()
    {
          $.mobile.changePage('#pageRegistraProducto','pop',true,true);
          return null;
    });
$("#verproductos").click(function()
    {
        $("#consultatodoslosproductos").empty();
        $.ajax({
      url: "../PHP/verarticulos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultatodoslosproductos").append( 
            $('<li>').append(
              $('<a>').html(v.nombre).addClass("ui-btn ui-btn-icon-right ui-icon-carat-r").attr("onclick","verinfoarticulo("+v.idarticulo+")")
            )
          );
        });
        
      },
      error: function(error)
      {
        alert(error, 2);
      }
    });
        $.mobile.changePage('#pageConsultaProductos', 'pop', true, true);
        return null;
    });
    $("#registranota").click(function()
    {
      var fecha=$("#fecha").val();
      $.post("../PHP/registrainventario.php",{fecha:fecha, productocantidad:productocantidad},function(respuesta){
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
      url: "../PHP/verinventariodeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventario("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
      url: "../PHP/verinventariodelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventariopormes("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
      url: "../PHP/verinventariodelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventarioporanio("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function agregarproducto(id,nombre)
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
    $("<p>").html(x+"x "+nombre)
    );
}
function handler(e){
  $("#divdeventas").empty();
  $("#divdetalledenota").empty();
  var fecha=$("#fechaventa").val();
  $.ajax({
      url: "../PHP/verinventariodeldia.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventas").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventario("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function verinventario(id){
  $("#divdetalledenota").empty();
  $("#divdetalledenota").html('<b>Inventario '+id);
  $.ajax({
      url: "../PHP/verarticulosdelinventario.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdetalledenota").append( 
            $('<p>').html(v.cantidad+"x de "+v.nombre)
          );
        });
        $("#divdetalledenota").append($('<a>').html("Eliminar inventario").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
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
      url: "../PHP/verinventariodelmes.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventaspormes").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventariodelmes("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function verinventariodelmes(id){
  $("#divdetalledenotapormes").empty();
  $("#divdetalledenotapormes").html('<b>Inventario '+id);

  $.ajax({
      url: "../PHP/verarticulosdelinventario.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdetalledenotapormes").append( 
            $('<p>').html(v.cantidad+"x de "+v.nombre)
          );
        });
        $("#divdetalledenotapormes").append($('<a>').html("Eliminar inventario").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
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
      url: "../PHP/verinventariodelanio.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#divdeventasporanio").append( 
            $('<p>').append(
              $('<a>').html("Inventario "+v.idinventario).attr("onclick","verinventarioporanio("+v.idinventario+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
function verinventarioporanio(id){
  $("#divdetalledenotaporanio").empty();
  $("#divdetalledenotaporanio").html('<b>Inventario '+id);
  $.ajax({
      url: "../PHP/verarticulosdelinventario.php", 
      type: "POST", 
      dataType: "json",
      data: {id:id}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 

          $("#divdetalledenotaporanio").append( 
            $('<p>').html(v.cantidad+"x de "+v.nombre)
          );
        });
        $("#divdetalledenotaporanio").append($('<a>').html("Eliminar inventario").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all").attr("data-role","button").attr("onclick","elimina("+id+")").attr("data-icon","delete").attr("style","background-color: #c91010").attr("role","button"));
      },
      error: function(error)
      {
        console.log(error, 2);
      }
    });
}
function verinfoarticulo(id){
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        
         location.href="verinfoarticulo.html";
        });
}
function elimina(id)
{
  $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        });
  $.mobile.changePage('#seguro', 'pop', true, true);
        return null;
}
