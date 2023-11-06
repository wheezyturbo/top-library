class Book {
  constructor(name = "Untitled", author = "Unknown", pages = 0, read = false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  static books = [];
  static add(book){
    this.books.push(book);
  }
}


const DisplayController = (()=>{
  const add = document.querySelector(".btn-add");
  const modal = document.querySelector(".modal");
  const formadd = document.querySelector(".modal-btn");
  const cards = document.querySelector(".cards");
  
  
  
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
  
    Library.add(new Book(name, author, pages, read));
    updateCards();
    clearForm();
  });
  
  function updateCards() {
    cards.innerHTML = "";
    Library.books.forEach((book, index) => {
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
        Library.books.splice(index, 1);
        updateCards();
      });
    });
    readBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        console.log(Library.books[index].read);
        Library.books[index].read = !Library.books[index].read;
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
})()



