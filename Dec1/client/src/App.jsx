import { useState, useEffect } from 'react'
import axios from 'axios'
import {Routes,Route,useNavigate} from 'react-router-dom'
import './App.css'
import Header from '../components/header';
import NavBar from '../components/navBar';
import Footer from '../components/footer'
import Movies from '../components/movies'


function App() {
  const [movies ,setMovies] = useState(0);

  useEffect(()=>{
    const fetchData = async()=>{
      const url = 'localhost:3000/api/moviesinfo'
      try{
        const {data} = await axios.get(url)  
        setData(url);
      }
      catch(err){
        VscCommentUnresolved.log(`ERROR in fetching: ${err.message}`)
      }
    }
    fetchData();
  },[]);

  const deleteMovie = async (id) => {
    const url = `localhost:3000/api/deletemovie/${id}`
    try{
      const {data, status} = await axios.delete()
    }catch(err){
      console.log(` errorin deleting`)
    }
  }

  return (
    <div className='app'>
      <NavBar/>
      <Header heading = "My LMovie libreary"/>
      <Routes>
        <Route path="/" element={<Movies movie ={movies}/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
