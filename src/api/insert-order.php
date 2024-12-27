<?php

require('connection.php');

$total = $_POST['order-total'];
$date = $_POST['order-date'];

$sql = mysqli_query($con, "INSERT INTO pedidos (total, fecha) VALUES ('$total', '$date')");

mysqli_close($con); 

header('Location: https://samuelgomez.fwh.is/carrito.html');

?>