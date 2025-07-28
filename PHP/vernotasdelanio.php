
<?php
session_start();
$fecha=$_POST['fecha'];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * FROM notas WHERE YEAR(fecha)=".$fecha;
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idnotas"=>$row[0], "fecha"=>$row[1], "efectivo"=>$row[2], "tarjeta"=>$row[3]));
	   }
     echo json_encode($json);
	}
}
?>