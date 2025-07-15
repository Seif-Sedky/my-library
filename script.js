const myLibrary = [];

function Book(name, author, pages, status) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(name, author, pages, status) {
    let book = new Book(name, author, pages, status);
    myLibrary.push(book);
}

function updateDisplay() {
    let booksWrapper = document.querySelector(".books-wrapper");
    let b = createBookElement(myLibrary[myLibrary.length - 1].name, myLibrary[myLibrary.length - 1].author, myLibrary[myLibrary.length - 1].pages, myLibrary[myLibrary.length - 1].status);
    booksWrapper.appendChild(b);
}

function createBookElement(title, author, totalPages, status) {

    // Create the main book container
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item';

    // Create book title
    const titleP = document.createElement('p');
    titleP.className = 'book-title';
    titleP.textContent = title;

    // Create author
    const authorP = document.createElement('p');
    authorP.className = 'author';
    authorP.textContent = author;

    // Create pages
    const pagesP = document.createElement('p');
    pagesP.className = 'pages';
    pagesP.textContent = `x/${totalPages}`;

    // Create status
    const statusP = document.createElement('p');
    statusP.className = 'status';
    statusP.setAttribute('data-status', status);
    statusP.textContent = status.charAt(0).toUpperCase() + status.slice(1); // Capitalize first letter

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.textContent = 'Remove';

    // Add click event to remove button
    removeBtn.addEventListener('click', function () {
        bookDiv.remove();
    });

    // Append all elements to the book container
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(statusP);
    bookDiv.appendChild(removeBtn);

    return bookDiv;
}

function removeBookFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary.splice(i, 1);
            return;
        }
    }
}

let cancelButton = document.querySelector(".form-cancel");
let addButton = document.querySelector(".form-add");
let overlay = document.querySelector(".overlay");
let popup = document.querySelector(".popup");

const form = document.getElementById('myForm');
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);

    // Get individual values
    let title = formData.get('bookTitle');
    let author = formData.get('authorName');
    let pages = formData.get('pages');
    let status = formData.get('status');

    overlay.classList.remove("active");
    popup.classList.remove("active");
    addBookToLibrary(title, author, pages, status)
    updateDisplay();

});


cancelButton.addEventListener("click", () => {
    overlay.classList.remove("active");
    popup.classList.remove("active");
});


let add = document.querySelector(".add-button");
add.addEventListener("click",()=>{
    overlay.classList.add("active");
    popup.classList.add("active");
});
