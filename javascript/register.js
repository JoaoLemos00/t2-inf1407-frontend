document.addEventListener("DOMContentLoaded", function () {
    const btnRegister = document.getElementById("btnRegister");

    if (btnRegister) {
        btnRegister.addEventListener("click", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const username = document.getElementById("username").value;
            const password1 = document.getElementById("password1").value;
            const password2 = document.getElementById("password2").value;
            const msg = document.getElementById("msg");
            msg.innerHTML = '';

            fetch(backendAddress + "account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password1,
                    password2: password2,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if(data.response === "Usuário registrado com sucesso!"){
                        var token = data.token;
                        localStorage.setItem("token", token);
                        window.location.replace("index.html");
                    } else if (data.email) {
                        msg.innerHTML = data.email;
                    } else if (data.username) {
                        msg.innerHTML = data.username;
                    } else if (data.password) {
                        msg.innerHTML = data.password;
                    } else {
                        throw new Error("Falha no registro");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
});
