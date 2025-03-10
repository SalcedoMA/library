//GET NECESSARY ELEMENTS FROM D.O.M.
class DOMElements {
    static bookTable = document.querySelector("#book-info");
    static addBookButton = document.querySelector("#add-book");
    static openFormButton = document.querySelector("#open-form");
    static formContainer = document.querySelector(".form-container");
    static inputs = document.querySelectorAll("p>input");
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    readToggle() {
        if (this.read === true) {
            this.read = false;
            console.log(this.read, this.title);
        } else {
            this.read = true;
            console.log(this.read, this.title);
        }
    }
}

class MyLibrary {
    static books = []; // Static property to store all books

    static addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        MyLibrary.books.push(newBook);
        console.log(`Added book: ${newBook.title}`);
    }

    static removeBook(title) {
        MyLibrary.books = MyLibrary.books.filter(book => book.title !== title);
        console.log(`Removed book: ${title}`);
    }

    static listBooks() {
        console.log("Books in the library:");
        MyLibrary.books.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });
    }

}

class NewBookForm {
    static openForm = () => {
        DOMElements.openFormButton.addEventListener('click', event => {
            DOMElements.formContainer.style.display = "flex";
        })
    }

    //GET INFO FROM INPUT FORM AND CREATE EVENT LISTENER

    static addBook = () => {
        DOMElements.addBookButton.addEventListener('click', event => {
            const title = DOMElements.inputs[0].value;
            const author = DOMElements.inputs[1].value;
            const pages = DOMElements.inputs[2].value;
            const read = DOMElements.inputs[3].checked;

            MyLibrary.addBook(title, author, pages, read);
            Display.render();
            //CLEAR INPUTS AFTER ADDING
            for (const input of DOMElements.inputs) {
                input.value = '';
                input.checked = false;
            }
            DOMElements.addBookButton.disabled = true;
            });

        document.querySelector('body').addEventListener('mouseover', event => {
            DOMElements.addBookButton.disabled = false;
            if (DOMElements.inputs[0].value === "") {
                DOMElements.addBookButton.disabled = true;
            }
        })
    }  
}

const Display = (function() {

    const createButton = (buttonType, onClickHandler, data) => { //onClickHandler is just a custom funciton made by me (AI but shhh) to handle the function later
        return function(tableRow) {
            const tableCell = document.createElement('td');
            tableRow.appendChild(tableCell);
    
            const button = document.createElement('button');
            tableCell.appendChild(button);
            button.className = "table-button";
            button.textContent = buttonType;
    
            // Pass the `data` to the event handler
            button.addEventListener('click', (event) => onClickHandler(event, data));
        };
    };
    
    // Create specific button instances using the factory function
    const createToggleButton = (book) => {
        return createButton("Toggle", (event, book) => {
            book.readToggle(); 
            event.target.parentElement.previousElementSibling.textContent = book.read;
        }, book);
    };
    
    const createDeleteButton = (index) => {
        return createButton("Delete", (event, index) => {
            MyLibrary.books.splice(index, 1); 
            event.target.closest('tr').remove();
            console.log(MyLibrary.books);
        }, index);
    };

    const render = function() {
        NewBookForm.openForm();
        NewBookForm.addBook();
        DOMElements.bookTable.innerHTML = "";
        MyLibrary.books.forEach((book, index) => {
            const tableRow = document.createElement("tr");
            DOMElements.bookTable.appendChild(tableRow);
            for (const info in book) {
               // if (typeof book[info] !== 'function') {
                    const infoCell = document.createElement('td');
                    tableRow.appendChild(infoCell);
                    infoCell.textContent = book[info];
                    if (info === "") {
                        infoCell.textContent = "unknown";
                    }
              //  }
            }
            createToggleButton(book)(tableRow);
            createDeleteButton(index)(tableRow);
        })
    }
    return {render};
})()







// Usage

MyLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 293, true);
MyLibrary.addBook("1984", "George Orwell", 328, false);
MyLibrary.listBooks();

console.log(MyLibrary.books)
Display.render();