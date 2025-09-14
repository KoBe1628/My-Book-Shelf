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

  //   nima

  this.reset();
});
