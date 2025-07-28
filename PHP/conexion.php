<?php
$pdo_connect_user = 'root';
$pdo_connect_pass = '';
$pdo_connect_host = 'localhost';
$pdo_connect_dbname = 'elpadrino';

$pdo_connect_dsn = 'mysql:host='.$pdo_connect_host.';dbname='.$pdo_connect_dbname;
$dblink = new PDO($pdo_connect_dsn, $pdo_connect_user, $pdo_connect_pass);
$dblink->exec('SET NAMES utf8');