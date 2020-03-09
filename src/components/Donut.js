import React from 'react';
import './donuttoggle.css';

export const Donut = (props) => {
    const halfsize = (props.size * 0.5);
    const radius = halfsize - (props.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((props.value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);
    const trackstyle = { strokeWidth: props.strokewidth };
    const indicatorstyle = { strokeWidth: props.strokewidth, strokeDasharray: dashval }
    const rotateval = 'rotate(-90 ' + halfsize + ',' + halfsize + ')';
    const clickHandler = () => {
        props.clickHandler();
    }
    return (
        <>
            <svg width={props.size} height={props.size} className="donutchart">
                <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator" />
                <defs>
                    <clipPath id="myCircle">
                        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track" />
                    </clipPath>
                </defs>
                <image width={props.size} onClick={clickHandler} height={props.size} href={props.imagePath} clipPath="url(#myCircle)" />
            </svg>
        </>
    );

}