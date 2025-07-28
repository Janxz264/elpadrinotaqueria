
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
	$query = "SELECT idprestamos, idempleados, cantidad, date_format(fecha_pedido, '%W %D %M %Y') FROM prestamos WHERE MONTH(fecha_pedido)=".$mes." AND YEAR(fecha_pedido)=".$anio." AND fecha_pagado<=>null";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idprestamos"=>$row[0], "idempleados"=>$row[1], "cantidad"=>$row[2], "fecha_pedido"=>$row[3], "fecha_pagado"=>$row[4]));
	   }
     echo json_encode($json);
	}
}
?>