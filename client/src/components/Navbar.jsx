import '../styles/navbar.css';

export const Navbar = () => {
   return (
      <nav className="navbar">
         <a href="#" className="brand-logo">logo</a>
         <ul id="nav-mobile" className="right hide-on-med-and-down">

            <h4><li><a href="#"> Home</a> </li> </h4>

            <li><a href="#">About Us</a></li>

            <li><a href="#">Customer Support</a></li>

            <li><a href="#">Explore Blogs</a></li>

            <li><a href="#">Live Score</a></li>

            <li><button type="button" id="submit" name="CB" value="submit">Create Blog</button></li>

            <li> <img src="#" alt="S"></img> </li>

         </ul>

      </nav>
   );
}