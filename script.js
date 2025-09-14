document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;

  if (!title || !author || !category || !status) {
    alert("Please fill out the form!");
    return;
  }

  const newBook = {
    title,
    author,
    category,
    status,
  };

  console.log("Book added: ", newBook); //vaqtincha shunaqa

  //Save to localStorage logic
  let books = JSON.parse(localStorage.getItem("books")) || [];
  //   books.push(newBook);

  const editIndex = this.getAttribute("data-edit-index");

  if (editIndex !== null) {
    // Update existing book
    books[editIndex] = newBook;
    this.removeAttribute("data-edit-index");
  } else {
    // Add new book
    books.push(newBook);
  }

  localStorage.setItem("books", JSON.stringify(books));
  this.reset();
  displayBooks();
});

function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.className = `book-card ${
      book.status === "Read" ? "read" : "not-read"
    }`;

    card.innerHTML = `
        <strong>${book.title}</strong><br>
        <em>${book.author}</em><br>
        Category: ${book.category}<br>
        Status: ${book.status}<br>
        <button onclick ="editBook(${index})">✏️ Edit</button>
        <button onclick = "deleteBook(${index})">🗑️ Delete</button>
        <button onclick = "toggleStatus(${index})">🔁 Toggle Status</button>
    `;

    bookList.appendChild(card);
  });
}

function editBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books[index];

  //   Prefill the form fields
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
  document.getElementById("status").value = book.status;

  // Temporarily store the index we're editing
  document.getElementById("book-form").setAttribute("data-edit-index", index);
}

function deleteBook(index) {
  const confirmDelete = confirm("Are you sure you want to delete this Book?");

  if (!confirmDelete) return;

  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1); // Remove one book at given time
  localStorage.setItem("books", JSON.stringify(books));
  displayBooks(); // Refresh the list
}

function toggleStatus(index) {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  books[index].status = books[index].status === "Read" ? "Not Read" : "Read";
  localStorage.setItem("books", JSON.stringify(books));

  displayBooks();
}

// Call this once on page load
window.onload = function () {
  displayBooks();
};
