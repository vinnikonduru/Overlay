import React, { useState } from 'react';
import './tooltest.css';
import {Button } from './Button';
import { useSpring, animated , useTransition} from 'react-spring';

function  ToolTest() { 
    const [{toggle, divToggle}, setToggle] = useState({ divToggle:false, toggle:true });
    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
    const AnimatedButton = animated(Button);

    const bind = useTransition(({ offset: [x, y] }) => {
        console.log('x and y value is ', { x, y })
       
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
 
    return (
      <animated.div style={{ x, y }}>
        <animated.div style={toggleProps} >
          <div className="item">
            <h3>Title</h3>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div>

            <animated.div style={toggleDiv} className="item">
              <div className="buttontooltip">
                <AnimatedButton />
              </div>
            </animated.div>
          </div>
        </animated.div>

      </animated.div>

        
    )
}

export default ToolTest;
