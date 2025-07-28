<?php
	require_once ('conexion.php');
	session_start();
	$producto=$_POST['producto'];
	$precio=$_POST['precio'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO articulo VALUES (null,?,?)");	
			if($sqlquery->execute(array($producto,$precio)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
