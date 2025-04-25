// Carrega tarefas do LocalStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarTarefas();
});

// Função para adicionar nova tarefa
function adicionarTarefa() {
  const input = document.getElementById("nova-tarefa");
  const texto = input.value.trim();

  if (texto !== "") {
    const tarefas = obterTarefas();
    tarefas.push({ texto: texto, concluida: false });
    salvarTarefas(tarefas);
    input.value = "";
    carregarTarefas();
  }
}

// Carrega as tarefas do LocalStorage na lista
function carregarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";
  const tarefas = obterTarefas();

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.className = "tarefa-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.addEventListener("change", () => {
      tarefa.concluida = checkbox.checked;
      salvarTarefas(tarefas);
      carregarTarefas(); // Atualiza visual
    });

    const span = document.createElement("span");
    span.textContent = tarefa.texto;
    if (tarefa.concluida) {
      span.style.textDecoration = "line-through";
      span.style.color = "#aaa";
    }

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.setAttribute("aria-label", "Excluir tarefa");
    botaoExcluir.addEventListener("click", () => {
      tarefas.splice(index, 1);
      salvarTarefas(tarefas);
      carregarTarefas();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(botaoExcluir);
    lista.appendChild(li);
  });
}

// Salva as tarefas no LocalStorage
function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Recupera as tarefas do LocalStorage
function obterTarefas() {
  const tarefas = localStorage.getItem("tarefas");
  return tarefas ? JSON.parse(tarefas) : [];
}

// Função para voltar à tela de login
function voltarParaLogin() {
  window.location.href = "index.html";
}
