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
    "THRONE OF GLASS",
    "CATCHING FIRE",
    "THE HOBBIT",
    "TO KILL A MOCKINGBIRD",
    "1984",
    "THE GREAT GATSBY",
];
const colors = [
    "pink",
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
];
// Function to search for a book in the array
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

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', searchBook);
