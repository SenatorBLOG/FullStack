import { FaTrash } from "react-icons/fa";
import StarRating from "./starRating";
const images = import.meta.glob("../assets/images/*.{jpg,png,svg}", {eager: true});
const Planet = ({planet, onRemove=f=>f,onRate=f=>f}) => {
    const {id, title,color,rating,img} = planet

    let source = '';

    // 1. ПРОВЕРКА 1: Если 'img' начинается с 'blob:', это временный URL из формы. Используем его напрямую.
    if (img.startsWith('blob:')) {
        source = img; 
    } else {
        // 2. ПРОВЕРКА 2: Иначе ищем среди статических изображений.
        const imageList = Object.values(images).map((im) => im.default);
        // Мы ищем только по имени файла, как раньше.
        source = imageList.find(str => str.includes(img));
    }
    

    return ( <div className="planet">
        <h4>{title}</h4>
        <img src={source} alt={title} width={100} height={100}/><br/>
        <div style={{height:"100px", backgroundColor:color}}></div>
        <FaTrash onClick={()=>onRemove(id)}/><br/>
        <StarRating 
        selectedStars={rating}
        onRate={(rating)=>onRate(id,rating)}/>
    </div> );
}
 
export default Planet;