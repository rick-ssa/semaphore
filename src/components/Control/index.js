import './styles.css'
import { useEffect, useState } from 'react'
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
    const [isBlinking, setIsBlinking] = useState(false)
    const [indexLightBlink, setIndexLightBlink] = useState(null)
    const [idTimerBlink, setIdTimerBlink] = useState(0)

    useEffect(()=>{
        if(isBlinking) {
            const idTimer = setTimeout(()=>blink(indexLightBlink),1000)
            setIdTimerBlink(idTimer)
        } else {
            clearTimeout(idTimerBlink)
        }
    },[lights])
    
    const blink = (index) => {
        if(!isBlinking) {
            setIsBlinking(true)
            setIndexLightBlink(index)
            turnLightOn() // turn off all lights
        } else {
            const id = indexLightBlink === 3 ? 0 : indexLightBlink
            if(lights[id].lightOn) {
                turnLightOn() //turn off all lights
            } else {
                turnLightOn(indexLightBlink)
            }
        }

    }

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
                <button onClick={()=>{run();setIsBlinking(false)}}>run</button>
                <button onClick={()=>{turnLightOn(0);setIsBlinking(false)}}>red</button>
                <button onClick={()=>{turnLightOn(1);setIsBlinking(false)}}>yellow</button>
                <button onClick={()=>{turnLightOn(2);setIsBlinking(false)}}>green</button>
                <button onClick={()=>{turnLightOn();setIsBlinking(false)}}>off</button>
                <button onClick={()=>{turnLightOn(3);setIsBlinking(false)}}>all</button>
                <button onClick={()=>{!isBlinking && blink(0)}}>blink red</button>
                <button onClick={()=>{!isBlinking && blink(1)}}>blink yellow</button>
                <button onClick={()=>{!isBlinking && blink(2)}}>blink green</button>
                <button onClick={()=>{!isBlinking && blink(3)}}>blink all</button>
                <input type='number' step={10} min={50} max={150} value={size} onChange={e=>setSize(Number(e.target.value))}/>

            </div>
        </div>
    )
}