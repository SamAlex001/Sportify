import "../styles/searchBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostPage } from "../pages/PostPage";

export const SearchBar = () => {

   const [searchFilter, setSearchFilter] = useState('');
   const [searchPostInfo, setSearchPostInfo] = useState([]);
   const navigate = useNavigate();

   async function searchPost(e) {
      e.preventDefault();
      await fetch(`http://localhost:4000/posts/searchpost?search=${searchFilter}`, {
         method: 'GET',
         credentials: 'include'
      }).then(res => {
         res.json().then(searchpost => {
            setSearchPostInfo(searchpost)
         });
      });
   }

   return (
      <div className="container">
         <form className="searchBar-container">
            <input type="text"
               value={searchFilter}
               onChange={(e) => setSearchFilter(e.target.value)}
            />
            <button className="search-btn"
               onClick={(e) => searchPost(e)}
            >Search</button>
         </form>
         <PostPage search={searchPostInfo.map(post => post._id)} />
      </div >
   )
}