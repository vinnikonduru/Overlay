import React, {  useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import DonutApp from './components/DonutApp';
import './App.css';


function App() {
    const [y] = useState(0);
    const el = React.createRef();
    const spring = React.createRef();

    const stop = () => {
        spring.current.stop()
    }

    const scrollProps = useSpring({
        to: { y : y },
        from: { y : el.current ? el.current.scrollTop : 0 },
        ref: { ref : spring },
        config: { config: config.slow }

    });
    return (
        <>
            <div className="scrolltop-main">
                <animated.div
                    className="scrolltop-c"
                    ref={el}
                    scrollTop={scrollProps.y}>
                    {<div> 
                        <p>This is text to test..</p> 
                        <p>This is text to test..</p> 
                        <p>This is text to test..</p> 
                        <p>This is text to test..</p> 
                        <p>This is text to test..</p> 
                        <p>This is text to test..</p> 
                      
                        </div>}
                </animated.div>
            </div>
            <div className="align-right" >
                <DonutApp />
            </div>
        </>
    )
}
export default App;