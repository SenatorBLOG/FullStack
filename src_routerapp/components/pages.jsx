import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import queryString from 'query-string'
export const Home = () => {
  return (
    <div>
      <h1>Shopping App</h1>
    </div>
  );
};
export const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Outlet/>
    </div>
  );
};
export const History = ()=>{
  return(<section>
      <h2>Our History</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus vel, vero dolorem exercitationem, placeat, iure amet iste laboriosam explicabo officiis est? Doloribus, praesentium architecto esse repellat ullam sint officiis temporibus.</p>
  </section>)
}
export const Services = ()=>{
  return(<section>
      <h2>Our Services</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus vel, vero dolorem exercitationem, placeat, iure amet iste laboriosam explicabo officiis est? Doloribus, praesentium architecto esse repellat ullam sint officiis temporibus.</p>
  </section>)
}
export const Location = ()=>{
  return(<section>
      <h2>Our Location</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus vel, vero dolorem exercitationem, placeat, iure amet iste laboriosam explicabo officiis est? Doloribus, praesentium architecto esse repellat ullam sint officiis temporibus.</p>
  </section>)
}

export const Events = () => {
  return (
    <div>
      <h1>Events</h1>
    </div>
  );
};
export const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <ul className="nav">
        <li className="nav-item"><Link className="nav-link" to="/products/1">Product 1</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/products/2">Product 2</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/products/3">Product 3</Link></li>
    
      </ul>
    </div>
  );
};
export const ProductDetails = () => {
  const products = [
    { id: 1, name: "Laptop", desc: "About Laptops..." },
    { id: 2, name: "Notepad", desc: "About Notepads..." },
    { id: 3, name: "Smart Phone", desc: "About Smart Phones..." },
  ];
  let { id } = useParams();
  id = parseInt(id);
  console.log(useParams());
  const product = products.find((prod) => prod.id == id);
  console.log(product);
  return (
    <>
      <h2>Product Details</h2>
      <p>Name: {product.name}</p>
      <p>Description: {product.desc}</p>
    </>
  );
};
export const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
};

export const EventDetails = ()=>{
  // const {year,month}= useParams()

  const searchString = useLocation().search;
  console.log(useLocation())
  console.log(searchString)
  console.log(queryString.parse(searchString))
  return<div>
    {/* <h6>Event Details for the year {year} and the month {month}</h6> */}
  </div>
}
