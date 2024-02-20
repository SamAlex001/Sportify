import { FooterLight } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "../styles/aboutUs.css";

export const AboutUs = () => {
   return (
      <>
         <Navbar />
         <div className="div">
            <div className="div-2">
               Unveiling Our Passion for{" "}
               <span>Sports and Scores</span>
            </div>
            <div className="box" />
            <div className="div-3">
               <div className="div-4">
                  Our&nbsp;&nbsp;<span>Mission</span>
               </div>
               <div className="box-2" />
               <div className="div-5">
                  <div className="div-6">Real Time Updates</div>
                  <div className="div-7">
                     We understand the importance of staying informed in the fast-paced
                     world of sports. That's why we prioritize real-time updates,
                     ensuring that you have access to the latest scores and
                     developments as they happen.
                  </div>{" "}
                  <div className="div-8">Comprehensive Coverage</div>{" "}
                  <div className="div-9">
                     Whether it's the biggest leagues or niche sports, we cover it all.
                     From football and basketball to cricket and tennis, our
                     comprehensive coverage ensures that you're always in the know, no
                     matter what sport you follow
                  </div>{" "}
                  <div className="div-10">User-Friendly Interface</div>{" "}
                  <div className="div-11">
                     We believe that accessing sports scores should be easy and
                     intuitive. Our user-friendly interface is designed to provide a
                     seamless browsing experience across all devices, so you can access
                     the information you need, whenever and wherever you are.
                  </div>
               </div>
            </div>{" "}
            <div className="div-12">Our Success Team</div>{" "}
            <div className="div-13">
               <div className="div-14">Manav Kumar</div>{" "}
               <div className="div-15">Sam Alex</div>{" "}
               <div className="div-16">
                  Arvin Raju
                  <br />
               </div>
            </div>
         </div>{" "}
         <FooterLight />
      </>
   )
}
