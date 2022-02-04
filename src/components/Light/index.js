
import './styles.css'

export default function Light({color, size,lightOn}) {
    return (
        <div 
            className="container"
            style={{
                width:`${size * 1.2}px`,
                height:`${size * 1.2}px`,
            }}
        >
            <div 
                className="shine"
                style={{
                    width:`${size * 1.2}px`,
                    height:`${size * 1.2}px`,
                    backgroundColor: color,
                    visibility: lightOn ? 'visible' : 'hidden'
                }}
            ></div>
            <div 
                className="light" 
                style={{
                    width:`${size}px`,
                    height:`${size}px`,
                    backgroundColor: lightOn ? color : '#444',
                }}
            ></div>
        </div>
    )
}