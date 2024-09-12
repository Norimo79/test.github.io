document.addEventListener('DOMContentLoaded', () => {
    loadLibrary();
    loadBorrowedBooks();

    document.getElementById('libraryBtn').addEventListener('click', () => {
        document.getElementById('library').style.display = 'block';
        document.getElementById('readingList').style.display = 'none';
        document.getElementById('borrowedBooks').style.display = 'none';
    });

    document.getElementById('readingListBtn').addEventListener('click', () => {
        document.getElementById('library').style.display = 'none';
        document.getElementById('readingList').style.display = 'block';
        document.getElementById('borrowedBooks').style.display = 'none';
        loadReadingList();
    });

    document.getElementById('borrowedBooksBtn').addEventListener('click', () => {
        document.getElementById('library').style.display = 'none';
        document.getElementById('readingList').style.display = 'none';
        document.getElementById('borrowedBooks').style.display = 'block';
    });

    document.querySelector('.logout-btn').addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});

function loadLibrary() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const tableBody = document.querySelector('#libraryTable tbody');
    tableBody.innerHTML = '';
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${new Date(book.publish_date).toLocaleDateString()}</td>
            <td>${book.book_id}</td>
            <td><a href="${book.pdf_form}" target="_blank">View PDF</a></td>
            <td><button class="actions" onclick="addToReadingList('${book.book_id}')">Add to Reading List</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function loadReadingList() {
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const tableBody = document.querySelector('#readingListTable tbody');
    tableBody.innerHTML = '';
    readingList.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${new Date(book.publish_date).toLocaleDateString()}</td>
            <td>${book.book_id}</td>
            <td><button class="delete-btn" onclick="removeFromReadingList('${book.book_id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function loadBorrowedBooks() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.querySelector('#borrowedBooksTable tbody');
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.gender}</td>
            <td>${student.phone_number}</td>
            <td>${new Date(student.borrow_date).toLocaleDateString()}</td>
            <td>${new Date(student.return_date).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addToReadingList(bookID) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];

    const book = books.find(b => b.book_id === bookID);
    if (book && !readingList.find(b => b.book_id === bookID)) {
        readingList.push(book);
        localStorage.setItem('readingList', JSON.stringify(readingList));
        loadReadingList();
    }
}

function removeFromReadingList(bookID) {
    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    readingList = readingList.filter(book => book.book_id !== bookID);
    localStorage.setItem('readingList', JSON.stringify(readingList));
    loadReadingList();
}
