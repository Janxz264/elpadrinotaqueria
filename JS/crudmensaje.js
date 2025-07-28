$(document).ready(function()
  {
    $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $.ajax({
      url: "../PHP/vermensajedetallado.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        {
          $("#1").html(v.idmensajes);
          $("#2").html(v.titulo);
          $("#3").html(v.mensaje);
          $("#4").html(v.fecha_hora);
          $("#5").html(v.hora_fecha);
          $("#6").html(v.username);
        });
      },
      error: function(error)
      {
        console.log(error);
        alert(error);
      }
    });
    $("#elimina").click(function()
	{
		$.mobile.changePage("#confirmar",'pop',true,true);
	});
	$("#eliminar").click(function()
	{
		$.post("../PHP/eliminamensaje.php",function(respuesta){
            if (respuesta == 1) {
                $.mobile.changePage('#pageExito', 'pop', true, true);
                location.href="mensajes.html";
            }
           else{
           		$.mobile.changePage('#pageError', 'pop', true, true);
           		location.href="mensajes.html";
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
                location.href="mensajes.html";
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