<?php

include_once('connection.php');
$sql="INSERT INTO hacks (name, idea) VALUES ('$_GET[name]','$_GET[idea]')";
?>