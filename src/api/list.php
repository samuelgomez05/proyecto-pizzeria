<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require('connection.php');

$sql = mysqli_query($con, 'SELECT * FROM pizzas');

$registers = [];

while ($row = mysqli_fetch_assoc($sql)) {
  $registers[] = $row;
}

$cad = json_encode($registers);

echo $cad;

mysqli_close($con);

?>