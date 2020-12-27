<?php

    session_start();

    require_once( 'dbconnect.php' );

    $tempo = $_POST['Subtempo'];
    $pontuacao = $_POST['Subpontuacao'];
    $linhasEliminadas = $_POST['Sublinhas_eliminadas'];
    $nivel = $_POST['Subnivel_dificuldade'];

    if(!empty($tempo)){
        $_SESSION['tempo'] = $tempo;
    }

    if(!empty($pontuacao)){
        $_SESSION['pontuacao'] = $pontuacao;
    }

    if(!empty($linhasEliminadas)){
        $_SESSION['linhasEliminadas'] = $linhasEliminadas;
    }

    if(!empty($nivel)){
        $_SESSION['nivel'] = $nivel;
    }

    $usuario = $_SESSION['user'];

    $query = "INSERT INTO Ranking (nomeUsuario,pontuacao,nivel,tempoPartida,linhasEliminadas) VALUES ('$usuario','$pontuacao','$nivel','$tempo','$linhasEliminadas')";

    $result = mysqli_query($connect,$query);

    if(mysqli_insert_id($connect)){
        header("Location: rollingtetris.php");
    }else{
        $_SESSION['msg'] = "Erro ao inserir ranking nesse usuario";
        echo "<script>javascript:history.go(-1) </script>";
    }

?>