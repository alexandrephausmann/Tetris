
<?php
    session_start();

    if(!isset($_SESSION['user']) AND !isset($_SESSION['senha']) ){
        header("Location: login.php");
        exit;
	}else{
		
		$hostname="localhost";
		$username="root";
		$password="";
		$dbname="tetris";

		$connect = mysqli_connect($hostname,$username, $password);
		$db = mysqli_select_db ($connect,$dbname);

		$usuarioLogin = $_SESSION['user'] ;
		$senha = $_SESSION['senha'];

		$queryUsuario = "SELECT * FROM Usuarios Where usuario = '$usuarioLogin' AND senha = '$senha'";
		$resultUser = mysqli_query($connect,$queryUsuario);

		while($row_usuario = mysqli_fetch_assoc($resultUser)){
            $nome = $row_usuario['nomeCompleto'];
            $data = $row_usuario['dataNascimento'];
            $cpf = $row_usuario['cpf'];
            $telefone = $row_usuario['telefone'];
            $email = $row_usuario['email'];
			
		}

	}
	

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.min.js" />
		<link rel="stylesheet" type="text/css" href="cadastros.css" media="screen" />
		<title>Cadastro</title>
	   
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
    
    </head>
    <body>
        <form action="AlterarUsuario.php" class="box" method="post">
			
			<?php
                if(isset($_SESSION['msg'])){
                    echo $_SESSION['msg'];
                    unset($_SESSION['msg']);
                }
			?>

			<div>
				<label for="nome_completo">Nome completo:</label> 
                <input type="text" id="nome_completo" name="nome_completo" value="<?php if(isset($nome)){ echo $nome; } ?>"/>
			</div> <br>
			
			<div>
                <label for="data_nascimento">Data de nascimento:</label>
				<input type="date" class="disabilitado" id="data_nascimento" value="<?php if(isset($data)){ echo $data; } ?>" name="data_nascimento" readonly />
            </div> <br>
			
			<div >
				<label for="cpf">CPF:</label>
				<input type="text" name="cpf" id="cpf" class="disabilitado" maxlength="14" value="<?php if(isset($cpf)){ echo $cpf; } ?>" onkeydown="javascript: fMasc( this, mCPF );"  readonly>     
			</div> <br>
			
            <div>
				<label for="telefone">Telefone:</label>
                <input type="text" name="telefone" id="telefone" maxlength="14" value="<?php if(isset($telefone)){ echo $telefone; } ?>" onkeydown="javascript: fMasc( this, mTel );">
                
            </div> <br>
            <div class="column-3 column label">
				<label for="email">Email:</label>
                <input type="text" id="email" name="email" value="<?php if(isset($email)){ echo $email; } ?>" />
            </div> <br>
            <div>
				<label for="usuario">Usuario:</label>
                <input type="text" name="usuario" class="disabilitado" id="usuario" value="<?php if(isset($usuarioLogin)){ echo $usuarioLogin; } ?>" readonly />
            </div> <br>
            <div>
				<label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha"  />
            </div> <br>

            <div>
                <button type="submit"  value="enviar" >Enviar</button>
            </div>
        </form>
    </body>
</html>