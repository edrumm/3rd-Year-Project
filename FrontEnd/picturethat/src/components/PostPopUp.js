import React from "react";
import styled from 'styled-components'
import './PostPopUp.css';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Popupwrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0 , 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`
const PopupImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`
const PopUpContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const ClosePopUp = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const PopUP = ({ doc, showPopUp, setShowPopUp }) => {

  return (
   <>
   {showPopUp ? (
     <Background>
       <Popupwrapper showPopUp={showPopUp}>
    
        <PopUpContent>
          <a>Test</a>
          <button onClick={() => setShowPopUp(prev => !prev)}>Close</button>
        </PopUpContent>
       </Popupwrapper>
     </Background>
   ) : null }
   </>
 
  );
};

export default PopUP;



//https://www.youtube.com/watch?v=d3aI1Dt0Z50&t=358s&ab_channel=BrianDesign