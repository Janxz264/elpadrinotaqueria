<?php
	require_once ('conexion.php');
	session_start();
	$id=$_POST['id'];

	if (!$dblink) {
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("UPDATE mensajes SET visto=1 WHERE idmensajes=".$id);	
			if($sqlquery->execute(array($categoria_producto)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
			$dblink==null;
		}
