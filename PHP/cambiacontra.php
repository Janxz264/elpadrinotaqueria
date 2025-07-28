<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once ('conexion.php');
	session_start();
	$oldpass=$_POST['contraoriginal'];
	$newpass=$_POST['contranueva'];

		if (!$dblink) {
    		echo "4";
    		//La conexión a la base de datos no se estableció
		}
		else{
			$sqlquery=$dblink->prepare("SELECT * from usuarios where idusuarios=?");
			$sqlquery->execute(array($_SESSION['idsesion']));
			$result=$sqlquery->fetch();
			if (password_verify($oldpass, $result[3]))
			{
				$hashpass=password_hash($newpass, PASSWORD_BCRYPT, ['cost' => 12]);
				$update=$dblink->prepare("UPDATE usuarios SET password=? WHERE idusuarios=?");
				$update->execute(array($hashpass,$_SESSION['idsesion']));
				echo "1"; //Contraseña cambiada con éxito
			}
			else{
				echo "2";
				//La contraseña no corresponde
			} 
		}
	$db=null;
	$sqlquery=null;

