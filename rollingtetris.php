<?php 
    session_start();

    if(!isset($_SESSION['user'])){
        header("Location: login.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="rollingtetris.css" media="screen" />
       
        <title>Tetris</title>

    </head>
    <body>
        <audio src="som/Tetris.mp3" loop id="Tetris"  class="Tetris"></audio>
        <audio src="som/Moeda.mp3" class="Moeda"></audio>
        <audio src="som/Galvao.mpeg" class="Galvao"></audio>

        <div class = 'pagina'>
            <header> 
                <nav>
                    <div class="MusicaTetris"> 
                        <button onclick="document.getElementById('Tetris').play()">Play</button> 
                        <button onclick="document.getElementById('Tetris').pause()">Pause</button> 
                        <button onclick="document.getElementById('Tetris').volume += 0.1">Vol +</button> 
                        <button onclick="document.getElementById('Tetris').volume -= 0.1">Vol -</button> 
                      </div>
                    <ul>
                        <li><a href="rankingGlobal.php" style="color: white;">Ranking Global</a></li>
                        <li><a href="editarCadastro.php" style="color: white;">Editar Informaçao Pessoal</a></li>
                        <li><a href="desconectar.php" style="color: white;">Desconectar</a></li>
                    </ul>
                </nav>
            </header>

            <div class = "principal">

                <div class = "tabelaAtual">
                    <table >
                        <tr>
                            <th>Tempo da partida</th>
                            <th>Pontuação</th>
                            <th>Linhas eliminadas</th>
                            <th>Nível de dificuldade</th>
                        </tr>
                        <tr>
                            <td id ="tempo"><?php if(isset($_SESSION['tempo'])){ echo $_SESSION['tempo']; }else{echo 0;} ?></td>
                            <td id ="pontuacao"><?php if(isset($_SESSION['pontuacao'])){ echo $_SESSION['pontuacao']; }else{echo 0;} ?></td>
                            <td id ="linhas_eliminadas"><?php if(isset($_SESSION['linhasEliminadas'])){ echo $_SESSION['linhasEliminadas']; }else{echo 0;} ?></td>
                            <td id ="nivel_dificuldade"><?php if(isset($_SESSION['nivel'])){ echo $_SESSION['nivel']; }else{echo 0;} ?></td>
                        </tr>
                       
                    
                    </table>
                </div>

                <form action="gravarRanking.php" method="POST" id="formRanking">
                    <input type="hidden" name="Subtempo" id="Subtempo">
                    <input type="hidden" name="Subpontuacao" id="Subpontuacao">
                    <input type="hidden" name="Sublinhas_eliminadas" id="Sublinhas_eliminadas">
                    <input type="hidden" name="Subnivel_dificuldade" id="Subnivel_dificuldade">
                </form>

                <?php
                
                    if(isset($_SESSION['tempo']) AND isset($_SESSION['pontuacao'])  AND isset($_SESSION['linhasEliminadas'])  AND isset($_SESSION['nivel']) ){
                        unset($_SESSION['tempo']);
                        unset($_SESSION['pontuacao']);
                        unset($_SESSION['linhasEliminadas']);
                        unset($_SESSION['nivel']);

                    }
                ?>

                <div class = "corpo"> 
                    <?php
                        if(isset($_SESSION['msg'])){
                            echo $_SESSION['msg'];
                            unset($_SESSION['msg']);
                        }
                    ?>

                    <button onclick="gameStart(10,20)">Tabuleiro 10x20</button>
                    <button onclick="gameStart(22,44)">Tabuleiro 22x44</button>

                </div>

                <div class = "tabelaLocal">
                    <table >
                        <tr>
                            <th>Nome do jogador</th>
                            <th>Pontuação obtida</th>
                            <th>Nível atingido</th>
                            <th>Tempo de duração da partida</th>
                        </tr>
                        
                                
                    <?php 
                    
                        require_once( 'dbconnect.php' );

                        $usuario = $_SESSION['user'];
                        
                        $queryUsuario = "SELECT * FROM Ranking WHERE nomeUsuario = '$usuario' ORDER BY pontuacao DESC,nivel DESC LIMIT 10";

                        $resultUser = mysqli_query($connect,$queryUsuario);
                        
                        while($row_usuario = mysqli_fetch_assoc($resultUser)){
                            echo "<tr>";

                            echo "<td>" . $row_usuario["nomeUsuario"] . "</td>";
                            echo "<td>" . $row_usuario["pontuacao"] . "</td>";
                            echo "<td>" . $row_usuario["nivel"] . "</td>";
                            echo "<td>" . $row_usuario["tempoPartida"] . "</td>";

                            echo "</tr>";
                        }
                    ?>

                            
                    </table>
                
                </div>
            
            </div>

            <script src="js/formatoPeca.js"></script>
            <script src="js/peca.js"></script>            
            <script src="js/funcoes.js"></script>
            <script src="js/jogo.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        </div>
    </body>

    
</html>