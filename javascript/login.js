import { usuarioAuthPromise} from './autentificacao.js';

document.addEventListener('DOMContentLoaded', function () {
    usuarioAuthPromise.then(usuarioAuth => {
        user_autenticado(usuarioAuth.usuarioAuth);
        
    });
});


function user_autenticado(usuarioAuth){
    if (usuarioAuth === 'visitante') {
        login();
    } else {
        window.location.replace("index.html");
    }
}

// Certifique-se de que onload está definida antes de usá-la
function login() {
    document.getElementById("btnLogin").addEventListener("click", function (evento) {
        evento.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var msg = document.getElementById("msg");
        
        fetch(backendAddress + "account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.response == "Autentificacao certa") {
                var token = data.token;
                localStorage.setItem("token", token);
                window.location.replace("index.html");
            } else if (data.response) {
                msg.innerHTML = data.response;
            } else {
                throw new Error("Falha na autenticação");
            }
        })
        .catch(function (error) {
            console.log(error);
            msg.innerHTML = "Erro durante o login. Por favor, tente novamente.";
        });
    });
}
