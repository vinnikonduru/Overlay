
import React, { useState } from 'react';
import styled from 'styled-components';

const PhoneViewContainer = styled.div`
display:block;


`;

const alphabet =
  "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";

  const PhoneContainer = styled.div`
display:flex;
align-items:center;
justify-content : center;
width:100%;
position:fixed;
bottom:10px;
margin: 0 auto;
text-align: center;
`;
const Button = styled.button`

`;

let Left = styled.div`
width:100vh;
background-color:pink;
`;

const leftSection = (
<Left>{alphabet}</Left>
);
let Middle = styled.div`
`;
const middleSection = (
<Middle>{alphabet}</Middle>
);

let Right = styled.div`
`;
 const rightSection = (
 <Right>{alphabet}</Right>
   );
   




function PhoneLayout(){
const [leftSectionVisible, setLeftSectionVisible] = useState(false);
const [middleSectionVisible, setMiddleSectionVisible] = useState(true);
const [rightSectionVisible, setRightSectionVisible] = useState(false);

const LeftButtonClickHandler = () => {
  console.log('Left Section');
  if(leftSectionVisible){
    setLeftSectionVisible(true);

  }
}
const MiddleButtonClickHandler = () => {
  console.log('Middle Section');

if(middleSectionVisible){
  setMiddleSectionVisible(true);
}
}

const RightButtonClickHandler = () => {
  console.log('Right Section');

if(rightSectionVisible){
  setRightSectionVisible(true);
}
}

const leftPanelVisible = () =>{

}
const middlePanelVisible = () =>{

}
const rightPanelVisible = () =>{

}
    return (
      <PhoneViewContainer >
        <PhoneContainer>
          <Button onClick = {()=>LeftButtonClickHandler()}
          //  clickLeftButtonHandler={leftPanelVisible()}
           >  Left   </Button>
          <Button onClick = {()=>MiddleButtonClickHandler()} 
          // clickMiddleButtonHandler={middlePanelVisible()}
          >  Middle  </Button>
          <Button onClick = {()=>RightButtonClickHandler()} 
          // clickRightButtonHandler={rightPanelVisible()}
          >  Right  </Button>

        </PhoneContainer>

      </PhoneViewContainer>
    );
    }

export default PhoneLayout;
