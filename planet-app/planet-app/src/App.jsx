import { useState } from 'react'
import './App.css'
import planetsList from './assets/data-planet.json'
import Header from './components/Header'
import Footer from './components/footer'
import PlanetList from './components/planetList'
import PlanetForm from './components/PlanetForm';

function App() {
  let[planets,setPlanets] = useState(planetsList)

  const removePlanet = (id) => {
    const newPlanet = planets.filter(planet=>planet.id!==id)
    setPlanets(newPlanet)
  }
  const rateColor = (id,rating) => {
    const newRating =planets.map(planet=>planet.id!==id?planet:{...planet,rating:rating})
    setPlanets(newRating)
  }
  const addPlanet = (newPlanetData) => {
        // Добавляем уникальный ID к новым данным
        const newPlanetWithId = {
            id: Date.now().toString(),
            ...newPlanetData // Разворачиваем переданные данные (title, color, img_src)
        };
        setPlanets([newPlanetWithId, ...planets]);
    };
    const calculateAverageRating = () => {
        if (planets.length === 0) return 0; // Защита от деления на ноль

        // 1. Используем reduce() для суммирования всех рейтингов
        const totalRating = planets.reduce(
            (accumulator, planet) => accumulator + planet.rating,
            0 // Начальное значение аккумулятора (startValue)
        );

        // 2. Делим общую сумму на количество планет
        const average = totalRating / planets.length;

        // Округляем до двух знаков после запятой
        return average.toFixed(2);
    };
    
    // Вычисляем средний рейтинг
    const averageRating = calculateAverageRating();

  return (
    <div className='container'>
      <Header/>
      <h2>Общий Средний Рейтинг: {averageRating} / 5</h2>
      
      <PlanetList
        planets={planets}
        onRemove={removePlanet}
        onRate={rateColor}
      />
      <PlanetForm onAddPlanet={addPlanet} />
      <Footer/>
    </div>
  )
}

export default App
