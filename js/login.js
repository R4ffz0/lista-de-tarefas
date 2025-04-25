document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  if (nome && email) {
    localStorage.setItem('usuario', JSON.stringify({ nome, email }));
    window.location.href = 'todo.html';
  }
});
