document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput = document.getElementById("senha");

  // Mostrar/ocultar senha
  toggleSenha.addEventListener("click", () => {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    toggleSenha.classList.toggle("fa-eye-slash");
  });

  // Validação do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Verifica se os campos estão vazios
    if (!usuario || !senha) {
      return;
    }

    // Validação do e-mail e senha
    if (usuario === "pedro@gmail.com" && senha === "1234") {
      console.log("Deu Certo");
    } else {
      console.log("Deu Ruim");
    }
  });
});

