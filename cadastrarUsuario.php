<?php
session_start();

require_once( 'dbconnect.php' );

$nome = filter_input(INPUT_POST, 'nome_completo',FILTER_SANITIZE_STRING);
$data = filter_input(INPUT_POST, 'data_nascimento',FILTER_SANITIZE_STRING);
$cpf = filter_input(INPUT_POST, 'cpf',FILTER_SANITIZE_STRING);
$telefone = filter_input(INPUT_POST, 'telefone',FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email',FILTER_SANITIZE_STRING);
$usuario = filter_input(INPUT_POST, 'usuario',FILTER_SANITIZE_STRING);
$senha = filter_input(INPUT_POST, 'senha',FILTER_SANITIZE_STRING);

$queryUsuario = "SELECT * FROM Usuarios Where usuario = '$usuario'";
$resultUser = mysqli_query($connect,$queryUsuario);

$existe = false;
while($row_usuario = mysqli_fetch_assoc($resultUser)){
    $existe = true;
}

if($existe){
    $_SESSION['msg'] = "Usuario ja existe";
    echo "<script>javascript:history.go(-1) </script>";
    
}else{
    $senhaCriptografada = md5($senha);
    $query = "INSERT INTO Usuarios (nomeCompleto,dataNascimento,cpf,telefone,email,usuario,senha) VALUES ('$nome','$data','$cpf','$telefone','$email','$usuario','$senhaCriptografada')";

    $result = mysqli_query($connect,$query);

    if(mysqli_insert_id($connect)){
        header("Location: login.php");
    }else{
        $_SESSION['msg'] = "Erro ao inserir novo usuario";
        echo "<script>javascript:history.go(-1) </script>";
    }
}

?>