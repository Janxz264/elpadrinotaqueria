$(document).ready(function()
  {
    $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $.ajax({
      url: "../PHP/vercategoriaproductodetallado.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        {
          $("#1").html(v.idcategoria_producto);
          $("#2").html(v.nombre);
          $("#categoriaproducto").val(v.nombre);
        });
        
      },
      error: function(error)
      {
        alert("El error es: "+error);
      }
    });
    $("#elimina").click(function()
	{
		$.mobile.changePage("#confirmar",'pop',true,true);
	});
	$("#eliminar").click(function()
	{
		$.post("../PHP/eliminacategoriaproducto.php",function(respuesta){
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
		var nombre=$("#categoriaproducto").val();
		if (nombre=="")
		{
			$.mobile.changePage('#pageLlenar', 'pop', true, true);
			return null;
		}
        $.post("../PHP/editacategoriaproducto.php",{nombre:nombre},function(respuesta){
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