<?php
	require_once ('conexion.php');
	session_start();
	$fecha=$_POST['fecha'];
	if (!$dblink) {
    		echo "4";
		}
		else{
			$revisa=$dblink->prepare("SELECT * FROM asistencia where fecha=? and idempleados=?");
			$revisa->execute(array($fecha,$_SESSION['idguardada']));
			if($revisa->fetchColumn() >0){
				echo "2"; //Esta fecha ya fue registrada como falta
			}
			else{
			$sqlquery=$dblink->prepare("INSERT INTO asistencia VALUES (null,?,?)");	
			if($sqlquery->execute(array($_SESSION['idguardada'],$fecha)))
			{
				echo "1";	
			}
			else{
				print_r($sqlquery->errorInfo());
			}
		}
			$dblink==null;
		}
