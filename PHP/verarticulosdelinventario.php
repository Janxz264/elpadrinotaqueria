
<?php
session_start();
$id=$_POST['id'];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT i.idinventario,i.fecha,ia.cantidad,a.nombre,a.precio FROM inventario AS i, inventario_articulo AS ia, articulo AS a WHERE i.IDINVENTARIO=ia.IDINVENTARIO AND ia.IDARTICULO=a.IDARTICULO AND i.idinventario='".$id."'";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idinventario"=>$row[0], "fecha"=>$row[1], "cantidad"=>$row[2], "nombre"=>$row[3], "precio"=>$row[4]));
	   }
     echo json_encode($json);
	}
}
?>