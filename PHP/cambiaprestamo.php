<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
	require_once ('conexion.php');
	session_start();
	$id=$_POST['id'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("UPDATE prestamos SET fecha_pagado=now() WHERE idprestamos=?");	
			if($sqlquery->execute(array($id)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
