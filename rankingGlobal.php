<?php 
    session_start();

    if(!isset($_SESSION['user'])){
        header("Location: login.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="rankingGlobal.css" media="screen" />
        <script src="js/tetris.js"></script>
       
        <title>Ranking Global</title>

    </head>
    <body>
       
        <table >
            <tr>
                <th>Usernames</th>
                <th>Pontuação</th>
                <th>Nível máximo</th>
            </tr>

            <?php 
                
                require_once( 'dbconnect.php' );
                
                $queryUsuario = "SELECT * FROM Ranking ORDER BY pontuacao DESC,nivel DESC LIMIT 10";
                $resultUser = mysqli_query($connect,$queryUsuario);
                
                while($row_usuario = mysqli_fetch_assoc($resultUser)){
                    echo "<tr>";

                    echo "<td>" . $row_usuario["nomeUsuario"] . "</td>";
                    echo "<td>" . $row_usuario["pontuacao"] . "</td>";
                    echo "<td>" . $row_usuario["nivel"] . "</td>";

                    echo "</tr>";
                }
                 ?>
        </table>
        
        <div>
            <button onclick="window.location.href = 'rollingtetris.php'"  value="voltar" >Voltar</button>
        </div>

    </body>

    
</html>

