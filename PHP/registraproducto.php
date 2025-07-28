<?php
	require_once ('conexion.php');
	session_start();
	$producto=$_POST['producto'];
	$categoria_producto=$_POST['categoria_producto'];
	$precio=$_POST['precio'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO productos VALUES (null,?,?,?)");	
			if($sqlquery->execute(array($categoria_producto,$producto,$precio)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
