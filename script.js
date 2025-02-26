//GET NECESSARY ELEMENTS FROM D.O.M.
const addBookBtn = document.querySelector("#add-book");
const bookInformation = document.querySelector("#book-info");
const openFormBtn = document.querySelector("#open-form");
const formContainer = document.querySelector(".form-container");
const inputs = document.querySelectorAll("p>input");

openFormBtn.addEventListener('click', event => {
    formContainer.style.display = "flex";
})

//CREATE LIBRARY ARRAY
const myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 293,
        read: true,
    }, {
        title: "Harry Potter and the Filosofer's Stone",
        author: "J.K. Rowling",
        pages: 197,
        read: true,
    }, {
        title: "Fifty Shades of Earl Grey",
        author: "Tom Cruise",
        pages: 1293,
        read: false,
    }, {
        title: "The Bible",
        author: "Jesus H. Christ",
        pages: 1764,
        read: true,
    }
];



//DRAW TABLE AND BOOK LIST, DELETE TABLE AND REDRAW IT

function drawTable() {
    for (i = 0; i < myLibrary.length; i++) {
        const tableRow = document.createElement("tr");
        bookInformation.appendChild(tableRow);
        for (const info in myLibrary[i]) {
            const item = document.createElement('td');
            tableRow.appendChild(item);
            item.textContent = myLibrary[i][info];
            if (myLibrary[i][info] === "") {
                item.textContent = "unknown";
            }
        }
        //CREATE DELETE BUTTON
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "delete-btn";
        deleteBtn.value = i;
        deleteBtn.addEventListener('click', event => {
            deleteBook(deleteBtn.value);
            deleteNRedraw();
        })
        tableRow.appendChild(deleteBtn);
        
    }
}

function deleteNRedraw() {
    const allRows = document.querySelectorAll("tr");
    for (i = 1; i < allRows.length; i++) {
        allRows[i].remove();
    }
    drawTable();
}
deleteNRedraw();

// BOOK CONSTRUCTOR FUNCTION
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };

Book.prototype.readToggle = function() {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
}
  
function addBookToLibrary(title, author,pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    deleteNRedraw();
}

//CREATE FUNCTION FOR DELETING BOOKS
function deleteBook(index) {
    myLibrary.splice(index, 1);
}


//GET INFO FROM INPUT FORM AND CREATE EVENT LISTENER
addBookBtn.addEventListener('click', event => {
    const title = inputs[0].value;
    const author = inputs[1].value;
    const pages = inputs[2].value;
    const read = inputs[3].checked;

    addBookToLibrary(title, author, pages, read);
    //CLEAR INPUTS AFTER ADDING
    for (const input of inputs) {
        input.value = '';
        input.checked = false;
    }
    addBookBtn.disabled = true;
});

//DISABLE ADDBOOK BUTTON WHEN TITLE FIELD IS EMPTY
document.querySelector('body').addEventListener('mouseover', event => {
    addBookBtn.disabled = false;
    if (inputs[0].value === "") {
        addBookBtn.disabled = true;
    }
})
