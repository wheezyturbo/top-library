const add = document.querySelector(".btn-add");
const form = document.querySelector(".modal-form");
const modal = document.querySelector(".modal");
const formadd = document.querySelector(".modal-btn");
const cards = document.querySelector(".cards");

const books = [];

function book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new book(title, author, pages, read);
  books.push(newBook);
}

add.addEventListener("click", () => {
  modal.classList.toggle("hidden");
  document.querySelector(".cards").classList.toggle("hidden");
  document.querySelector(".container").classList.toggle("blur");
  add.textContent = add.textContent === "+" ? "-" : "+";
  clearForm();
});

formadd.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const nameInput = document.getElementById("name");
  if (!name) {
    nameInput.placeholder = "Name is required!";
    return;
  }
  nameInput.placeholder = "";

  addBookToLibrary(name, author, pages, read);
  updateCards();
  clearForm();
});

function updateCards() {
  cards.innerHTML = "";
  books.forEach((book, index) => {
    const cardhtml = `<div class="card">
        <h1 class="card-header">${book.name}</h1>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
        <div class="card-btn">
        <button data-index="${index}" class="remove-button">Remove</button>
        <button data-index="${index}" class="toggle-read-button">Toggle Read Status</button>\
        </div>
      </div>`;

    cards.innerHTML += cardhtml;
  });
  const removeBtns = document.querySelectorAll(".remove-button");
  const readBtns = document.querySelectorAll(".toggle-read-button");
  removeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      books.splice(index, 1);
      updateCards();
    });
  });
  readBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      console.log(books[index].read);
      books[index].read = !books[index].read;
      updateCards();
    });
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
}

updateCards();
