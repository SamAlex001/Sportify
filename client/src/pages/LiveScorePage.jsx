import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/liveScore.css";
import { Navbar } from "../components/Navbar";
import { LiveScore } from "../components/LiveScore";
import { Loader } from "../components/Loaders";
import { FooterDark } from "../components/Footer";

export const LiveScorePage = () => {

   const navigate = useNavigate();
   const [liveScore, setLiveScore] = useState([]);
   const [loading, setLoading] = useState(true);

   async function getLiveScore() {
      try {
         const response = await fetch("http://localhost:4000/livescore/cricket", {
            method: "GET",
            credentials: "include"
         })

         const score = await response.json();
         const data = score.data;
         setLiveScore(data);
         setLoading(!loading);
      }
      catch (error) {
         console.log("Error Loading Match Data: ", error);
         setLoading(loading);
      };
   }

   useEffect(() => {
      getLiveScore();
   }, []);

   return (
      <div className="livescorepage-container">
         <Navbar />
         <div className="livescore-header">Current Live Scores</div>
         <div>
            {loading ? <Loader /> : <LiveScore />}
         </div>
         <div className="livescore-footer">
            <FooterDark />
         </div>
      </div>
   )
}