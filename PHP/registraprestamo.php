<?php
	require_once ('conexion.php');
	session_start();
	$fecha_pedido=$_POST['fecha_pedido'];
	$cantidad=$_POST['cantidad'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO `elpadrino`.`prestamos` (`IDEMPLEADOS`, `CANTIDAD`, `FECHA_PEDIDO`) VALUES (?,?,?);");	
			if($sqlquery->execute(array($_SESSION['idguardada'],$cantidad,$fecha_pedido)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
		
			$dblink==null;
		}
