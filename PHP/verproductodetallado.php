<?php
session_start();
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT idproductos,productos.nombre,productos.precio,categoria_producto.nombre AS 'categoria', productos.idcategoria_producto FROM productos, categoria_producto WHERE categoria_producto.idcategoria_producto=productos.idcategoria_producto AND idproductos=".$_SESSION['idguardada'].";";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idproductos"=>$row[0], "nombre"=>$row[1], "precio"=>$row[2], "categoria"=>$row[3], "idcategoria_producto"=>$row[4]));
	   }
     echo json_encode($json);
	}
}
?>