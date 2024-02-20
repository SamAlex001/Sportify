import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ScoreCard } from "../components/ScoreCard";
import "../styles/liveScore.css";

export const LiveScore = () => {

   const navigate = useNavigate();
   const [liveScore, setLiveScore] = useState([]);

   async function getLiveScore() {
      try {
         const response = await fetch("http://localhost:4000/livescore/cricket", {
            method: "GET",
            credentials: "include"
         })

         const score = await response.json();
         const data = score.data;
         setLiveScore(data);

      }
      catch (error) {
         console.log("Error Loading Match Data: ", error);
      };
   }

   useEffect(() => {
      getLiveScore();
   }, []);

   return (
      <div>
         <div className="livescore-container">
            {liveScore &&
               liveScore.map((matchInfo, index) => {
                  const dateTime = matchInfo.dateTimeGMT;
                  const matchType = matchInfo.matchType;
                  const matchStatus = matchInfo.status;
                  let T1Name, T1ShortName, T1Wicket, T1Over, T1Run, T1Logo;
                  let T2Name, T2ShortName, T2Wicket, T2Over, T2Run, T2Logo;

                  if (matchInfo && matchInfo.teamInfo && matchInfo.teamInfo.length > 0) {
                     T1Name = matchInfo.teamInfo[0].name;
                     T1ShortName = matchInfo.teamInfo[0].shortname;
                     T1Logo = matchInfo.teamInfo[0].img;
                     try { 
                        if (matchInfo && matchInfo.score && matchInfo.score.length > 0) {
                           T1Wicket = matchInfo.score[0].w;
                           T1Run = matchInfo.score[0].r;
                           T1Over = matchInfo.score[0].o;
                           // console.log("1 Run: ", T1Run);
                           // console.log("1 Wicket: ", T1Wicket);
                           // console.log("1 Over: ", T1Over);
                        }
                     } catch (error) { console.log(error) }
                  }

                  if (matchInfo && matchInfo.teamInfo && matchInfo.teamInfo.length > 1) {
                     T2Name = matchInfo.teamInfo[1].name;
                     T2ShortName = matchInfo.teamInfo[1].shortname;
                     T2Logo = matchInfo.teamInfo[1].img;
                     try {
                        if (matchInfo && matchInfo.score && matchInfo.score.length > 0) {
                           T2Wicket = matchInfo.score[1].w;
                           T2Run = matchInfo.score[1].r;
                           T2Over = matchInfo.score[1].o;
                           // console.log("2 Run: ", T2Run);
                           // console.log("2 Wicket: ", T2Wicket);
                           // console.log("2 Over: ", T2Over);
                        }
                     } catch (error) { console.log(error) }
                  }

                  return (
                     <ScoreCard
                        className="score-card"
                        key={index}
                        matchDate={dateTime} matchType={matchType}
                        matchStatus={matchStatus}
                        Team1={T1Name} T1ShortName={T1ShortName} 
                        // T1_Logo={T1Logo}
                        T1_Run={T1Run} T1_Wicket={T1Wicket} T1_Over={T1Over}
                        Team2={T2Name} T2ShortName={T2ShortName} 
                        // T2_Logo={T2Logo}
                        T2_Run={T1Run} T2_Wicket={T1Wicket} T2_Over={T1Over}
                     />
                  );
               })
            }

         </div>
      </div>
   )
}