'use client'
import Laser, { neonLaser } from "../../lib/util/gfx/laser";
import { createContext, useContext } from "react"

const ZoneReducerContext = createContext(null)

const useZRContext = ()=>{
    const context = useContext(ZoneReducerContext)
    if(!context) throw new Error(
        "ZoneReducerContext not available in scope"
    )
    return context
}
function ZRCProvider({children}){
    const { state, dispatch } = useState(null)
    return <ZoneReducerContext.Provider
        value={{state, dispatch}}
    >
        {children}
    <ZoneReducerContext.Provider/>
}

export default function Page({params}){
    const greenLaser = '#00ff0033'
    const blueLaser = '#0000ff33'
    const redLaser = '#ff000033'
    return <div style={{position: 'relative', height: '100%'}}>
        <Laser angle={30} color={greenLaser} width={1} radiance={1} rotation={33}/>
        <Laser angle={60} color={blueLaser} width={1} radiance={1} rotation={3}/>
        <Laser angle={90} color={redLaser} width={1} radiance={1} rotation={333}/>
        </div>
}
