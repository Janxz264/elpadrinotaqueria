
<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT * from productos where idcategoria_producto=".$_SESSION['idguardada'].";";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idproductos"=>$row[0], "idcategoria_producto"=>$row[1], "nombre"=>$row[2], "precio"=>$row[3]));
	   }
     echo json_encode($json);
	}
}
?>