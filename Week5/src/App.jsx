import { useState } from 'react'
import './App.css'
import colorList from './assets/color-data.json'
import Header from './components/header';
import Footer from './components/footer';
import ColorList from './components/colorList';
function App() {
  //  console.log(colorList);
  let [colors, setColors] = useState(colorList);
  //define removeColor
  const removeColor = (id)=>{
      const newColors = colors.filter(color=>color.id!==id);
      setColors(newColors);
  }
  //define rateColor
  const rateColor=(id,rating)=>{
    const updatedColors = colors.map(color=>color.id!==id?color:{...color,rating:rating});
    setColors(updatedColors);
  }

  return (
    <>
      <Header heading="This is my Color List"/>
      <ColorList colors={colors} 
      onRemoveColor={removeColor} 
       onRateColor = {rateColor}
      />
      <Footer/>
    </>
  )
}

export default App
