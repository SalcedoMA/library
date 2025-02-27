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
];




//DRAW TABLE AND BOOK LIST, DELETE TABLE AND REDRAW IT

function drawTable() {
    for (i = 0; i < myLibrary.length; i++) {
        const currentBook = myLibrary[i];
        const tableRow = document.createElement("tr");
        bookInformation.appendChild(tableRow);
        for (const info in currentBook) {
            if (typeof currentBook[info] !== 'function') {
                const item = document.createElement('td');
                tableRow.appendChild(item);
                item.textContent = currentBook[info];
                if (currentBook[info] === "") {
                    item.textContent = "unknown";
                }
            }
        }
        //CREATE READ TOGGLE BUTTONS
        const cellOne = document.createElement('td')
        tableRow.appendChild(cellOne);
        const toggle = document.createElement('button');
        toggle.className = "table-button";
        toggle.addEventListener('click', event => {
            currentBook.readToggle();
        });
        cellOne.appendChild(toggle);

        //CREATE DELETE BUTTON
        const cellTwo = document.createElement('td');
        tableRow.appendChild(cellTwo);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "table-btn";
        deleteBtn.value = i;
        deleteBtn.addEventListener('click', event => {
            deleteBook(deleteBtn.value);
            deleteNRedraw();
        })
        cellTwo.appendChild(deleteBtn);
        
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
    //READ TOGGLE FUNCTION
Book.prototype.readToggle = function() {
    if (this.read === true) {
        this.read = false;
        deleteNRedraw();
    } else {
        this.read = true;
        deleteNRedraw();
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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 293, true);
addBookToLibrary("Harry Potter and the Filosofer's Stone", "J.K. Rowling", 197, true);
addBookToLibrary("Fifty Shades of Earl Grey", "Tom Cruise", 564, false);
addBookToLibrary("The Bible", "Jesus H. Christ", 1392, false);