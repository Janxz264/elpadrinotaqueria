<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
	require_once ('conexion.php');
	session_start();
	$nombre=$_POST['nombre'];

	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("UPDATE categoria_producto set nombre=? where idcategoria_producto=?");	
			if($sqlquery->execute(array($nombre,$_SESSION['idguardada'])))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
