
<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * from empleados;";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idempleados"=>$row[0], "salario"=>$row[1], "nombre"=>$row[2], "paterno"=>$row[3], "materno"=>$row[4], "fecha_ingreso"=>$row[5]));
	   }
     echo json_encode($json);
	}
}
?>