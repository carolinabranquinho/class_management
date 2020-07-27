const formDelete = document.querySelector(".form_delete");
formDelete.addEventListener("submit", (e) => {
  const confirmation = confirm("Deseja Deletar?");

  if (!confirmation) {
    e.preventDefault();
  }
});
