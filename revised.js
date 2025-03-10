// DOM Elements
const DOMElements = {
    bookTable: document.querySelector("#book-info"),
    addBookButton: document.querySelector("#add-book"),
    openFormButton: document.querySelector("#open-form"),
    formContainer: document.querySelector(".form-container"),
    inputs: document.querySelectorAll("p>input")
};

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    readToggle() {
        this.read = !this.read;
        console.log(`Toggled read status for ${this.title}: ${this.read}`);
    }
}

// MyLibrary Class
class MyLibrary {
    static books = [];

    static addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        MyLibrary.books.push(newBook);
        console.log(`Added book: ${newBook.title}`);
    }

    static removeBook(index) {
        const removedBook = MyLibrary.books.splice(index, 1)[0];
        console.log(`Removed book: ${removedBook.title}`);
    }

    static listBooks() {
        console.log("Books in the library:");
        MyLibrary.books.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });
    }
}

// NewBookForm Module
const NewBookForm = (() => {
    const openForm = () => {
        DOMElements.openFormButton.addEventListener('click', () => {
            DOMElements.formContainer.style.display = "flex";
        });
    };

    const addBook = () => {
        DOMElements.addBookButton.addEventListener('click', () => {
            const title = DOMElements.inputs[0].value;
            const author = DOMElements.inputs[1].value;
            const pages = DOMElements.inputs[2].value;
            const read = DOMElements.inputs[3].checked;

            if (title && author && pages) {
                MyLibrary.addBook(title, author, pages, read);
                Display.render();
                // Clear inputs after adding
                DOMElements.inputs.forEach(input => {
                    input.value = '';
                    input.checked = false;
                });
                DOMElements.addBookButton.disabled = true;
            } else {
                console.error("Please fill out all fields.");
            }
        });

        document.querySelector('body').addEventListener('mouseover', () => {
            DOMElements.addBookButton.disabled = DOMElements.inputs[0].value === "";
        });
    };

    return { openForm, addBook };
})();

// Button Utility Module
const ButtonUtils = (() => {
    const createButton = (buttonType, onClickHandler, data) => {
        return (tableRow) => {
            const tableCell = document.createElement('td');
            tableRow.appendChild(tableCell);

            const button = document.createElement('button');
            tableCell.appendChild(button);
            button.className = "table-button";
            button.textContent = buttonType;

            button.addEventListener('click', (event) => onClickHandler(event, data));
        };
    };

    return { createButton };
})();

// Display Module
const Display = (() => {
    const createToggleButton = (book) => {
        return ButtonUtils.createButton("Toggle", (event, book) => {
            book.readToggle();
            event.target.closest('tr').querySelector('.read-status').textContent = book.read;
        }, book);
    };

    const createDeleteButton = (index) => {
        return ButtonUtils.createButton("Delete", (event, index) => {
            MyLibrary.removeBook(index);
            event.target.closest('tr').remove();
        }, index);
    };

    const render = () => {
        DOMElements.bookTable.innerHTML = "";
        MyLibrary.books.forEach((book, index) => {
            const tableRow = document.createElement("tr");
            DOMElements.bookTable.appendChild(tableRow);

            for (const [key, value] of Object.entries(book)) {
                const infoCell = document.createElement('td');
                tableRow.appendChild(infoCell);
                infoCell.textContent = value === "" ? "unknown" : value;
                if (key === "read") {
                    infoCell.classList.add("read-status");
                }
            }

            createToggleButton(book)(tableRow);
            createDeleteButton(index)(tableRow);
        });
    };

    return { render };
})();

// Initialization
MyLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 293, true);
MyLibrary.addBook("1984", "George Orwell", 328, false);
MyLibrary.listBooks();

NewBookForm.openForm();
NewBookForm.addBook();
Display.render();