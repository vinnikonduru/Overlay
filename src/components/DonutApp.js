import React, { useState } from 'react';
import { Donut } from './Donut';
import { useSpring, animated } from 'react-spring';
import {useDrag} from 'react-use-gesture';
import './donutapp.css'

function  DonutApp() { 
    const [{toggle, divToggle}, setToggle] = useState({ divToggle:false, toggle:true });
    // const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
    const [{ x }, set] = useSpring(() => ({ x: 0 }))

    const [{ strokeValue }] = useSpring(() => ({ strokeValue: 90 }));
    const AnimatedDonut = animated(Donut);

    const bind = useDrag(
        ({ down, movement: [mx] }) => set({ x: down ? mx : 0 }),
        { axis: 'x' }
      )
  
    const toggleDiv = useSpring({
        to: { height: divToggle ? 0 : 'auto'},
        from : { height: divToggle ? 'auto' : 0 }
    });
   
    const clickHandler = () => {

        window.location.href = 'https://www.doenet.org/';
    }

    return (
        // <animated.div {...bind()} style={{ x }} />

        <animated.div {...bind()} style={{ x}}>
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