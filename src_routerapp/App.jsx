import './App.css'
import {Home,About,Events,Products,ProductDetails,Contact,History,Services,Location, EventDetails} from './components/pages'
// import NavBar from './components/navBarSimple'
import NavBar from './components/navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import Whoops404 from './components/whoops404'

function App() {


  return (
   <div className='app'>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* Nested Routing */}
        <Route path="/about" element={<About/>}>
            <Route path="history" element={<History/>}/>
            <Route path="services" element={<Services/>}/>
            <Route path="locations" element={<Location/>}/>
        </Route>
        {/* <Route path="/events/:year?/:month?" element={<EventDetails/>}/> */}
        <Route path="/events" element={<EventDetails/>}/>
        {/* Multiple Route/URL parameters */}

        <Route path="/products" element={<Products/>}/>
        {/* Route/URL Parameters */}
        <Route path="/products/:id" element={<ProductDetails/>}/>

        <Route path="/contact" element={<Contact/>}/>
        {/* Page not found */}
        <Route path="*" element={<Whoops404/>}/>
        {/* Redirecting */}
        <Route path="/services" element={<Navigate to="/about/services"/>}/>
      </Routes>
   </div>
  )
}

export default App
