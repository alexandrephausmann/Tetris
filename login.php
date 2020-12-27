<?php
    session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="login.css" media="screen" />
		<title>Login</title>

    
    </head>
    <body>
        <div id="menu">
            <ul>
              <li><a href="cadastro.php">Realizar Cadastro</a></li>
            </ul>
        </div>

        <form action="realizarLogin.php" class="box" method="post">
            
            <?php
                if(isset($_SESSION['msg'])){
                    echo $_SESSION['msg'];
                    unset($_SESSION['msg']);
                }
            ?>
            
            <div>
				<label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario"/>
            </div> <br>

            <div>
				<label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" />
            </div> <br>

            <div>
                <button type="submit"  value="enviar">Enviar</button>
            </div>
        </form>
      
    </body>
</html>
