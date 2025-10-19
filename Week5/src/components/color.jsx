const images = import.meta.glob("../assets/images/*.{jpg,png,svg}", {eager: true});
import StarRating from "./starRating";
import { FaTrash } from "react-icons/fa";

const Color = ({colorObj, onRemove=f=>f, onRateColor=f=>f}) => {
   const {id,title,color,img,rating} = colorObj;

    const imageList= Object.values(images).map((img) => img.default);
    console.log(imageList)
    let source = imageList.find(str=>str.includes(img))
    console.log(source); //relative path of the image wrt assets

    return ( <div className="color">
        <h4>{title}</h4>
        {/* outer {} for JSX and ${} for template literal */}
        {/* If images are in PUBLIC folder */}
        {/* <img src={`/images/${img}`} alt={title} width={100} height={100}/> */}

        {/* If images are in ASSETS folder */}
        <img src={source} alt={title} width={100} height={100}/>

        <div style={{height:"100px", backgroundColor:color}}></div>
        <FaTrash onClick={()=>onRemove(id)}/>
        <br/>
        <StarRating 
        selectedStars = {rating}
        // LHS coming from child
        //RHS sent to parent
        onRateColor={(rating)=>onRateColor(id, rating)}
        
        />
    </div> );
}
 
export default Color;