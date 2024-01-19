import React from "react";
import styled, { keyframes, css } from "styled-components";
// import './App.css'; // Import CSS file

export const CategoryScroll = () => {
   const row1 = ["FOOTBALL", "RUGBY", "FORMULA", "TENNIS", "CRICKET", "MMA", "BOXING"];
   const row2 = ["FOOTBALL", "RUGBY", "FORMULA", "TENNIS", "CRICKET", "MMA", "BOXING"];

   return (
      <div>
         <div className="header-bar"></div>
         <div className="title">
            <span className="white-text">EXPLORE VARIOUS SPORTS</span>
            <span className="black-text"> BLOGS</span>
         </div>
         <AppContainer>
            <Wrapper>
               <Marquee>
                  <MarqueeGroup forward>
                     {row1.map((text) => (
                        <TextGroup key={text}>
                           <StyledText>{text}</StyledText>
                        </TextGroup>
                     ))}
                  </MarqueeGroup>
                  <MarqueeGroup forward>
                     {row1.map((text) => (
                        <TextGroup key={text}>
                           <StyledText>{text}</StyledText>
                        </TextGroup>
                     ))}
                  </MarqueeGroup>
               </Marquee>
            </Wrapper>
         </AppContainer>
         <div className="circle left-circle"></div>
         <div className="circle right-circle"></div>
      </div>
   );
}


const AppContainer = styled.div`
  width: 90vw;
  height: 40vh;
  color: #000000;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeaderText = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 1200px; /* Adjust width to prevent overlapping */
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
`;

const MarqueeGroup = styled.div`
  ${common}
  animation: ${scrollX} 10s linear infinite;
`;

const TextGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
`;

const StyledText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #02203c;
`;
