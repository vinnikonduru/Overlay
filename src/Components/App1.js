import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div` 
 display:flex;
 padding:0px;
 min-height: 100vh;
 background-color:grey;
`;

const Resizer = styled.div`
    position: relative;
   width:10px;
   background-color:lightgray;
   cursor:col-resize;
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
   `;
  //  const Span =styled.span`
  //  position:absolute;
  //  width:10px;
  //  cursor:col-resize;
  //  -webkit-user-select: none;
  //  -moz-user-select: none;
  //  -ms-user-select: none;
  //  user-select: none;

  //  `;


function Example() {

  var w = window.innerWidth;

  const [leftWidth, setLeftWidth] = useState(200)
  const [rightWidth, setRightWidth] = useState(w - 200)
  const [isResizing, setResizing] = useState(false);
  const [mouse_x, setmouse_x] = useState(0);

  const containerRef = useRef();

  const handleMousemove = (e) =>{
    if(isResizing === true){
      return;
    }
    containerRef.current.addEventListener('mousemove', (e) => {

      handleMousedown(e);
      // console.log(`e.clientX ${e.clientX}`);
  
      // setmouse_x(e.clientX);
      // const w = window.innerWidth;
      // setLeftWidth(e.clientX)
      // setRightWidth(w-e.clientX);

      
    });
    
  }
 const handleMousedown = (e) =>{
      setResizing(true);
      setmouse_x(e.clientX);
      const w = window.innerWidth;
      setLeftWidth(e.clientX)
      setRightWidth(w-e.clientX);

 }
 const handleMouseup=(e)=>{
   setResizing(false);
  console.log(`mouseupcalled!!!!!!!!!!!!!!!!!!!`);

  containerRef.current.removeEventListener('mousemove',handleMousemove);

 }


  useEffect((e) => {
    // containerRef.current.addEventListener('mousemove', handleMousemove(e))
    containerRef.current.addEventListener('mouseup', handleMouseup(e))
    return() => {
      containerRef.current.removeEventListener('mouseup', handleMouseup(e))
      // containerRef.current.removeEventListener('mousemove', handleMousemove(e))


    }
  
  },[])

  
  

  const allParts = [];
  let Left = styled.div`
  width: ${leftWidth}px;
  `;

  const leftSection = <Left key="left">{alphabet}
  </Left>
  allParts.push(leftSection);
  let resizer = <Resizer onMouseDown={(e)=>handleMousedown(e)} key='resizer1'></Resizer>
  allParts.push(resizer);

  let Right = styled.div`
  width: ${rightWidth}px;
  `;
  const rightSection = <Right key="right">{alphabet}</Right>
  allParts.push(rightSection);



  return <Container ref={containerRef}  >{allParts}</Container>
}

function App1() {
  return (
    <div className="App1">
      <Example />
    </div>
  );
}

export default App1;











  // console.log(w);
  // console.log(`leftWidth ${leftWidth}`);
  // console.log(`rightWidth ${rightWidth}`);