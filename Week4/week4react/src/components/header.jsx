import scoreimg from '../assets/scorekeeper.jpg'
const Header = () => {
    const imageURL="https://images.unsplash.com/photo-1740174459726-8c57d8366061?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    return ( <header>
        <h1>Score Keeper App</h1>
        <h2>Track and update scores effortlessly with this simple app.</h2>
        {/* for images placed in public folder */}
        <img src="/scorekeeper2.jpg" alt="score keeper app" width="200" height="150" />

        {/* for images placed in assets */}
        <img src={scoreimg} alt="score keeper app" width="200" height="150" />

        {/* for images hosted on external server */}
        <img src={imageURL} alt="score keeper app" width="200" height="150" />
    </header> );
}
 
export default Header;