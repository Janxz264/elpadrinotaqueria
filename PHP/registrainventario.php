<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
	require_once ('conexion.php');
	session_start();
	$fecha=$_POST['fecha'];
	$productocantidad=$_POST['productocantidad'];
	$count=count($productocantidad);
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO inventario VALUES (null,?)");	
			if($sqlquery->execute(array($fecha)))
			{
				$last_id = $dblink->lastInsertId();
				for ($i=0; $i < $count/2; $i++) { 
					$sqlquery2=$dblink->prepare("INSERT INTO inventario_articulo VALUES(?,?,?)");
					$sqlquery2->execute(array($last_id,$productocantidad[$i],$productocantidad[$i+1]));
				}
				
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
