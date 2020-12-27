<?php
session_start();

require_once( 'dbconnect.php' );

$usuarioLogin = filter_input(INPUT_POST, 'usuario',FILTER_SANITIZE_STRING);
$senha = filter_input(INPUT_POST, 'senha',FILTER_SANITIZE_STRING);

$senhaCriptografada = md5($senha);

$queryUsuario = "SELECT * FROM Usuarios Where usuario = '$usuarioLogin' AND senha = '$senhaCriptografada'";
$resultUser = mysqli_query($connect,$queryUsuario);

$existe = false;
while($row_usuario = mysqli_fetch_assoc($resultUser)){
    $existe = true;
}

if($existe){

    $_SESSION['user'] = $usuarioLogin;
    $_SESSION['senha'] = $senhaCriptografada;

    header("Location: rollingtetris.php");

}else{

    $_SESSION['msg'] = "Usuario ou senha incorreto";

    echo "<script>javascript:history.go(-1) </script>";
    
}

?>


