<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.min.js" />
		<link rel="stylesheet" type="text/css" href="cadastros.css" media="screen" />
		<title>Cadastro</title>
	   
    </head>
    <body>
		<div id="menu">
            <ul>
              <li><a href="login.php">Realizar Login</a></li>
            </ul>
		</div>
		
		<form action="cadastrarUsuario.php" class="box" method="post">
			
			<?php
                if(isset($_SESSION['msg'])){
                    echo $_SESSION['msg'];
                    unset($_SESSION['msg']);
                }
			?>
			
			<div>
				<label for="nome_completo">Nome completo:</label> 
                <input type="text" id="nome_completo" name="nome_completo"/>
			</div> <br>
			
			<div>
                <label for="data_nascimento">Data de nascimento:</label>
				<input type="date" id="data_nascimento" name="data_nascimento" />
            </div> <br>
			
			<div >
				<label for="cpf">CPF:</label>
				<input type="text" name="cpf" id="cpf" maxlength="14" onkeydown="javascript: fMasc( this, mCPF );">     
			</div> <br>
			
            <div>
				<label for="telefone">Telefone:</label>
                <input type="text" name="telefone" id="telefone" maxlength="14" onkeydown="javascript: fMasc( this, mTel );">
                
            </div> <br>
            <div class="column-3 column label">
				<label for="email">Email:</label>
                <input type="text" id="email" name="email"/>
            </div> <br>
            <div>
				<label for="usuario">Usuario:</label>
                <input type="text" id="usuario" name="usuario"/>
            </div> <br>
            <div>
				<label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" />
            </div> <br>

            <div>
                <button type="submit"  value="enviar" id="envia" >Enviar</button>
            </div>
		</form>
		
		<script >
			function fMasc(objeto,mascara) {
				obj=objeto
				masc=mascara
				setTimeout("fMascEx()",1)
			}
			function fMascEx() {
				obj.value=masc(obj.value)
			}
			function mTel(tel) {
				tel=tel.replace(/\D/g,"")
				tel=tel.replace(/^(\d)/,"($1")
				tel=tel.replace(/(.{3})(\d)/,"$1)$2")
				if(tel.length == 9) {
					tel=tel.replace(/(.{1})$/,"-$1")
				} else if (tel.length == 10) {
					tel=tel.replace(/(.{2})$/,"-$1")
				} else if (tel.length == 11) {
					tel=tel.replace(/(.{3})$/,"-$1")
				} else if (tel.length == 12) {
					tel=tel.replace(/(.{4})$/,"-$1")
				} else if (tel.length > 12) {
					tel=tel.replace(/(.{4})$/,"-$1")
				}
				return tel;
			}
			function mCPF(cpf){
				cpf=cpf.replace(/\D/g,"")
				cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
				cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
				cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
				return cpf
			}

		</script> 
    
    </body>
</html>