
<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$fecha=$_POST['fecha'];
$fechaarray=explode("-",$fecha);
$mes=$fechaarray[1];
$anio=$fechaarray[0];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * FROM inventario WHERE MONTH(fecha)=".$mes." AND YEAR(fecha)=".$anio;;
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idinventario"=>$row[0], "fecha"=>$row[1]));
	   }
     echo json_encode($json);
	}
}
?>