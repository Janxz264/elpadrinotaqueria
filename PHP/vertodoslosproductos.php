
<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT idproductos, productos.nombre AS 'producto', productos.idcategoria_producto, productos.precio, categoria_producto.nombre AS 'categoria' from productos, categoria_producto WHERE categoria_producto.idcategoria_producto=productos.idcategoria_producto";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idproductos"=>$row[0], "producto"=>$row[1], "idcategoria_producto"=>$row[2], "precio"=>$row[3], "categoria"=>$row[4]));
	   }
     echo json_encode($json);
	}
}
?>