<?php
	require_once ('conexion.php');
	session_start();
	$cantidad=$_POST['cantidad'];
	$fecha=$_POST['fecha'];
	$nombre=$_POST['nombre'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO gastos_servicios VALUES (null,?,?,?)");	
			if($sqlquery->execute(array($nombre,$cantidad,$fecha)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
