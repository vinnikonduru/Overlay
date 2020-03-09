import React, { useState } from 'react';
import { Donut } from './Donut';
import { useSpring, animated } from 'react-spring';
import {useDrag} from 'react-use-gesture';
import './donutapp.css'

function  DonutApp() { 
    const [{toggle, divToggle}, setToggle] = useState({ divToggle:false, toggle:true });
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
    const [{ strokeValue }] = useSpring(() => ({ strokeValue: 90 }));
    const AnimatedDonut = animated(Donut);

    const bind = useDrag(({ offset: [x, y] }) => {
        console.log('x and y value is ', { x, y })
        // if(x>=0 && y>=0 ){
        //         set({x,y})
        //     };

        // if ((x === 0 && y <= 5) || (x <= 0 && y <= 5) || (x >= 0 && y <= 5) || (x > 0 && y > 0)) {
            set({ x, y });
        // }
    });

    const toggleProps = useSpring({
        to: { height: toggle ? 0 : 'auto' },
        from: { height: toggle ? 'auto' : 0 }
    });
    const toggleDiv = useSpring({
        to: { height: divToggle ? 0 : 'auto'},
        from : { height: divToggle ? 'auto' : 0 }
    });
    const clickHandler = () => {
        setToggle((prevState) => ({toggle: !prevState.toggle, divToggle: !prevState.divToggle}));
    }
    const prevClickHandler = () => {
        window.location.href = '';
    }
    const nextClickHandler = () => {
        window.location.href = '#';
    }
    return (
        <animated.div {...bind()} style={{ x, y }}>
            <animated.div style={toggleProps} className="item">
                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', height: '400px', border: '2px solid black', backgroundColor: 'skyblue', marginTop:'40px' }}>
                    <h3>Title</h3>
                    <AnimatedDonut
                        value={strokeValue}
                        size={50}
                        strokewidth={5}
                        imagePath="src/images/Cat.jpg"
                        clickHandler={clickHandler} />
                    <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap' , marginTop:'100px'}}>
                        <button   onClick={prevClickHandler}>Prev</button>
                        <button   onClick={nextClickHandler}>Next</button>
                    </div>


                </div>
            </animated.div>
            <animated.div style={toggleDiv} className="item">
                <div style={{ height: '50px', width: '50px'}}>
                    <AnimatedDonut
                        value={strokeValue}
                        size={50}
                        strokewidth={5}
                        imagePath="src/images/Cat.jpg"
                        clickHandler={clickHandler} />
                </div>
            </animated.div>
        </animated.div>

        
    )
}

export default DonutApp;