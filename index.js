// const express = require("express");
// const mongoose = require("mongoose");
// require('dotenv').config(); 

// // const URL = "mongodb://127.0.0.1:27017/get_your_book";


// // MongoDB connection URL
// // const URL = "mongodb://127.0.0.1:27017/get_book";
// const URL= process.env.MONGODB_URL;
// // const URL= "";



// const app = express();
// const port = 3000;

// // Connect to MongoDB
// const connection = async () => {
//     try {
//         await mongoose.connect(URL);
//         console.log(`Connection Successful with MONGO`);
//     } catch (err) {
//         console.log("Connection Failed with MONGO", err);
//     }
// };

// connection();

// // Define the book schema and model
// const bookSchema = new mongoose.Schema({
//     bookName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     shelfNumber: {
//         type: Number,
//         required: true,
//         min: 1
//     }
// });

// const Book = mongoose.model("Book", bookSchema);



// // Function to add a sample book
// const addSampleBook = async () => {
//     const sampleBook = new Book({
//         bookName: "The Great Gatsby",
//         shelfNumber: 1
//     });

//     try {
//         const existingBooks = await Book.countDocuments();
//         if (existingBooks === 0) {
//             await sampleBook.save();
//             console.log('Sample book added:', sampleBook);
//         } else {
//             console.log('Sample book already exists.');
//         }
//     } catch (error) {
//         console.error('Error adding sample book:', error);
//     }
// };

// // Add sample book on server start
// addSampleBook();






// // Middleware
// app.use(express.json());

// // API endpoint to fetch all books
// app.get("/books", async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.json(books);
//     } catch (error) {
//         res.status(500).send("Error fetching books: " + error.message);
//     }
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });










// ---------------------------------------------------------------------------


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware
require('dotenv').config(); 

const URL = process.env.MONGODB_URL;
// const URL= "";

const app = express();
const port = process.env.PORT || 3000; // Use Vercel's PORT environment variable



// Use CORS middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
const connection = async () => {
    try {
        await mongoose.connect(URL);
        console.log(`Connection Successful with MONGO`);
    } catch (err) {
        console.error("Connection Failed with MONGO", err.message); // Log the error message
        throw new Error("Database connection failed"); // This will trigger the serverless function to fail
    }
};

connection();

// Define the book schema and model
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },
    shelfNumber: {
        type: Number,
        required: true,
        min: 1
    }
});

const Book = mongoose.model("Book", bookSchema);

// Middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Book API! You can access the books at /books.");
});


// API endpoint to fetch all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error.message); // Log the error message
        res.status(500).send("Error fetching books: " + error.message);
    }
});


// PATCH endpoint to update the shelf number for a specific book
app.patch("/books/", async (req, res) => {
    // const { index } = req.params; 
    const { shelfNumber } = req.body; 
    try {
        const book = await Book.findOne(); // Find the single document

        if (!book) {
            return res.status(404).send("Book not found");
        }

        // Update the shelf number
        book.shelfNumber = shelfNumber;
        await book.save(); // Save the updated book

        res.send(`Shelf number updated to: ${shelfNumber}`);
    } catch (error) {
        console.error("Error updating shelf number:", error.message); // Log the error message
        res.status(500).send("Error updating shelf number: " + error.message);
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
