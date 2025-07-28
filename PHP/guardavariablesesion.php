<?php
session_start();
$id=$_POST[id];
$_SESSION['idguardada']=$id;
echo "".$_SESSION['idguardada']."";
?>