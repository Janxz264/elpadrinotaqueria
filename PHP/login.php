<?php
require_once ('conexion.php');
	$name=$_POST['usu'];
	$password=$_POST['pass'];
		if (!$dblink) {
			//Problemas en la conexión a la base de datos
    		echo "4";
		}
		else{
			$sqlquery=$dblink->prepare("SELECT * from usuarios where username=? or email=?");
			$sqlquery->execute(array($name,$name));
				if($sqlquery->fetchColumn() >0){
				$getpass=$dblink->prepare("SELECT password from usuarios where username=? or email=?");
				$getpass->execute(array($name,$name));
				$result=$getpass->fetch();
				if (password_verify($password, $result['password'])) {
					$getdata=$dblink->prepare("SELECT * from usuarios where username=? or email=?");
					$getdata->execute(array($name,$name));
					$res=$getdata->fetch();
					session_start();
					$_SESSION['idsesion']=$res[0];	
					$_SESSION['rolsesion']=$res[1];
					$_SESSION['usuariosesion']=$res[2];
					$_SESSION['correosesion']=$res[4];
					echo "1";
					//Éxito en la conexión
				}
						 else {
    				echo "2"; //Usuario o contraseña incorrectos
				}
			}
			else{
				echo "3";
				//El usuario no existe
			}
		}
	$dblink=null;
	$sqlquery=null;
	$getpass=null;
	$getdata=null;
	$getinfo=null;
	$res=null;
	$result=null;

