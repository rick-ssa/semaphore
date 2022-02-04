import './styles.css'
import { useState } from 'react'
import Semaphore from '../Semaphore'

export default function Control() {
    const [idTimeout, setIdtimeout] = useState(0)
    const [size, setSize] = useState(100)
    const [lights,setLights] = useState([
        {
            color:'#ff3300',
            lightOn:false
        },
        {
            color:'#ffff00',
            lightOn:false
        },
        {
            color:'#66ff33',
            lightOn:true
        },
    ])

    const turnLightOn = (index) => {
        const newLights = lights.map((v,i)=>{
            i===index || index===3 ? v.lightOn=true : v.lightOn=false
            return v
        })

        setLights(newLights)
        clearTimeout(idTimeout)
        setIdtimeout(0)
    }

    const run = ()=> {
        let idTimeOut
        const getIndice = lights.reduce((p,v,i)=>{
            if(p!==-1) {
                return p
            }
            if(v.lightOn) {
                return i
            }

            return p
        },-1)

        switch (getIndice) {
            case 0:
                idTimeOut = setTimeout(()=>{turnLightOn(2);run()},3000)
                break;
            case 1:
                idTimeOut = setTimeout(()=>{turnLightOn(0);run()},1000)
                break;
            case 2:
                idTimeOut = setTimeout(()=>{turnLightOn(1);run()},2000)
                break;
            default:
                idTimeOut = setTimeout(()=>{turnLightOn(0);run()},2000)
                break;
        }

        setIdtimeout(idTimeOut)
    }



    return(
        <div className='control'>
            <Semaphore 
                lights={lights}
                size ={size}
            />

            <div className='formControl'>
                <button onClick={run}>run</button>
                <button onClick={()=>turnLightOn(0)}>red</button>
                <button onClick={()=>turnLightOn(1)}>yellow</button>
                <button onClick={()=>turnLightOn(2)}>green</button>
                <button onClick={()=>turnLightOn()}>off</button>
                <button onClick={()=>turnLightOn(3)}>all</button>
                <input type='number' step={10} min={50} max={150} value={size} onChange={e=>setSize(Number(e.target.value))}/>

            </div>
        </div>
    )
}