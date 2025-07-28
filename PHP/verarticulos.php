<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * from articulo";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idarticulo"=>$row[0], "nombre"=>$row[1], "precio"=>$row[2]));
	   }
     echo json_encode($json);
	}
}
?>