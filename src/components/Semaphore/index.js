import Light from '../Light'
import './styles.css'

export default function Semaphore({lights,size}) {
    return(
        <div
            className='semaphore'
            style={{
                width: `${size *1.3}px`,
                
            }}
        >
            { lights.map((v,i)=><Light color={v.color} size={size} lightOn={v.lightOn} key= {'color' + i}/>) }
            
        </div>
    )
}

