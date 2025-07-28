$(document).ready(function()
  {
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
          $("#listadecategorias").append(
            $('<option></option>').val(v.idcategoria_producto).text(v.nombre));
        });
      },
      error: function(error)
      {
        console.log(error);
      }
    });
    $.ajax({
      url: "../PHP/verproductodetallado.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        {
          $("#1").html(v.idproductos);
          $("#2").html(v.nombre);
          $("#3").html(v.categoria);
          $("#4").html(v.precio);
          $("#nombreproducto").val(v.nombre);
          $("#precio").val(v.precio);
          $("#listadecategorias").val(v.idcategoria_producto);
        });
      },
      error: function(error)
      {
        console.log(error);
      }
    });
    $("#elimina").click(function()
	{
		$.mobile.changePage("#confirmar",'pop',true,true);
	});
	$("#eliminar").click(function()
	{
		$.post("../PHP/eliminaproducto.php",function(respuesta){
            if (respuesta == 1) {
                $.mobile.changePage('#pageExito', 'pop', true, true);
                location.href="productos.html";
            }
           else{
           		$.mobile.changePage('#pageError', 'pop', true, true);
           		location.href="productos.html";
           }
        });
	});
	$("#editar").click(function()
	{
		var nombre=$("#nombreproducto").val();
    var categoria=$("#listadecategorias").val();
    var precio=$("#precio").val();
		if (nombre==""||precio=="")
		{
			$.mobile.changePage('#pageLlenar', 'pop', true, true);
			return null;
		}
        $.post("../PHP/editaproducto.php",{nombre:nombre, categoria:categoria, precio:precio},function(respuesta){
            if (respuesta == "1") {
                location.href="productos.html";
            }
            else if (respuesta=="2")
            {
            	$.mobile.changePage('#pageError', 'pop', true, true);
            	return null;
            }
            else{
              alert(respuesta);
            }
        });
	});
  });	 