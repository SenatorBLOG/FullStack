import Planet from "./planet";
const PlanetList = ({planets,onRemove=f=>f,onRate=f=>f}) => {
    return ( <div className="planetsList">
        <h3>You have added {planets.length} planets to your system</h3>
        {planets.map(planet=> <Planet
            key={planet.id}
            planet={planet}
            onRemove={onRemove}
            onRate={onRate}
            />
        )}
        

    </div> );
}
 
export default PlanetList;