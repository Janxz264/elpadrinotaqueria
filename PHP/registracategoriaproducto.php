<?php
	require_once ('conexion.php');
	session_start();
	$categoria_producto=$_POST['categoria_producto'];

	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO categoria_producto VALUES (null,?)");	
			if($sqlquery->execute(array($categoria_producto)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
