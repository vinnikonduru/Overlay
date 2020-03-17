import React, { useRef, useState, useEffect } from 'react';

export default function ResizeDivs(props) {
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    const devRef = useRef();
    const [{ width, height }, set] = useState({ width: '500px', height: '100px' });
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
        devRef.current.addEventListener('mouseup', _stopResize, false);
        devRef.current.addEventListener('mousedown', _startResize, false);
        devRef.current.addEventListener('mousemove', _resize, false);
        return () => {
            devRef.current.removeEventListener('mouseup', _stopResize, false);
            devRef.current.removeEventListener('mousedown', _startResize, false);
            devRef.current.removeEventListener('mousemove', _resize, false);
        }
    }, []);

    const _startResize = (event) => {
        setDragging(true);
        startX = event.clientX;
        startY = event.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(devRef.current).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(devRef.current).height, 10);
        document.documentElement.addEventListener('mouseup', _stopResize, false);
        document.documentElement.addEventListener('mousemove', _resize, false);
    }

    const _stopResize = (event) => {
        setDragging(false);
        document.documentElement.removeEventListener('mouseup', _stopResize, false);
        document.documentElement.removeEventListener('mousemove', _resize, false);
    }

    const _resize = (event) => {
        if (Math.abs(event.clientX - parseInt(width)) <= 3) {
            devRef.current.style.cursor = 'col-resize'
        }
        if (Math.abs(event.clientY - parseInt(height)) <= 3) {
            devRef.current.style.cursor = 'row-resize'
        }
        if (isDragging === true) {
            const width = (startWidth + event.clientX - startX) + 'px';
            const height = (startHeight + event.clientY - startY) + 'px';
            set(() => ({ height: height, width: width }));
        }
    }

    return (
        <div
            ref={devRef}
            style={{ border: '2px solid', width: width, height: height }}
            onMouseMove={_resize}
            className={props.className}
        >
            {props.children}
        </div>
    )
}