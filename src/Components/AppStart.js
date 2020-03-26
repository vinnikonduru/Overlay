import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div` 
 display:flex;
 padding:0px;
 min-height: 100vh;
`;

const Resizer = styled.div`
  //  min-height: 100%;
    border: 5px solid lightgray;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }
`;

function Example() {

  var w = window.innerWidth;

  const [leftWidth, setLeftWidth] = useState(200)
  const [rightWidth, setRightWidth] = useState(w - 200)
  // const [eastWidth, setEastWidth] = useState(400)
  const [mouse_x, setmouse_x] = useState(0);


  useEffect(() => {
    document.addEventListener('mousemove', (e) => {

      // console.log(`e.clientX ${e.clientX}`);
      
      setmouse_x(e.clientX);
      const w = window.innerWidth;
      setLeftWidth(e.clientX)
      setRightWidth(w-e.clientX)
      return () =>{
        document.removeEventListener('mousemove',()=>{})
      }
    });
  })

  // console.log(w);
  // console.log(`leftWidth ${leftWidth}`);
  // console.log(`rightWidth ${rightWidth}`);
  
  

  const allParts = [];
  let Left = styled.div`
  width: ${leftWidth}px;
  `;
  const leftSection = <Left key="left">{alphabet}</Left>
  allParts.push(leftSection);
  let resizer = <Resizer key='resizer1'></Resizer>
  allParts.push(resizer);

  let Right = styled.div`
  width: ${rightWidth}px;
  `;
  const rightSection = <Right key="right">{alphabet}</Right>
  allParts.push(rightSection);

//   let resizer2 = <Resizer key ="resizer2"></Resizer>
//   allParts.push(resizer2);

//   let East = styled.div`
//   width:${eastWidth}px;
//   `;
// const eastSection = <East key="east">{alphabet}</East>
// allParts.push(eastSection);

  return <Container >{allParts}</Container>
}

function AppStart() {
  return (
    <div className="App">
      <Example />
    </div>
  );
}

export default AppStart;
