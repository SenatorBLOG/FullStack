import './App.css'
import Greeting from './components/greeting'
import Header from './components/header'
import Footer from './components/footer'
import Player from './components/player'

function App() {
/*   const element = <h1>Hello World!!</h1>;
  console.log(element)
  return <>{element}<h2>We are learning React</h2></> */
  // props
  // return <Greeting name="Anu" course="3380" />

  const players=["Player 1","Player 2","Player 3","Player 4","Player 5"]
  return <>
    <Header/>
   {/*  <Player title="Player 1"/>
    <Player title="Player 2"/>
    <Player title="Player 3"/>
    <Player title="Player 4"/>
    <Player title="Player 5"/> */}

    {players.length===0?<h2>No Players</h2>:

  players.map((player,index)=><Player key = {index} title={player}/>)}

    <Footer/>
  </>

}

export default App
