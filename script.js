// // Sample data structure: array of book names
// const books = [
//     "The Great Gatsby",
//     "Moby Dick",
//     "War and Peace",
//     "The Catcher in the Rye",
//     "1984",
//     "Pride and Prejudice",
//     "The Great Ash"
// ];

// // Function to search for a book in the array
// function searchBook() {
//     const input = document.getElementById('bookInput').value.trim(); // Get user input
//     const index = books.indexOf(input); // Search for the book in the array

//     // Log the result to the console
//     if (index !== -1) {
//         console.log(`Book found at index: ${index}`);
//     } else {
//         console.log("Not found");
//     }
// }

// // Add event listener to the search button
// document.getElementById('searchButton').addEventListener('click', searchBook);








// ---------- -only console------------
// -0 below is to update ------ in db ---------



// Sample data structure: array of book names
const books = [
    { title: "THRONE OF GLASS", author: "Sarah J Mass", publication: 2018, isbn: "8765", subject: "Literature", copies: 5, shelf: 1, color: "pink" },
    { title: "CATCHING FIRE", author: "Suzanne Collins", publication: 2009, isbn: "1234", subject: "Literature", copies: 4, shelf: 2, color: "red" },
    { title: "THE HOBBIT", author: "J.R.R. Tolkien", publication: 1937, isbn: "5678", subject: "Fantasy", copies: 2, shelf: 3, color: "blue" },
    { title: "1984", author: "George Orwell", publication: 1949, isbn: "9101", subject: "Dystopian", copies: 3, shelf: 5, color: "purple" },
    { title: "TO KILL A MOCKINGBIRD", author: "Harper Lee", publication: 1960, isbn: "1121", subject: "Literature", copies: 6, shelf: 4, color: "yellow" },
    { title: "THE GREAT GATSBY", author: "F. Scott Fitzgerald", publication: 1925, isbn: "3141", subject: "Literature", copies: 2, shelf: 6, color: "green" }
];

const colors = [
    "pink",
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
];
// Display the dropdown menu with book titles
function showDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = ''; // Clear previous entries
    dropdown.style.display = 'block'; // Show the dropdown menu

    // Populate dropdown with book titles
    books.forEach((book, index) => {
        const option = document.createElement('div');
        option.innerHTML = book.title;
        option.className = 'dropdown-item';
        option.onclick = () => selectBook(index); // Display selected book in search bar when clicked
        dropdown.appendChild(option);
    });
}

// Function to put the selected book in the search input
function selectBook(index) {
    const bookInput = document.getElementById('bookInput');
    bookInput.value = books[index].title; // Set the selected book title in the input
    document.getElementById('dropdown').style.display = 'none'; // Hide dropdown
}

// Function to filter books and display information after clicking the search button
function filterBooks() {
    const input = document.getElementById('bookInput').value.toLowerCase();
    const book = books.find(book => book.title.toLowerCase() === input);
    const index = book.shelf // Search for the book in the array
    const ledcolor = book.color;
    if (index!==-1 && book) {
        displayBookInfo(book);
        alert(`Book found on Shelf : ${index} LED Color: ${ledcolor}`);
        console.log(`Book found on Shelf  : ${index} `);
        updateShelfNumber(index); 
    } else {
        console.log("Not found");
        alert("Book not found! Please select a valid book from the dropdown.");
    }
}
// Function to search for a book in the array
/*
        function searchBook() {
    const input = document.getElementById('bookInput').value.trim(); // Get user input
    const index = books.indexOf(input); // Search for the book in the array
    const ledcolor = colors[index];
    // Log the result to the console
    if (index !== -1) {
        alert(`Book found on Shelf : ${index+1} LED Color: ${ledcolor}`);
        console.log(`Book found on Shelf  : ${index+1} `);
        updateShelfNumber(index + 1); // Call function to update shelf number (use index + 1 for shelf number)
    } else {
        alert("Book Not Found")
        console.log("Not found");
    }
}
    */
// Function to display the selected book information
function displayBookInfo(book) {
    const bookInfo = document.getElementById('book-info');
    const shelfInfo = document.getElementById('shelf-info');
    const sectionInfo = document.getElementById('section-info');

    // Populate the book information
    bookInfo.innerHTML = `
        <text class="title">${book.title}</text><br>
        Author: ${book.author}<br>
        Publication: ${book.publication}<br>
        ISBN No.: ${book.isbn}<br>
        Subject: ${book.subject}<br>
        No. of copies available: ${book.copies}<br>
    `;
    shelfInfo.innerHTML = `Shelf no: ${book.shelf}`;

    // Set section color
    sectionInfo.innerHTML = `LED Color`;
    sectionInfo.style.backgroundColor = book.color;
    sectionInfo.style.fontSize = "20px";  
    sectionInfo.style.fontWeight = "bold";  
}

// Function to update the shelf number via PATCH request
async function updateShelfNumber(shelfNumber) {
    try {
        const response = await fetch(`https://get-your-book.vercel.app/books/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shelfNumber }), // Send the new shelf number in the body
        });

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error("Error updating shelf number:", error);m
    }
}

// Hide dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('#bookInput')) {
        document.getElementById('dropdown').style.display = 'none';
    }
};
        
// Add event listener to the search button
//document.getElementById('searchButton').addEventListener('click', searchBook);
