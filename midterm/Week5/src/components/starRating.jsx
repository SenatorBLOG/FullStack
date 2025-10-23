import Star from "./star";
const StarRating = ({totalStars=5,selectedStars, onRateColor=f=>f}) => {
    return ( <>
        {[...Array(totalStars)].map((el,index)=><Star
         key={index} 
        selected={index<selectedStars}
        onRate={()=>onRateColor(index+1)}
        />)}
    </> );
}
 
export default StarRating;