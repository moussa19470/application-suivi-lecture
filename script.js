document.addEventListener('DOMContentLoaded', function() {
    const addBookBtn = document.getElementById('addBookBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const addBtn = document.getElementById('addBtn');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const bookList = document.getElementById('bookList');

    addBookBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    addBtn.addEventListener('click', () => {
        const title = titleInput.value;
        const author = authorInput.value;

        if (title.trim() && author.trim()) {
            addBookToLibrary(title, author);
            modal.style.display = 'none';
            titleInput.value = '';
            authorInput.value = '';
        } else {
            alert('Veuillez entrer le titre et l\'auteur du livre.');
        }
    });

    function addBookToLibrary(title, author) {
        const id = Date.now().toString(); // Générer un ID unique
        const book = { id, title, author, read: false };
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }

    function displayBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const table = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Lu</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${books.map(book => `
                        <tr>
                            <td>${book.id}</td>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.read ? 'Oui' : 'Non'}</td>
                            <td>
                                <button class="readBtn">${book.read ? 'Marquer comme non lu' : 'Marquer comme lu'}</button>
                                <button class="deleteBtn">Supprimer</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        bookList.innerHTML = table;
    
        // Ajout des event listeners pour les boutons d'action
        const readBtns = document.querySelectorAll('.readBtn');
        const deleteBtns = document.querySelectorAll('.deleteBtn');
    
        readBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                books[index].read = !books[index].read;
                updateLocalStorage(books);
                displayBooks();
            });
        });
    
        deleteBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                books.splice(index, 1);
                updateLocalStorage(books);
                displayBooks();
            });
        });
    }
    

    function updateLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    displayBooks();
});
