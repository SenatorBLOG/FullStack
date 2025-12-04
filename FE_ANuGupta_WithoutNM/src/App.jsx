import { useState, useEffect } from 'react'
import axios from "axios"
import {Routes,Route,useNavigate} from 'react-router-dom'
import './App.css'
import "./styles.css"
import NavBar from "./components/navBar"
import Header from "./components/header"
import Movies from "./components/movies"
import Footer from "./components/footer"
import AddMovie from './components/addMovie'
import UpdateMovie from './components/updateMovie'

function App() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  //fetching all the movies
  useEffect(()=>{
    const fetchData=async()=>{
      const url = `http://localhost:3000/api/moviesinfo`;
      try{
        const {data} = await axios.get(url);
        //console.log(data);
        setMovies(data);
      }
      catch(err){
        console.log(`ERROR in fetching: ${err.message}`)
      }
    }
    fetchData();
  },[]);

//delete movie

const deleteMovie = async (id)=>{
  console.log("trigegred")
  const url = `http://localhost:3000/api/deletemovie/${id}`; 
  try{
      const {data, status} = await axios.delete(url);
      if(status===200){
        // console.log(`Deleted`);
        const newMovies = movies.filter(movie=>movie._id!==id);
        setMovies(newMovies);
      }
      else{
        console.log(`ERROR in deleting`)
      }

  }
  catch(err){
        console.log(`ERROR in deleting: ${err.message}`)
  }
}

//add new movie

const addMovie=async(newMovieObj)=>{
 const url = `http://localhost:3000/api/addmovie`; 
  try{
      const {data, status} = await axios.post(url, newMovieObj);
      if(status===201){
      const newMovies = [...movies,data]
        setMovies(newMovies);
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


const updateMovie = async()=>{
  
}
  return (<div className="app">
    <NavBar/>
    <Header heading = "My Movie Library"/>
    <Routes>
      <Route path="/" element={<Movies movies={movies} onDelete={deleteMovie}/>}/>
      <Route path="/addmovie" element = {<AddMovie onAdd={addMovie}/>}/>
      <Route path="/updatemovie/:id" element = {<UpdateMovie onUpdate={updateMovie}/>}/>
    </Routes>
    <Footer/>
</div>
  )
}

export default App
