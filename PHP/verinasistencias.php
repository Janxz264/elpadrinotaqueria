
<?php
session_start();
$fecha=$_POST['fecha'];
$fechaarray=explode("-",$fecha);
$mes=$fechaarray[1];
$anio=$fechaarray[0];

$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT idasistencia, idempleados, date_format(fecha, '%W %D %M %Y') FROM asistencia WHERE MONTH(fecha)=".$mes." AND YEAR(fecha)=".$anio;
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idasistencia"=>$row[0], "idempleados"=>$row[1], "fecha"=>$row[2]));
	   }
     echo json_encode($json);
	}
}
?>