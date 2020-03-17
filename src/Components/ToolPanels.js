import React, { useRef, useState, useEffect } from 'react';
import './toolPanels.css';

export default function ToolPanels(props) {
    const [properties, setProperties] = useState({
        isDragging: false,
        layout_resize_panel: null,
        delta: 0,
        initialPos: 0
    });
    const [panels, setPanel] = useState([200, 900, 400])
    const devRef = useRef();

    useEffect(() => {
        devRef.current.addEventListener('mousemove', _resizePanel);
        devRef.current.addEventListener('mouseup', _stopResize);
        devRef.current.addEventListener('mouseleave', _stopResize);
        return () => {
            devRef.current.removeEventListener('mousemove', _resizePanel);
            devRef.current.removeEventListener('mouseup', _stopResize);
            devRef.current.removeEventListener('mouseleave', _stopResize);
        }
    });

    const _startResize = (event, index) => {
        event.persist();
        setProperties((prevProperties) => ({
            ...prevProperties,
            isDragging: true,
            layout_resize_panel: index,
            initialPos: event.clientX
        }));
    }

    const _stopResize = () => {
        if (properties.isDragging) {
            setProperties({
                ...properties,
                isDragging: false,
                delta: 0,
                layout_resize_panel: null,
                initialPos: 0
            });
            let newPanels = [...panels];
            newPanels[properties.layout_resize_panel] = (panels[properties.layout_resize_panel] || 0) - properties.delta;
            newPanels[properties.layout_resize_panel - 1] = (panels[properties.layout_resize_panel - 1] || 0) + properties.delta;
            setPanel(newPanels);
        }
    }

    const _resizePanel = (event) => {
        if (properties.isDragging) {
            const delta = event.clientX - properties.initialPos
            setProperties({
                ...properties,
                delta: delta,
            })
        }
    }
    const rest = props.children.slice(1);
    return (
        <div ref={devRef} className="panel-container" onMouseUp={() => _stopResize()}>
            <div className="panel" style={{ width: panels[0] }}>
                {props.children[0]}
            </div>
            {[].concat(...rest.map((child, i) => {
                return [
                    <div onMouseDown={(e) => _startResize(e, i + 1)}
                        key={"resizer_" + i}
                        style={properties.layout_resize_panel === i + 1 ? { left: properties.delta } : {}}
                        className="resizer"></div>,
                    <div key={"panel_" + i} className="panel"
                        style={{ width: i === 0 ? `calc(100% - ${panels[0]}px - ${panels[2]}px)` : panels[i + 1], minHeight: i === 0 ? '300px' : '', overflow: i === 1 ? 'scroll' : '', overflowX: i === 0 ? 'hidden' : '' }}>
                        {child}
                    </div>
                ]
            }))}
        </div>
    )
}
