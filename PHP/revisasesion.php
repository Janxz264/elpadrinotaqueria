<?php
session_start();
if($_SESSION['idsesion']){
	echo "1";
}
else{
	echo "2";
}
?>