<?php
	require_once ('conexion.php');
	session_start();
	$titulo_mensaje=$_POST['titulo_mensaje'];
	$cuerpo_mensaje=$_POST['cuerpo_mensaje'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("INSERT INTO mensajes VALUES (null,?,?,?,now(),0)");	
			if($sqlquery->execute(array($_SESSION['idsesion'],$titulo_mensaje,$cuerpo_mensaje)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
