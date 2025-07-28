<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once ('conexion.php');
	session_start();
		if (!$dblink) {
    		echo "4";
    		//La conexión a la base de datos no se estableció
		}
		else{
			$sqlquery=$dblink->prepare("DELETE FROM productos where idproductos=?");
			if($sqlquery->execute(array($_SESSION['idguardada'])))
			{
				echo "1";
				//Eliminación exitosa
			}
			else{
				echo "2";
				//No se eliminó nada
			} 
		}
	$db=null;
	$sqlquery=null;

