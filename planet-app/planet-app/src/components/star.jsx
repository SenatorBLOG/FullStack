import { FaStar } from "react-icons/fa";
const Star = ({selected=false, onRate=f=>f}) => {
    return (<FaStar color={selected?"blue":"grey"} onClick={onRate}/>  );
}
 
export default Star;