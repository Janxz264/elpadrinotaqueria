<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT m.idmensajes, m.titulo, m.MENSAJE, date_format(m.fecha_hora, '%W %D %M %Y') AS 'fecha_hora', date_format(m.fecha_hora, '%r') AS 'hora_fecha', m.VISTO, u.username from mensajes AS m, usuarios AS u where m.idusuarios=u.idusuarios AND idmensajes=".$_SESSION['idguardada'];
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idmensajes"=>$row[0], "titulo"=>$row[1], "mensaje"=>$row[2], "fecha_hora"=>$row[3], "hora_fecha"=>$row[4], "visto"=>$row[5], "username"=>$row[6]));
	   }
     echo json_encode($json);
	}
}
?>