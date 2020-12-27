<?php

session_start();
unset($_SESSION['user']);
unset($_SESSION['senha']);
unset($_SESSION['tempo']);
unset($_SESSION['pontuacao']);
unset($_SESSION['linhasEliminadas']);
unset($_SESSION['nivel']);


session_destroy();

header("Location: login.php");

?>