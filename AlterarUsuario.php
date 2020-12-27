<?php
session_start();

require_once( 'dbconnect.php' );

$nome = filter_input(INPUT_POST, 'nome_completo',FILTER_SANITIZE_STRING);
$telefone = filter_input(INPUT_POST, 'telefone',FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email',FILTER_SANITIZE_STRING);
$senha = filter_input(INPUT_POST, 'senha',FILTER_SANITIZE_STRING);

$usuario = $_SESSION['user'];
$senhaAtual = $_SESSION['senha'];

if(empty($senha)){
   
    $queryUsuario = "UPDATE Usuarios SET nomeCompleto='$nome',telefone='$telefone',email='$email' Where usuario = '$usuario' AND senha = '$senhaAtual'";

}else{
    $senhaCriptografada = md5($senha);

    $queryUsuario = "UPDATE Usuarios SET nomeCompleto='$nome',telefone='$telefone',email='$email',senha='$senhaCriptografada' Where usuario = '$usuario' AND senha = '$senhaAtual'";
}

if(mysqli_query($connect,$queryUsuario)){
    
    header("Location: rollingtetris.php");

}else{
    $_SESSION['msg'] = "Falha ao Atualizar cadastro";
    echo "<script>javascript:history.go(-1) </script>";
}

?>


