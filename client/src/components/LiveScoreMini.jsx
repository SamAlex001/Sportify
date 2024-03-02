import { useEffect, useState } from "react";
import "../styles/liveScore.css";
import { LiveScore } from "../components/LiveScore";
import { Loader } from "../components/Loaders";

export const LiveScoreMini = () => {

   const [liveScore, setLiveScore] = useState([]);
   const [loading, setLoading] = useState(true);

   async function getLiveScore() {
      try {
         const response = await fetch("http://localhost:4000/livescore/cricket", {
            method: "GET",
            credentials: "include"
         });

         const score = await response.json();
         const data = score.data;
         setLiveScore(data);
         setLoading(loading); //
      }
      catch (error) {
         console.log("Error Loading Match Data: ", error);
         setLoading(!loading);
      }
   }

   useEffect(() => {
      getLiveScore();
   }, []);

   return (
      <div className="livescoremini-container">
         <div className="livescoremini-header">Ongoing Matches</div>
         <div>
            {loading ? <Loader /> : <LiveScore limit={4} />} {/* Pass liveScores as prop */}
         </div>
      </div>
   )
}
