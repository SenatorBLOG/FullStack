import { useState,useEffect } from 'react'
import axios from "axios"
import './App.css'
import "./styles.css"
import { useNavigate, Routes, Route } from "react-router-dom";

import Books from "./components/books";
import NavBar from './components/navbar';
import Footer from './components/footer';
import Header from './components/header';
import AddBook from './components/addBook';
import UpdateBook from './components/updateBook';

function App() {
  const [books, setBooks] = useState([])
  const navigate = useNavigate();

  // Handle GET - fetching all books
  useEffect(()=>{
    const fetchData= async()=>{
      const url = `http://localhost:3000/api/booksinfo`
      try{
        const {data} = await axios.get(url);
        setBooks(data);
      }catch(err){
        console.log(`Error to fetch data: ${err.message}`)
      }
    }
    fetchData();
   },[])

   // DELETE
  const deleteBook = async (id)=>{
    console.log("trigegred")
    const url = `http://localhost:3000/api/deletebook/${id}`; 
    try{
        const {data, status} = await axios.delete(url);
        if(status===200){
          // console.log(`Deleted`);
          const newBooks = books.filter(book=>book._id!==id);
          setBooks(newBooks);
        }
        else{
          console.log(`ERROR in deleting`)
        }

    }
    catch(err){
          console.log(`ERROR in deleting: ${err.message}`)
    }
  }

  //ADD
  //add new book
  
  const addBook=async(newBookObj)=>{
   const url = `http://localhost:3000/api/addbook`; 
    try{
        const {data, status} = await axios.post(url, newBookObj);
        if(status===201){
        const newBooks = [...books,data]
          setBooks(newBooks);
        }
        else{
          console.log(`ERROR in adding`)
        }
        navigate("/")
    }
    catch(err){
          console.log(`ERROR in adding: ${err.message}`)
    }
  }
  // UPDATE
    const updateBook = async (updatedBook) => {
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
    <div className='main'>
      <NavBar/>
      <Header title='This is a small book library'/>
      <Routes>
        <Route path="/" element={<Books books={books} onDelete={deleteBook}/>} />
        <Route path="/addBook" element={<AddBook onAdd={addBook} />} />
        <Route path="/updateBook/:id" element={<UpdateBook onUpdate={updateBook} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
