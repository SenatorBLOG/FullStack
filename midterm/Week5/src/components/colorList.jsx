import Color from './color'
const ColorList = ({colors, onRemoveColor=f=>f, onRateColor=f=>f}) => {
    if(colors.length===0) return <h3>There are no colors. Please add one.</h3>
    return ( <>
        <h3>Showing {colors.length} Colors</h3>
        <div className = "colors">
           {/*  {colors.map(color=><Color key={color.id} {...color}/>)} */}
            {colors.map(colorObj=><Color 
            key={colorObj.id} 
            colorObj={colorObj}
            onRemove={onRemoveColor}
            onRateColor = {onRateColor}
           
            />)}
        </div>
        
    </> );
}
 
export default ColorList;