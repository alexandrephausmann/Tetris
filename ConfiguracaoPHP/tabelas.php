<?php

	require_once( 'dbconnect.php' );

    $sql = "CREATE TABLE Usuarios (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nomeCompleto VARCHAR(100),
        dataNascimento DATE,
        cpf VARCHAR(14),
        telefone VARCHAR(14),
        email VARCHAR(100),
        usuario VARCHAR(100),
        senha VARCHAR(100)
        )";
        
    if ($connect->query($sql) === TRUE) {
        echo "Table Usuarios created successfully";
    } else {
        echo "Error creating table: " . $connect->error;
    }
    
    $sql = "CREATE TABLE Ranking(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nomeUsuario VARCHAR(100),
        pontuacao INT,
        nivel INT,
        tempoPartida INT,
        linhasEliminadas INT
        )";

    if ($connect->query($sql) === TRUE) {
        echo "Table Ranking created successfully";
    } else {
        echo "Error creating table: " . $connect->error;
    }

    $connect->close();
    

	# Check If Record Exists
	/*
	$query = "SELECT * FROM $usertable";
	
	$result = mysqli_query($query);
	
	if($result){
		while($row = mysqli_fetch_array($result)){
			$name = $row["$yourfield"];
			echo "Name: ".$name."br/>";
		}
	}*/
?>