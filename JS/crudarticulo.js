$(document).ready(function()
  {
    $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $.ajax({
      url: "../PHP/verarticulodetallado.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        {
          $("#1").html(v.idarticulo);
          $("#2").html(v.nombre);
          $("#4").html(v.precio);
          $("#nombreproducto").val(v.nombre);
          $("#precio").val(v.precio);
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
		$.post("../PHP/eliminaarticulo.php",function(respuesta){
            if (respuesta == 1) {
                $.mobile.changePage('#pageExito', 'pop', true, true);
                location.href="inventario.html";
            }
           else{
           		$.mobile.changePage('#pageError', 'pop', true, true);
           		location.href="inventario.html";
           }
        });
	});
	$("#editar").click(function()
	{
		var nombre=$("#nombreproducto").val();
    var precio=$("#precio").val();
		if (nombre==""||precio=="")
		{
			$.mobile.changePage('#pageLlenar', 'pop', true, true);
			return null;
		}
        $.post("../PHP/editaarticulo.php",{nombre:nombre, precio:precio},function(respuesta){
            if (respuesta == "1") {
                location.href="inventario.html";
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