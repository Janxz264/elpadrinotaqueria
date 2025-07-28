<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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
			$sqlquery=$dblink->prepare("UPDATE empleados set salario=?, nombre=?, paterno=?, materno=?, fecha_ingreso=? where idempleados=?");	
			if($sqlquery->execute(array($salario,$nombre,$paterno,$materno,$fechaingreso,$_SESSION['idguardada'])))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
