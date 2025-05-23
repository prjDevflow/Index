function loadContentPages(event, urlPage) {
  if (event) {
    event.preventDefault();
  }

  localStorage.setItem("lastPage", urlPage);

  fetch(urlPage)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load content");
      }
      return response.text();
    })
    .then((content) => {
      const main = document.getElementById("mainContent");
      main.innerHTML = content;

      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      const hideLayout = ["login.html", "secretary.html"];

      if (hideLayout.some((page) => urlPage.includes(page))) {
        header.style.display = "none";
        footer.style.display = "none";
      } else {
        header.style.display = "";
        footer.style.display = "";
      }

      // Carrega os scripts necessários
      const scriptsToLoad = [
        "scripts/dialog.js",
        "scripts/accordion.js",
        "scripts/login.js",
        "scripts/btnFiltro.js",
        "scripts/renderAulaSala.js",
        "scripts/renderDisciplinas.js",
      ];

      loadScriptsSequentially(scriptsToLoad, () => {
        // Após carregar os scripts, inicializa os eventos específicos da página
        if (urlPage.includes("dsm.html")) {
          initCursoFilter();
        }
      });
      loadScriptsSequentially(scriptsToLoad, () => {
        // Após carregar os scripts, inicializa os eventos específicos da página
        if (urlPage.includes("rh.html")) {
          initCursoFilter();
        }
      });
      loadScriptsSequentially(scriptsToLoad, () => {
        // Após carregar os scripts, inicializa os eventos específicos da página
        if (urlPage.includes("geo.html")) {
          initCursoFilter();
        }
      });

      // Carrega os estilos CSS necessários
      const cssToLoad = [
        "styles/curso.css",
        "styles/maps.css",
        "styles/btnMaps.css",
        "styles/horarios.css",
        "styles/secretary.css",
      ];

      cssToLoad.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      });
    })
    .catch((error) =>
      console.log("Erro ao carregar o conteúdo da página", error)
    );
}

function loadScriptsSequentially(scripts, callback, index = 0) {
  if (index >= scripts.length) {
    if (callback) callback();
    return;
  }
  const script = document.createElement("script");
  script.src = scripts[index];
  script.onload = () => loadScriptsSequentially(scripts, callback, index + 1);
  document.body.appendChild(script);
}

window.onload = function () {
  const lastPage = localStorage.getItem("lastPage") || "pages/main.html";
  loadContentPages(null, lastPage);
};

function initLoginPage() {
  const form = document.getElementById("loginForm");
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput = document.getElementById("senha");
  const erroGeral = document.getElementById("erroGeral");

  if (!form) return; // previne erro se o form não existir ainda

  toggleSenha.addEventListener("click", () => {
    senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    toggleSenha.classList.toggle("fa-eye-slash");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    erroGeral.textContent = "";

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        erroGeral.textContent = data.erro || "Erro ao fazer login.";
        return;
      }

      // Sucesso no login
      console.log(data.mensagem);
      loadContentPages(null, "pages/secretary.html");
    } catch (error) {
      console.error(error);
      erroGeral.textContent = "Erro na conexão com o servidor.";
    }
  });
  // Dados dos submenus do dropdown "Mapa Interativo"
const mapaItens = [
  { label: "Térreo", url: "pages/mapGround.html" },
  { label: "1º Andar", url: "pages/mapOne.html" },
  { label: "2º Andar", url: "pages/mapTwo.html" },
];

window.addEventListener("DOMContentLoaded", () => {
  const submenuContainer = document.getElementById("mapaSubmenu");

  mapaItens.forEach((item) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = item.label;
    link.onclick = (event) => {
      event.preventDefault();
      loadContentPages(event, item.url);
    };
    submenuContainer.appendChild(link);
  });
});

// Função placeholder para carregar conteúdo
function loadContentPages(event, urlPage) {
  if (event) {
    event.preventDefault();
  }
  // Aqui você coloca sua lógica de carregar conteúdo, por enquanto só um alerta
  alert("Carregando a página: " + urlPage);
  // Substitua isso pelo fetch real do seu projeto
}
function toggleMenu() {
  const dropdown = document.getElementById("hamburgerDropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// Fecha o menu ao clicar fora
window.addEventListener("click", function (event) {
  const dropdown = document.getElementById("hamburgerDropdown");
  const button = document.querySelector(".hamburger-btn");

  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});
}
   // Abre ou fecha o menu hamburguer
   function toggleMenu() {
    const dropdown = document.getElementById("hamburgerDropdown");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  }

  // Abre ou fecha os submenus ao clicar
  function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === "flex" ? "none" : "flex";
  }

  // Fecha o menu quando clicar fora dele
  window.addEventListener("click", function (event) {
    const dropdown = document.getElementById("hamburgerDropdown");
    const button = document.querySelector(".hamburger-btn");

    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

  // Fecha o menu dropdown ao clicar em uma opção
  function closeDropdown() {
    const dropdown = document.getElementById("hamburgerDropdown");
    dropdown.style.display = "none"; // Fecha o menu
  }

  // Adiciona o fechamento do dropdown ao clicar nas opções do menu
  document.querySelectorAll('.hamburger-dropdown a').forEach(item => {
    item.addEventListener('click', closeDropdown);
  });

  // Adiciona o fechamento do submenu ao clicar nas opções do submenu
  document.querySelectorAll('.submenu-items a').forEach(item => {
    item.addEventListener('click', closeDropdown);
  });
