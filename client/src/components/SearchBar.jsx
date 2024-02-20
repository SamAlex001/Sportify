import "../styles/searchBar.css";
import { MdOutlineClear } from "react-icons/md";
import { useState } from "react";
import { PostPage } from "../pages/PostPage";
import { Navbar } from "./Navbar";

export const SearchBar = () => {

   const [searchFilter, setSearchFilter] = useState('');
   const [searchPostInfo, setSearchPostInfo] = useState([]);
   const [loading, setLoading] = useState(true);

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

   // Clear Filter
   async function clearFliter(e) {
      e.preventDefault();
      await fetch(`http://localhost:4000/posts/searchpost?search=${searchFilter}`, {
         method: 'GET',
         credentials: 'include'
      }).then(res => {
         res.json().then(() => {
            setSearchPostInfo([]);
         });
      });
      setSearchFilter("");
   }

   return (
      <div className="searchBar-container-wrapper">
         <Navbar />
         <form className="searchBar-container">
            <input type="text"
               value={searchFilter}
               onChange={(e) => setSearchFilter(e.target.value)}
            />
            {searchFilter !== "" &&
               <button className="search-btn" onClick={(e) => clearFliter(e)}>
                  <MdOutlineClear />
               </button>
            }
            <button className="search-btn"
               onClick={(e) => searchPost(e)}
            >Search</button>
         </form>
         <PostPage search={searchPostInfo.map(post => post._id)} />
      </div >
   )
}