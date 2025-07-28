<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
	require_once ('conexion.php');
	session_start();
	$nombre=$_POST['nombre'];
	$categoria=$_POST['categoria'];
	$precio=$_POST['precio'];

	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("UPDATE productos set nombre=?, idcategoria_producto=?, precio=? where idproductos=?");	
			if($sqlquery->execute(array($nombre,$categoria,$precio,$_SESSION['idguardada'])))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
