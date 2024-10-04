'use client'
import { useEffect, useState } from "react";

export default function Page({params, searchParams}){

    //SEARCH
    const queryArray: [string, string][] = Object.entries(searchParams)
    const urlsearch: string = queryArray.map(([key, value])=>`${key}=${value}`).join('&')
    //return <>{JSON.stringify(urlsearch)}</>

    //helpers
    const rand = (x)=>(Math.floor(Math.random() * x))

    //screan refresh timer
    const [out, setOut] = useState({})
    useEffect(()=>{
        let i = setInterval(()=>setOut({}), 1000)
        return ()=>clearInterval(i)
    }, [])
    //timer end

    return <div style={{color: 'white'}}>
        {
            (
                (name: string)=>{
                    return name.charAt(rand(name.length))
                }
            )('abcdefghijklmnopqrstuvwxyz')
        }
        <br/><br/>
        {(
                (name: string[])=>{
                    return name[rand(name.length)]
                }
            )(['heads','tails'])}
    </div>
}
