const add = document.querySelector(".btn-add");
const form = document.querySelector(".modal-form");
const modal = document.querySelector(".modal");
const formadd = document.querySelector(".modal-btn");
const cards = document.querySelector(".cards");

const books = [];

add.addEventListener("click", () => {
  modal.classList.toggle("hidden");
  document.querySelector('.cards').classList.toggle('hidden');
  add.textContent = add.textContent === "+" ? "-" : "+";
  clearForm();
});

formadd.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const book = {
    name,
    author,
    pages,
    read,
  };

  books.push(book);
  console.log(books);
  updateCards();
  clearForm();
});

function updateCards() {
  cards.innerHTML = "";
  books.forEach((book, index) => {
    const cardhtml = `<div class="card">
      <h1>${book.name}</h1>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
    </div>`;

    cards.innerHTML += cardhtml;
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
}

updateCards();
