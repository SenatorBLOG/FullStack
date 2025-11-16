import { useLocation } from "react-router-dom";
const Whoops404 = () => {

    // console.log(useLocation());
    const {pathname} = useLocation();
    return ( <div>
        <h1>Page Not Found at {pathname}!</h1>
    </div> );
}

export default Whoops404;