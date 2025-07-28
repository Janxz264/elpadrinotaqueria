
<?php
session_start();
$id=$_POST['id'];
$conexion = mysqli_connect('localhost', 'root', '') or die ("Error en la conexión".mysqli_error());
if ($conexion)
{
        mysqli_select_db($conexion, 'elpadrino') or die ("Error al seleccionar la base de datos");
	$query = "SELECT n.IDNOTAS,n.FECHA,n.EFECTIVO,n.TARJETA,np.CANTIDAD,p.NOMBRE AS 'nombreproducto',p.PRECIO,cp.NOMBRE AS 'nombrecategoria' FROM notas AS n, notas_productos AS np, productos AS p, categoria_producto AS cp WHERE n.IDNOTAS=np.IDNOTAS AND np.IDPRODUCTOS=p.IDPRODUCTOS AND p.IDCATEGORIA_PRODUCTO=cp.IDCATEGORIA_PRODUCTO  AND n.IDNOTAS='".$id."'";
        $resultado = $conexion->query($query);
	$json = array();
	if($resultado){ 
	   while ($row = $resultado->fetch_row()) {
    	     array_push($json, array("idnotas"=>$row[0], "fecha"=>$row[1], "efectivo"=>$row[2], "tarjeta"=>$row[3], "cantidad"=>$row[4], "nombreproducto"=>$row[5], "precio"=>$row[6], "nombrecategoria"=>$row[7],));
	   }
     echo json_encode($json);
	}
}
?>