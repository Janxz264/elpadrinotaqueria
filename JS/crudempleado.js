$(document).ready(function()
  {
    $.post("../PHP/revisasesion.php",{},function(respuesta){

           if(respuesta=="2"){
              alert("Debe iniciar sesión");
              location.href="../index.html";
           }
  });
    $.ajax({
      url: "../PHP/verempleadodetallado.php", 
      type: "POST", 
      dataType: "json", 
      success: function(data)
      { 
        $.each(data, function(k,v)
        {
          $("#1").html(v.idempleados);
          $("#2").html("$"+v.salario);
          $("#3").html(v.nombre);
          $("#4").html(v.paterno);
          $("#5").html(v.materno);
          $("#6").html(v.fecha_ingreso);
          $("#nombreempleado").val(v.nombre);
          $("#paternoempleado").val(v.paterno);
          $("#maternoempleado").val(v.materno);
          $("#fechaingreso").val(v.fecha_ingreso);
          $("#salario").val(v.salario);
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
        $('#inasistencia').val(yyyy + '-' + mm + '-' + dd);
        $('#fechaprestamo').val(yyyy + '-' + mm + '-' + dd);
	$("#eliminar").click(function()
	{
		$.post("../PHP/eliminaempleado.php",function(respuesta){
            if (respuesta == 1) {
                $.mobile.changePage('#pageExito', 'pop', true, true);
                location.href="empleados.html";
            }
           else{
           		$.mobile.changePage('#pageError', 'pop', true, true);
           		location.href="empleados.html";
           }
        });
	});
	$("#editar").click(function()
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
        $.post("../PHP/editaempleado.php",{ nombre : nombre, paterno : paterno, materno : materno, fechaingreso : fechaingreso, salario : salario},function(respuesta){
            if (respuesta == "1") {
                location.href="empleados.html";
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
  $("#registrainasistencia").click(function()
  {
        var fecha = $("#inasistencia").val();
        $.post("../PHP/registrainasistencia.php",{ fecha : fecha},function(respuesta){
            if (respuesta == "1") {
                location.href="verinfoempleado.html";
            }
            else if (respuesta=="2")
            {
              $.mobile.changePage('#pageErrorAsistencia', 'pop', true, true);
              return null;
            }
            else{
              alert(respuesta);
            }
        });
  });
    $("#botonasistencia").click(function()
  {
        $("#fechainasistencia").val("");
  });
    $("#registraprestamo").click(function()
  {
        var fecha_pedido = $("#fechaprestamonuevo").val();
        var cantidad = $("#prestamo").val();
        if(cantidad=="")
        {
          $.mobile.changePage('#pageLlenar','pop',true,true);
          return null;
        }
        $.post("../PHP/registraprestamo.php",{ fecha_pedido : fecha_pedido, cantidad : cantidad},function(respuesta){
            if (respuesta == "1") {
                location.href="verinfoempleado.html";
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
    $("#botonprestamo").click(function()
  {
        $("#fechaprestamo").val("");
  });
  });	 
function handler(e){
  $("#constultadeinasistencias").empty();

  var fecha=$("#fechainasistencia").val();
  $.ajax({
      url: "../PHP/verinasistencias.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#constultadeinasistencias").append( 
            $('<p>').append(
              $('<a>').html(v.fecha).addClass("ui-btn ui-btn-icon-right ui-icon-minus").attr("onclick","cambiarasistencia("+v.idasistencia+");")
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
function cambiarasistencia(id){
  if (confirm('¿Desea modificar la asistencia de esta fecha a "ASISTIÓ"?') == true) {
    $.post("../PHP/cambiaasistencia.php",{ id : id},function(respuesta){
            if (respuesta == "1") {
                location.href="verinfoempleado.html";
            }
            else if (respuesta=="2")
            {
              $.mobile.changePage('#pageErrorAsistencia', 'pop', true, true);
              return null;
            }
            else{
              alert(respuesta);
            }
});
}
}
function handlera(e){
  $("#consultadeprestamos").empty();

  var fecha=$("#fechaprestamo").val();
  $.ajax({
      url: "../PHP/verprestamos.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadeprestamos").append( 
            $('<p>').append(
              $('<a>').html("$"+v.cantidad+" el<br><p>"+v.fecha_pedido+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-minus").attr("onclick","cambiarprestamo("+v.idprestamos+");")
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
function cambiarprestamo(id){
  if (confirm('¿Desea saldar este préstamo el día de hoy?') == true) {
    $.post("../PHP/cambiaprestamo.php",{ id : id},function(respuesta){
            if (respuesta == "1") {
              alert("Préstamo saldado");
              location.href="verinfoempleado.html";
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
}
}
function handlerb(e){
  $("#consultadeprestamossaldados").empty();

  var fecha=$("#fechaprestamosaldado").val();
  $.ajax({
      url: "../PHP/verprestamossaldados.php", 
      type: "POST", 
      dataType: "json",
      data: {fecha:fecha}, 
      success: function(data)
      { 
        $.each(data, function(k,v)
        { 
          $("#consultadeprestamossaldados").append( 
            $('<p>').append(
              $('<a>').html("$"+v.cantidad+" el<br><p>"+v.fecha_pedido+"</p><br><p>Saldado el "+v.fecha_pagado+"</p>").addClass("ui-btn ui-btn-icon-right ui-icon-check")
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