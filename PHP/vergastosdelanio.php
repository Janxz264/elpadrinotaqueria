<?php
session_start();
$fecha=$_POST['fecha'];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * FROM gastos_servicios WHERE YEAR(fecha)='".$fecha."'";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idgastos_servicios"=>$row[0], "nombre"=>$row[1], "costo"=>$row[2], "fecha"=>$row[3]));
	   }
     echo json_encode($json);
	}
}
?>