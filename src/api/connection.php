<?php

/* CONEXION LOCAL */
$server = 'localhost';
$user = 'root';
$password = '';
$db = 'bdexamenfinal';

$con = mysqli_connect($server, $user, $password, $db);

mysqli_set_charset($con, 'utf8');

?>