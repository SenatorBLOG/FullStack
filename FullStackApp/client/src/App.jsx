import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/header";
import NavBar from "./components/navBar";
import Books from "./components/books";
import AddBook from "./components/addBook";
import UpdateBook from "./components/updateBook";
import Footer from "./components/footer";

function App() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3000/api/booksinfo`;
      try {
        const response = await axios.get(url);
        //console.log(response.data);
        setBooks(response.data);
      } catch (err) {
        console.log(`ERROR in fetching: ${err.message}`);
      }
    };
    fetchData();
  }, []); // empty dependency array --> run only once when the component mounts

  //Delete the book from the database
  const handleDelete = async (bookToDelete_id) => {
    console.log("Delete handled");
    const url = `http://localhost:3000/api/deletebook/${bookToDelete_id}`;
    try {
      const { data, status } = await axios.delete(url);
      if (status == 200) {
        const newBooks = books.filter((book) => book._id !== bookToDelete_id);
        setBooks(newBooks);
      } else {
        console.log("Error in deleting the book");
      }
    } catch (err) {
      console.log(`ERROR in deleting ${err}`);
    }
  };

  //Adding a new book to the database
  const addBook = async (book) => {
    const url = `http://localhost:3000/api/addbook`;

    try {
      const { data } = await axios.post(url, book);
      if (typeof data === "object") {
        const newBook = data;
        console.log(newBook);
        setBooks([...books, newBook]);
      } else {
        console.log("Error in adding the book");
      }
    } catch (err) {
      console.log(`ERROR in adding ${err}`);
    }
    navigate("/");
  };

  //Updating an existing book in the database
  const handleUpdate = async (updatedBook) => {
    const url = `http://localhost:3000/api/updatebook/${updatedBook._id}`;

    try {
      const { data, status } = await axios.put(url, updatedBook);
      if (status == 200) {
        const index = books.findIndex((book) => book._id == updatedBook._id);
        const updatedBooks = [...books];
        updatedBooks[index] = data;
        setBooks(updatedBooks);
      } else {
        console.log("Error in updating the book");
      }
    } catch (err) {
      console.log(`ERROR in updaing ${err}`);
    }
    navigate("/");
  };

  return (
    <div className="app">
      <NavBar/>
      <Header/>
      <Routes>
        <Route path ="/" element={<Books books = {books}/>}/>
        </Routes> 
    </div>
  );
}
export default App;
