<?php
	require_once ('conexion.php');
	session_start();
	$nombre=$_POST['nombre'];
	$paterno=$_POST['paterno'];
	$materno=$_POST['materno'];
	$fechaingreso=$_POST['fechaingreso'];
	$salario=$_POST['salario'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO empleados VALUES (null,?,?,?,?,?,null)");	
			if($sqlquery->execute(array($salario,$nombre,$paterno,$materno,$fechaingreso)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
