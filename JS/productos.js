$(document).ready(function(){
  $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $.ajax({
      url: "../PHP/vercategoriaproductos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $("#listadecategorias").empty();
        $.each(data, function(k,v)
        {
          //alert(v.nombre);
          $('#listadecategorias').append(
            $('<option></option>').val(v.idcategoria_producto).text(v.nombre)); 
        });
        
      },
      error: function(error)
      {
        alert("El error es: "+error);
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
    $("#agregarcategoria").click(function()
    {
        $.mobile.changePage('#pageRegistraCategoriaProducto', 'pop', true, true);
        return null;
    });
    $("#agregarproducto").click(function()
    {
        $.mobile.changePage('#pageRegistraProducto', 'pop', true, true);
        return null;
    });
    $("#registracategoria_producto").click(function()
    {
        var categoria_producto = $("#categoria_producto").val();
    if(categoria_producto=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
    $.post("../PHP/registracategoria_producto.php",{ categoria_producto : categoria_producto},function(respuesta){
            if (respuesta == 2) {
                $("#categoria_producto").val("");
                $.mobile.changePage('#pageError', 'pop', true, true);
            }
            if (respuesta == 1){
                $("#categoria_producto").val("");
                $.mobile.changePage('#pageExito', 'pop', true, true);
            }
        });
    });
    $("#registraproducto").click(function()
    {
        var producto = $("#nombreproducto").val();
        var categoria_producto = $("#listadecategorias").val();
        var precio = $("#precioproducto").val();
    if(producto==""||precio=="")
        {
            $.mobile.changePage('#pageLlenar','pop',true,true);
            return null;
        }
    $.post("../PHP/registraproducto.php",{producto: producto, categoria_producto : categoria_producto, precio:precio},function(respuesta){
            if (respuesta == 2) {
                $("#categoria_producto").val("1");
                $("#nombreproducto").val("");
                $("#precioproducto").val("");
                $.mobile.changePage('#pageError', 'pop', true, true);
            }
            if (respuesta == 1){
                $("#categoria_producto").val("1");
                $("#nombreproducto").val("");
                $("#precioproducto").val("");
                $.mobile.changePage('#pageExito', 'pop', true, true);
            }
        });
    });
    $("#vercategorias").click(function()
    {
        $("#consultadecategoriasdeproductos").empty();
        $.ajax({
      url: "../PHP/vercategoriaproductos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadecategoriasdeproductos").append( 
            $('<li>').append(
              $('<a>').html(v.nombre).attr("onclick","verinfocategoria("+v.idcategoria_producto+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
    $("#verproductos").click(function()
    {
        $("#consultadecategoriasdeproductos").empty();
        $.ajax({
      url: "../PHP/vercategoriaproductos.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadecategoriasdeproductos").append( 
            $('<li>').append(
              $('<a>').html(v.nombre).attr("onclick","verlistacategoria("+v.idcategoria_producto+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
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
}
function verinfoproducto(id)
{
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        
         location.href="verinfoproducto.html";
        });
}
function verinfocategoria(id)
{
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        
         location.href="verinfocategoria.html";
        });
}
function verlistacategoria(id){
    $.post("../PHP/guardavariablesesion.php",{id:id},function(respuesta){
        $("#consultadeproductos").empty();
    $.ajax({
      url: "../PHP/verproductosporcategoria.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadeproductos").append( 
            $('<li>').append(
              $('<a>').html(v.nombre).attr("onclick","verinfoproducto("+v.idproductos+");").addClass("ui-btn ui-btn-icon-right ui-icon-carat-r")
            )
          );
        });
        
      },
      error: function(error)
      {
        mensajes_alert(error, 2);
      }
    });  
        $.mobile.changePage('#pageConsultaCategoriasProductos', 'pop', true, true);
        return null;
         
        });
}