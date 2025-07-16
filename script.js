const myLibrary = [];

function Book(id, name, author, pages, status) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(id, name, author, pages, status) {
    let book = new Book(id, name, author, pages, status);
    myLibrary.push(book);
}

function updateDisplay() {
    if (myLibrary.length === 0) return; // Guard clause

    let booksWrapper = document.querySelector(".books-wrapper");
    let b = createBookElement(myLibrary[myLibrary.length - 1].id, myLibrary[myLibrary.length - 1].name, myLibrary[myLibrary.length - 1].author, myLibrary[myLibrary.length - 1].pages, myLibrary[myLibrary.length - 1].status);
    booksWrapper.appendChild(b);
}

function createBookElement(id, title, author, totalPages, status) {



    // Create the main book container
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item';


    // Link book to backend using ID
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'bookId';
    hiddenInput.value = id;

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

    // Append all elements to the book container
    bookDiv.appendChild(hiddenInput);
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(statusP);
    bookDiv.appendChild(removeBtn);

    return bookDiv;
}

function removeBookFromLibraryArray(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary.splice(i, 1);
            return;
        }
    }
}

function toggleBookStatusFromLibraryArray(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == id) {
            myLibrary[i].status = myLibrary[i].status === "read" ? "to-read" : "read";
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
    e.preventDefault(); // Prevent default form submission to server
    const formData = new FormData(form);

    // Get individual values
    let title = formData.get('bookTitle');
    let author = formData.get('authorName');
    let pages = formData.get('pages');
    let status = formData.get('status');
    let id = crypto.randomUUID();

    overlay.classList.remove("active");
    popup.classList.remove("active");
    addBookToLibrary(id, title, author, pages, status)
    updateDisplay();

    form.reset();
});


cancelButton.addEventListener("click", () => {
    overlay.classList.remove("active");
    popup.classList.remove("active");
});


let add = document.querySelector(".add-button");
add.addEventListener("click", () => {
    overlay.classList.add("active");
    popup.classList.add("active");
});

let booksWrapper = document.querySelector(".books-wrapper");
// Add click event to remove button
booksWrapper.addEventListener('click', function (e) {
    if ((e.target.classList.contains('remove'))) {
        let book = e.target.parentElement;
        let id = book.querySelector('input[name="bookId"]').value;
        removeBookFromLibraryArray(id);
        book.remove();
    }
    if ((e.target.classList.contains('status'))) {
        let book = e.target.parentElement;
        let id = book.querySelector('input[name="bookId"]').value;
        toggleBookStatusFromLibraryArray(id);
        if (e.target.getAttribute("data-status") === "read") {
            e.target.setAttribute("data-status", 'to-read');
            e.target.textContent="TO-READ"
        }
        else {
            e.target.setAttribute("data-status", 'read');
            e.target.textContent="READ"
        }
    }
});
