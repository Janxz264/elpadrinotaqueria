
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
$fecha=$_POST['fecha'];
$fechaarray=explode("-",$fecha);
$mes=$fechaarray[1];
$anio=$fechaarray[0];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * FROM gastos_servicios WHERE MONTH(fecha)=".$mes." AND YEAR(fecha)=".$anio;
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