<?php
$hostname="localhost";
$username="root";
$password="";
$dbname="tetris";

$connect = mysqli_connect($hostname,$username, $password);
$db = mysqli_select_db ($connect,$dbname);

?>