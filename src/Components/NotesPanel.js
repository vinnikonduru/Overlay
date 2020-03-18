import React, { useRef, useState, useEffect } from 'react';

export default function NotesPanel(props) {
    const devRef = useRef();
    const [properties, set] = useState({
        width: '100px',
        height: '100px',
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0
    });
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
    });

    const _startResize = (event) => {
        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = parseInt(document.defaultView.getComputedStyle(devRef.current).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(devRef.current).height, 10);
        set({ ...properties, startX, startY, startWidth, startHeight });
        setDragging(true);
        document.documentElement.addEventListener('mouseup', _stopResize, false);
        document.documentElement.addEventListener('mousemove', _resize, false);
    }

    const _stopResize = (event) => {
        setDragging(false);
        document.documentElement.removeEventListener('mouseup', _stopResize, false);
        document.documentElement.removeEventListener('mousemove', _resize, false);
    }

    const _resize = (event) => {
        let delta = 10;
        let rect = devRef.current.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let w = rect.right - rect.left;
        let h = rect.bottom - rect.top;
        let c = '';
        if ((y < delta) || (y > (h - delta))) {
            devRef.current.style.cursor = 'row-resize';
        }
        else if (x > (w - delta) || (x < delta)) {
            devRef.current.style.cursor = 'col-resize';
        }
        if (isDragging === true) {
            const { startWidth, startHeight, startY, startX } = properties;
            const newWidth = (startWidth + event.clientX - startX) + 'px';
            const newHeight = (startHeight + event.clientY - startY) + 'px';
            set({ ...properties, height: newHeight, width: newWidth });
        }
    }
    return (
        <div
            ref={devRef}
            style={{ border:'2px solid', width: properties.width, height: properties.height }}
            onMouseMove={_resize}
            className={props.className}
        >
            {props.children}
        </div>
    )
}