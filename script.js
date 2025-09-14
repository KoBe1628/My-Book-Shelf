let isEditing = false;
let editingIndex = null;

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

  // Reset form labels after editing
  document.getElementById("submitBtn").textContent = "Add Book";
  document.getElementById("formTitle").textContent = "My Bookshelf";

  isEditing = false;
  editingIndex = null;
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

function filterBooksByCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  const books = JSON.parse(localStorage.getItem("books")) || [];

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  filteredBooks.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = `book-card ${
      book.status === "Read" ? "read" : "not-read"
    }`;
    card.innerHTML = `
      <strong>${book.title}</strong><br>
      <em>${book.author}</em><br>
      Category: ${book.category}<br>
      Status: ${book.status}<br><br>
      <button onclick="editBook(${index})">✏️ Edit</button>
      <button onclick="deleteBook(${index})">🗑️ Delete</button>
      <button onclick="toggleStatus(${index})">🔁 Toggle Status</button>
    `;
    container.appendChild(card);
  });
}

function editBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books[index];

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
  document.getElementById("status").value = book.status;

  document.getElementById("book-form").setAttribute("data-edit-index", index);

  document.getElementById("submitBtn").textContent = "Update Book";
  document.getElementById("formTitle").textContent = "Edit Book";
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
